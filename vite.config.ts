import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import i18n from '@intlify/unplugin-vue-i18n/vite'
import sitemap from 'vite-ssg-sitemap'
import windicss from 'vite-plugin-windicss'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import markdown from 'vite-plugin-md'
import meta from '@yankeeinlondon/meta-builder'
import pages from 'vite-plugin-pages'
import layouts from 'vite-plugin-vue-layouts'
import mdAnchor from 'markdown-it-anchor'
import mdLinkAttr from 'markdown-it-link-attributes'
import mdPrism from 'markdown-it-prism'

import matter from 'gray-matter'
import mdIt from 'markdown-it'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '', [])

  return {
    resolve: {
      alias: {
        '~/': `${resolve(__dirname, 'src')}/`,
      },
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

    /**
     * @see https://github.com/antfu/vite-ssg
     */
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      onFinished() {
        /**
         * @see https://github.com/jbaubree/vite-ssg-sitemap
         */
        sitemap({
          hostname: env.BASE_URL || 'http://localhost',
          exclude: ['/index', '/404'],
          robots: [
            { userAgent: '*', allow: '/' },
            { userAgent: '*', disallow: ['/assets', '/images', '/CNAME', '/.nojekyll', '/404.html'] },
            { userAgent: 'Googlebot-Image', disallow: '/' },
          ],
        })
      },
    },

    /**
     * @see https://github.com/vitest-dev/vitest
     */
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'happy-dom',
      deps: {
        inline: ['@vue', '@vueuse', 'vue-demi'],
      },
    },

    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
        reactivityTransform: true,
      }),

      /**
       * @see https://github.com/JohnCampionJr/vite-plugin-vue-layouts
       */
      layouts(),

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

      /**
       * @see https://github.com/hannoeru/vite-plugin-pages
       */
      pages({
        extensions: ['vue', 'md'],
        extendRoute({ title, description, meta, ...route }) {
          const frontmatter = {
            title,
            comments: true,
            layout: 'default',
            locale: 'en',
            date: null,
          }

          meta = meta || {}
          if (typeof route.component === 'string' && route.component.endsWith('.md')) {
            const path = resolve(__dirname, route.component.slice(1))
            const { data, excerpt } = matter(readFileSync(path, 'utf-8'), {
              excerpt: true,
              excerpt_separator: '<!-- more -->',
            })

            meta.frontmatter = Object.assign({}, frontmatter, {
              excerpt: excerpt ? mdIt().render(excerpt) : undefined,
            }, data)
          }

          route.meta = Object.assign({}, {
            title: frontmatter.title,
            description: description || undefined,
          }, meta)

          return route
        },
      }),

      /**
       * @see https://github.com/antfu/vite-plugin-md
       */
      markdown({
        wrapperComponent: 'page',
        wrapperClasses: 'prose max-w-none',
        // headEnabled: true,
        excerpt: true,
        style: {
          baseStyle: 'github',
        },

        frontmatterDefaults: {
          container: 'wide',
          locale: 'id',
          layout: 'default',
        },

        // see: https://markdown-it.github.io/markdown-it/
        markdownItOptions: {
          quotes: '""\'\'',
        },

        builders: [
          meta({
            metaProps: ['title', 'description', 'tags'],
            routeMetaProps: ['layout', 'locale', 'container', 'title', 'description'],
          }),
        ],

        markdownItSetup(md) {
          md.use(mdPrism)

          md.use(mdAnchor, {
            permalink: mdAnchor.permalink.ariaHidden({
              renderAttrs: () => ({ 'aria-hidden': 'true' }),
              space: false,
              symbol: '🔗',
            }),
          })

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
       * @see https://github.com/antfu/unplugin-vue-components
       */
      components({
        dts: 'src/components.d.ts',
        directoryAsNamespace: true,
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),

      autoImport({
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/store',
        ],
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'vue/macros',
          '@vueuse/head',
          '@vueuse/core',
        ],
        vueTemplate: true,
      }),

    ],
  }
})
