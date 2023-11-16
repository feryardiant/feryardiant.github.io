<script setup lang="ts">
import type { Frontmatter } from 'vite-plugin-md'

const { frontmatter } = defineProps<{
  excerpt?: boolean
  frontmatter: Frontmatter
}>()

const postDate = computed(() => frontmatter.updated || frontmatter.date)

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}
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
    <figure v-if="frontmatter.thumb" class="w-[fit-content] mx-auto rounded overflow-hidden border border-gray-300">
      <img :alt="frontmatter.title" loading="lazy" :src="`/uploads/${frontmatter.thumb}`" />
    </figure>
  </div>

  <section v-if="frontmatter.excerpt" class="text-dark-100" v-html="frontmatter.excerpt" />
</template>
