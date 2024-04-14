import { basename, resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import i18n from '@intlify/unplugin-vue-i18n/vite'
import unhead from '@unhead/addons/vite'
import { SchemaOrgResolver, schemaAutoImports } from '@unhead/schema-org/vue'
import { unheadVueComposablesImports } from '@unhead/vue'
import sitemap from 'vite-ssg-sitemap'
import windicss from 'vite-plugin-windicss'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import markdown from 'unplugin-vue-markdown/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import router from 'unplugin-vue-router/vite'
import layouts from 'vite-plugin-vue-layouts'
import mdLinkAttr from 'markdown-it-link-attributes'
import shiki from '@shikijs/markdown-it'

import { extractFrontmatter, feeds } from './scripts/feed'
import { author } from './package.json'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '', ['SITE', 'FIREBASE', 'VITE'])
  const FIREBASE_CONFIG = {
    projetId: env.VITE_PROJECT_ID,
    appId: env.FIREBASE_APP_ID,
    apiKey: env.FIREBASE_API_KEY,
    messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
    measurementId: env.FIREBASE_MEASUREMENT_ID,
    storageBucket: `${env.VITE_PROJECT_ID}.appspot.com`,
    authDomain: `${env.VITE_PROJECT_ID}.firebaseapp.com`,
  }

  return {
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src'),
      },
    },

    define: {
      'FIREBASE_CONFIG': JSON.stringify(FIREBASE_CONFIG),
      'import.meta.env.SITE_NAME': JSON.stringify(env.SITE_NAME),
      'import.meta.env.SITE_DESCRIPTION': JSON.stringify(env.SITE_DESCRIPTION),
      'import.meta.env.SITE_URL': JSON.stringify(env.SITE_URL),
      'import.meta.env.SITE_AUTHOR_NAME': JSON.stringify(author.name),
      'import.meta.env.SITE_AUTHOR_EMAIL': JSON.stringify(author.email),
    },

    // optimizeDeps: {
    //   include: [
    //     '@vueuse/core',
    //     // 'feather-icons',
    //     'vue',
    //     'vue-router',
    //   ],
    //   exclude: [
    //     'vue-demi',
    //   ],
    // },

    build: {
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          /**
           * @see https://rollupjs.org/configuration-options/#output-manualchunks
           */
          manualChunks: (id) => {
            if (id.includes('node_modules'))
              return 'vendor'
          },
        },
      },
    },

    ssr: {
      /**
       * TODO: workaround until they support native ESM
       * @link https://github.com/antfu/vite-ssg/issues/286#issuecomment-1285885878
       */
      noExternal: [/vue-i18n/],
    },

    /**
     * @see https://github.com/antfu/vite-ssg
     */
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      async onFinished() {
        /**
         * @see https://github.com/jbaubree/vite-ssg-sitemap
         */
        sitemap({
          hostname: env.SITE_URL || 'http://localhost',
          exclude: ['/index', '/404'],
          robots: [
            { userAgent: '*', disallow: ['/assets', '/images', '/CNAME', '/.nojekyll'] },
            { userAgent: 'Googlebot-Image', disallow: '/' },
          ],
        })

        await feeds({
          url: env.SITE_URL || 'http://localhost',
        })
      },
    },

    /**
     * @see https://github.com/vitest-dev/vitest
     */
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'happy-dom',
      globals: true,
      deps: {
        inline: ['@unhead', '@vue', '@vueuse', 'vue-demi'],
      },
    },

    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }),

      /**
       * @see https://github.com/unplugin/unplugin-auto-import
       */
      autoImport({
        dts: 'src/.auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/store',
        ],
        imports: [
          '@vueuse/core',
          'vue-i18n',
          unheadVueComposablesImports,
          VueRouterAutoImports,
          {
            '@unhead/schema-org': schemaAutoImports,
          },
          {
            // add any other imports you were relying on
            'vue-router/auto': ['useLink'],
          },
          'vue/macros',
          'vue',
        ],
        vueTemplate: true,
      }),

      /**
       * @see https://github.com/unplugin/unplugin-vue-components
       */
      components({
        dts: 'src/.components.d.ts',
        directoryAsNamespace: true,
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          SchemaOrgResolver(),
        ],
      }),

      /**
       * @see https://github.com/JohnCampionJr/vite-plugin-vue-layouts
       */
      layouts(),

      /**
       * @see https://unhead.unjs.io
       */
      unhead(),

      /**
       * @see https://github.com/posva/unplugin-vue-router
       */
      router({
        dts: 'src/.typed-router.d.ts',
        extensions: ['.vue', '.md'],
        async extendRoute(route) {
          if (route.path === '/404')
            route.name = 'not-found'

          const component = route.components.get('default')

          route.addToMeta({
            frontmatter: {},
          })

          if (component && component.endsWith('.md')) {
            const { data, excerpt } = extractFrontmatter(component)
            const filename = basename(component)
              .match(/(?<date>[0-9]{4}-[0-9]{2}-[0-9]{2})/)

            data.date = new Date(data.date || (filename?.[0] as string))
            data.published = 'published' in data ? new Date(data.published) : data.date
            data.updated = 'updated' in data ? new Date(data.updated) : undefined

            route.addToMeta({
              title: data.title,
              description: data.description || excerpt,
              locale: data.locale || 'en',
              frontmatter: data,
            })
          }
        },
      }),

      /**
       * @see https://github.com/unplugin/unplugin-vue-markdown
       */
      markdown({
        wrapperComponent: 'page',
        wrapperClasses: 'prose max-w-none',
        excerpt: true,

        async markdownItSetup(md) {
          md.use(await shiki({
            defaultColor: false,
            themes: {
              light: 'github-light',
              dark: 'github-dark',
            },
          }))

          // md.use(mdAnchor, {
          //   permalink: mdAnchor.permalink.ariaHidden({
          //     renderAttrs: () => ({ 'aria-hidden': 'true' }),
          //     space: false,
          //     symbol: '🔗',
          //   }),
          // })

          md.use(mdLinkAttr, {
            matcher: (link: string) => /^(https?:\/\/|\/\/)/.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
        },
      }),

      /**
       * @see https://github.com/antfu/vite-plugin-windicss
       */
      windicss({
        safelist: 'prose prose-sm m-auto text-left',
        preflight: {
          enableAll: true,
        },
      }),

      /**
       * @see https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
       */
      i18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, 'locales/**')],
      }),
    ],
  }
})
