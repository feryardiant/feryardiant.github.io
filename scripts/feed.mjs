import glob from 'fast-glob'
import matter from 'gray-matter'
import markdownIt from 'markdown-it'
import { Feed } from 'feed'
import { readFileSync, writeFileSync } from 'fs'

const pkg = readFileSync('package.json', 'utf-8')
const { author } = JSON.parse(pkg)
const DOMAIN = author.url

const markdown = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

async function buildRSS() {
  const files = await glob('src/pages/posts/*.md')
  const options = {
    title: author.name,
    description: 'Yet another blog',
    id: `${DOMAIN}/`,
    link: `${DOMAIN}/`,
    copyright: `CC BY-NC 4.0 2021 © ${author.name}`,
    feedLinks: {
      json: `${DOMAIN}/feed.json`,
      atom: `${DOMAIN}/feed.atom`,
      rss: `${DOMAIN}/feed.xml`,
    },
  }

  const posts = await Promise.all(
    files.filter(file => !file.includes('index'))
      .map(async file => {
        const raw = await readFileSync(file, 'utf-8')
        const { data, content } = matter(raw)

        const html = markdown.render(content)
          .replace('src="/', `src="${DOMAIN}/`)

        data.date = new Date(data.date)

        return {
          ...data,
          content: html,
          author: [author]
        }
      })
  )

  await writeFeed('feed', options, posts.filter(Boolean).sort((a, b) => b.date - a.date))
}

async function writeFeed(name, options, items) {
  options.author = author
  options.image = `${DOMAIN}/avatar.png`
  options.favicon = `${DOMAIN}/favicon.ico`

  const feed = new Feed(options)

  items.forEach(item => feed.addItem(item))

  await writeFileSync(`./dist/${name}.xml`, await feed.rss2(), 'utf-8')
  await writeFileSync(`./dist/${name}.atom`, await feed.atom1(), 'utf-8')
  await writeFileSync(`./dist/${name}.json`, await feed.json1(), 'utf-8')
}

(async function run() {
  try {
    await buildRSS()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
