import type { FeedOptions, Item } from 'feed'
import { readFileSync, writeFileSync } from 'node:fs'
import glob from 'fast-glob'
import { Feed } from 'feed'
import matter from 'gray-matter'
import markdownIt from 'markdown-it'

import { author } from '../package.json'

const markdown = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

interface Options {
  title: string
  description: string
  url: string
}

export function extractFrontmatter(filepath: string) {
  const content = readFileSync(filepath, 'utf-8')
  const parsed = matter(content, { excerpt: true, excerpt_separator: '<!-- more -->' })

  if (parsed.excerpt && parsed.excerpt !== '')
    parsed.excerpt = markdown.render(parsed.excerpt)

  return parsed
}

export async function feeds(option: Partial<Options>) {
  const files = await glob('src/pages/posts/*.md')
  const year = new Date().getFullYear()

  const posts = await Promise.all(
    files.filter(file => !file.includes('index'))
      .map((file) => {
        const { data, content } = extractFrontmatter(file)

        const html = markdown.render(content)
          .replace('src="/', `src="${option.url}/`)

        return {
          ...(data as Item),
          date: new Date(data.date),
          content: html,
          author: [author],
        }
      }),
  )

  writeFeed('feed', {
    title: option.title || author.name,
    description: option.description || 'Yet another blog',
    id: `${option.url}/`,
    link: `${option.url}/`,
    copyright: `CC BY-NC 4.0 2012 - ${year} © ${author.name}`,
    feedLinks: {
      json: `${option.url}/feed.json`,
      atom: `${option.url}/feed.atom`,
      rss: `${option.url}/feed.xml`,
    },
  }, posts)
}

function writeFeed(name: string, options: FeedOptions, items: Item[]) {
  options.author = author
  options.image = `${options.id}avatar.png`
  options.favicon = `${options.id}favicon.ico`

  const feed = new Feed(options)

  items
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .forEach(item => feed.addItem(item))

  writeFileSync(`./dist/${name}.xml`, feed.rss2(), 'utf-8')
  writeFileSync(`./dist/${name}.atom`, feed.atom1(), 'utf-8')
  writeFileSync(`./dist/${name}.json`, feed.json1(), 'utf-8')
}
