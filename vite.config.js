import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import icons, { ViteIconsResolver } from 'vite-plugin-icons'
import purgeIcons from 'vite-plugin-purge-icons'
import pages from 'vite-plugin-pages'
import layouts from 'vite-plugin-vue-layouts'
import windiCSS from 'vite-plugin-windicss'
import components from 'vite-plugin-components'

import markdown from 'vite-plugin-md'
import matter from 'gray-matter'
import mdIt from 'markdown-it'
import mdAnchor from 'markdown-it-anchor'
import mdPrism from 'markdown-it-prism'
import mdLinkAttr from 'markdown-it-link-attributes'

import { resolve } from 'path'
import { readFileSync } from 'fs'

import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-less'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-regex'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-xml-doc'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-vim'
// import 'prismjs/components/prism-php'
// import 'prismjs/components/prism-php-extras'
// import 'prismjs/components/prism-phpdoc'
// import 'prismjs/components/prism-jsdoc'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-nginx'
import 'prismjs/components/prism-apacheconf'
import 'prismjs/components/prism-ini'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-firestore-security-rules'

module.exports = defineConfig({
  resolve: {
    alias: {
      '/~': resolve(__dirname, 'src')
    },
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
      extendRoute(page) {
        const path = resolve(__dirname, page.component.slice(1))
        const md = readFileSync(path, 'utf-8')
        const { data, excerpt } = matter(md, {
          excerpt: true,
          excerpt_separator: '<!-- more -->',
        })

        page.meta = Object.assign(page.meta || {}, {
          frontmatter: Object.assign({}, {
            comments: true,
            excerpt: mdIt().render(excerpt),
            layout: 'default',
            locale: 'id',
          }, data)
        })

        return page
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
      customComponentResolvers: ViteIconsResolver({
        componentPrefix: '',
      }),
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
