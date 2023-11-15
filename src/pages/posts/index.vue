<script setup lang="ts">
const router = useRouter()

function sortByDate(a: any, b: any) {
  if (!a.meta.frontmatter || !b.meta.frontmatter)
    return 0

  return +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date)
}

const posts = router
  .getRoutes()
  .sort(sortByDate)
  .filter(({ meta, name, path }) => {
    return name && path.startsWith('/posts') && path.endsWith('.html') && meta.frontmatter?.date
  })
</script>

<template>
  <article v-for="{ path, meta } of posts" :key="path" class="page-item h-item">
    <post-meta v-slot="{ title }" :frontmatter="meta.frontmatter">
      <h3 class="font-bold !mt-4 !mb-6 !text-2xl">
        <router-link :to="path">
          {{ title }}
        </router-link>
      </h3>
    </post-meta>
  </article>
</template>

<style lang="postcss">
.page-item {
  @apply border-b border-gray-300 mb-8 pb-4;
}
</style>

<route lang="yaml">
title: Blog
menu:
  position: top
  title: Blog
</route>
