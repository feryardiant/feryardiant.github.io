<script setup lang="ts">
const router = useRouter()

function sortByDate(a: any, b: any) {
  if (!a.meta.frontmatter || !b.meta.frontmatter)
    return 0

  return +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date)
}

const posts = router
  .getRoutes()
  .filter(({ path, meta }) => path.startsWith('/posts') && meta.frontmatter?.date)
  .sort(sortByDate)
  .filter(post => !post.path.endsWith('.html'))
</script>

<template>
  <article v-for="{ path, meta } of posts" :key="path" class="page-item h-item">
    <post-meta v-slot="{ title }" :frontmatter="meta.frontmatter">
      <h3 class="page-title entry-title">
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
