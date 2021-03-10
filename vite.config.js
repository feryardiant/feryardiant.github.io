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
    // include: [
    //   '@iconify/iconify',
    //   '@vueuse/core',
    //   'dayjs',
    //   'dayjs/plugin/localizedFormat',
    //   'vue',
    //   'vue-router',
    // ],
  },

  ssgOptions: {
    script: 'async',
    formatting: 'prettify',
  },

  plugins: [

    vue({
      include: [/\.vue$/, /\.md$/],
    }),

    pages({
      extensions: ['vue', 'md'],
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))

        if (!path.includes('projects.md')) {
          const md = readFileSync(path, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }

        return route
      }
    }),

    layouts({
      layoutsDir: 'src/layouts'
    }),

    markdown({
      wrapperComponent: 'page',
      wrapperClasses: 'prose',
      headEnabled: true,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup(md) {
        md.use(mdPrism)

        md.use(mdAnchor, {
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: '#',
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

    components({
      extensions: ['vue', 'md'],
      customLoaderMatcher: path => path.endsWith('.md'),
      customComponentResolvers: ViteIconsResolver({
        componentPrefix: '',
      }),
    }),

    purgeIcons(),
    icons(),

    windiCSS({
      safelist: 'prose prose-sm'.split(' '),
      preflight: {
        enableAll: true,
      }
    }),

  ]

})
