<script setup lang="ts">
import type { Frontmatter } from 'vite-plugin-md'

const { frontmatter } = defineProps<{
  excerpt?: boolean
  frontmatter: Frontmatter
}>()

const postDate = computed(() => {
  const date = frontmatter.modified || frontmatter?.date
  return new Date(date as string).toLocaleDateString()
})
</script>

<template>
  <div class="flex gap-1 leading-none !my-0 text-sm text-gray-500">
    <time
      v-if="postDate"
      :datetime="postDate"
      :title="postDate"
      v-html="postDate"
    />

    <template v-for="category in frontmatter.category" :key="category">
      <span>#{{ category }}</span>
    </template>
  </div>

  <slot v-bind="{ title: frontmatter.title }" />

  <figure v-if="frontmatter.thumb" class="mb-5 rounded overflow-hidden border border-gray-300">
    <img :alt="frontmatter.title" loading="lazy" :src="`/uploads/${frontmatter.thumb}`" />
  </figure>

  <section v-if="frontmatter.excerpt" class="text-dark-100" v-html="frontmatter.excerpt" />
</template>
