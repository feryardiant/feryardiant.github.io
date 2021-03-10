import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import icons, { ViteIconsResolver } from 'vite-plugin-icons'
import purgeIcons from 'vite-plugin-purge-icons'
import pages from 'vite-plugin-pages'
import windiCSS from 'vite-plugin-windicss'
import components from 'vite-plugin-components'

import markdown from 'vite-plugin-md'
import matter from 'gray-matter'
import mdAnchor from 'markdown-it-anchor'
import mdPrism from 'markdown-it-prism'
import mdLinkAttr from 'markdown-it-link-attributes'

import { resolve } from 'path'
import { readFileSync } from 'fs'

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

    markdown({
      wrapperComponent: 'post',
      wrapperClasses: 'prose m-auto',
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
      safelist: 'prose prose-sm m-auto'.split(' '),
      preflight: {
        enableAll: true,
      }
    }),

  ]

})
