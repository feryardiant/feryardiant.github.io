import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import icons, { ViteIconsResolver } from 'vite-plugin-icons'
import purgeIcons from 'vite-plugin-purge-icons'
import pages from 'vite-plugin-pages'
import layouts from 'vite-plugin-vue-layouts'
import windiCSS from 'vite-plugin-windicss'
import components, { VueUseComponentsResolver } from 'vite-plugin-components'

import markdown from 'vite-plugin-md'
import matter from 'gray-matter'
import mdIt from 'markdown-it'
import mdAnchor from 'markdown-it-anchor'
import mdPrism from 'markdown-it-prism'
import mdLinkAttr from 'markdown-it-link-attributes'

import { resolve } from 'path'
import { readFileSync } from 'fs'

import 'prismjs/components/prism-diff'
import 'prismjs/plugins/autolinker/prism-autolinker'
import 'prismjs/plugins/autoloader/prism-autoloader'
import 'prismjs/plugins/command-line/prism-command-line'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'
import 'prismjs/plugins/diff-highlight/prism-diff-highlight'
import 'prismjs/plugins/line-highlight/prism-line-highlight'

module.exports = defineConfig({
  resolve: {
    alias: {
      '/@/': `/${resolve(__dirname, 'src')}/`
    },
  },

  // https://github.com/vitejs/vite#dev-server-proxy
  proxy: {
    '/__': 'http://localhost:5000',
    '/api': {
      target: 'http://localhost:5001',
      rewrite: path => path.replace(/^\/api/, '/feryardiant-id/us-central')
    }
  },

  optimizeDeps: {
    include: [
      '@vueuse/core',
      'feather-icons',
      'vue',
      'vue-router',
    ],
    exclude: [
      'vue-demi',
    ],
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },

  plugins: [

    vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    pages({
      extensions: ['vue', 'md'],
      extendRoute({ title, description, meta, ...route }) {
        const frontmatter = {
          title,
          comments: true,
          layout: 'default',
          locale: 'en',
          date: null
        }

        meta = meta || {}
        if (typeof route.component === 'string' && route.component.endsWith('.md')) {
          const path = resolve(__dirname, route.component.slice(1))
          const { data, excerpt } = matter(readFileSync(path, 'utf-8'), {
            excerpt: true,
            excerpt_separator: '<!-- more -->',
          })

          meta.frontmatter = Object.assign({}, frontmatter, {
            excerpt: mdIt().render(excerpt),
          }, data)
        }

        route.meta = Object.assign({}, {
          title: frontmatter.title,
          description: description || '',
        }, meta)

        return route
      }
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    layouts(),

    // https://github.com/antfu/vite-plugin-md
    markdown({
      wrapperComponent: 'page',
      wrapperClasses: 'page-content entry-content',
      headEnabled: true,

      // see: https://markdown-it.github.io/markdown-it/
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup(md) {
        md.use(mdPrism)

        md.use(mdAnchor, {
          permalink: true,
          // permalinkBefore: true,
          permalinkSymbol: '🔗',
          permalinkSpace: false,
          permalinkAttrs: () => ({ 'aria-hidden': true }),
        })

        md.use(mdLinkAttr, {
          pattern: /^(https?:\/\/|\/\/)/,
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),

    // https://github.com/antfu/vite-plugin-components
    components({
      extensions: ['vue', 'md'],
      customLoaderMatcher: path => path.endsWith('.md'),
      customComponentResolvers: [
        VueUseComponentsResolver(),
        ViteIconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    purgeIcons(),

    // https://github.com/antfu/vite-plugin-icons
    icons(),

    // https://github.com/antfu/vite-plugin-windicss
    windiCSS({
      safelist: 'prose prose-sm m-auto text-left',
      preflight: {
        enableAll: true,
      }
    }),

  ]
})
