<script setup lang="ts">
import type { Meta } from '@unhead/vue'
import type { Frontmatter } from 'unplugin-vue-markdown/types'

const { frontmatter, excerpt, singular } = defineProps<{
  frontmatter: Frontmatter
  excerpt?: string
  singular?: boolean
}>()

const route = useRoute()

function thumbnailUrl(image: string): string {
  return `${import.meta.env.SITE_URL}/uploads/${image}`
}

const postDate = computed(() => frontmatter.updated || frontmatter.date)
const imageUrl = computed(() => frontmatter.thumb ? thumbnailUrl(frontmatter.thumb) : undefined)
const meta: Meta[] = []

if (singular) {
  meta.push({
    property: 'og:type',
    content: 'article',
  }, {
    property: 'og:title',
    content: frontmatter.title,
  }, {
    property: 'og:url',
    content: `${import.meta.env.SITE_URL}${route.fullPath}`,
  })

  if (frontmatter.description) {
    meta.push({
      name: 'description',
      content: frontmatter.description.trim(),
    }, {
      property: 'og:description',
      content: frontmatter.description.trim(),
    })
  }

  if (imageUrl.value) {
    meta.push({
      property: 'og:image',
      content: imageUrl.value,
    })
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

useHead({
  title: frontmatter.title,
  htmlAttrs: {
    lang: frontmatter.locale,
  },
  meta,
})
</script>

<template>
  <div class="flex gap-1 leading-none !my-0 text-sm text-gray-500">
    <time
      v-if="postDate"
      :datetime="postDate"
      :title="postDate"
      v-html="formatDate(postDate)"
    />

    <template v-for="category in frontmatter.category" :key="category">
      <span>#{{ category }}</span>
    </template>
  </div>

  <slot v-bind="{ title: frontmatter.title }" />

  <div class="mb-5">
    <figure v-if="imageUrl" class="w-[fit-content] mx-auto rounded overflow-hidden border border-gray-300">
      <img :alt="frontmatter.title" loading="lazy" :src="imageUrl">
    </figure>
  </div>

  <section v-if="excerpt" class="text-dark-100 prose" v-html="excerpt" />
</template>
