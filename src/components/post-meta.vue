<script setup lang="ts">
const { excerpt, frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
  excerpt: {
    type: Boolean,
    default: () => true,
  },
})

const postDate = frontmatter.modified || frontmatter?.date
const formatDate = (date: string) => new Date(date).toLocaleDateString()
</script>

<template>
  <p class="leading-none !my-0 text-sm text-gray-500">
    <time
      v-if="postDate"
      class="mr-2"
      :datetime="postDate"
      :title="postDate"
      v-html="formatDate(postDate)"
    />

    <template v-for="tag in frontmatter.tags" :key="tag">
      <span class="mr-2">#{{ tag }}</span>
    </template>
  </p>

  <slot v-bind="{ title: frontmatter.title }" />

  <figure v-if="frontmatter.thumb" class="mb-5 rounded overflow-hidden border border-gray-300">
    <img :alt="frontmatter.title" :src="`/uploads/${frontmatter.thumb}`" />
  </figure>

  <section v-if="excerpt && frontmatter.excerpt" class="text-dark-100" v-html="frontmatter.excerpt" />
</template>
