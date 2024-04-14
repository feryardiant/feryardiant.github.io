<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const { t } = useI18n()
const route = useRoute()

function sortByDate(a: any, b: any) {
  if (!a.meta.frontmatter || !b.meta.frontmatter)
    return 0

  return +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date)
}

const posts = (routes.find(r => r.path === route.path)?.children as RouteRecordRaw[])
  .filter(r => r.path !== '')
  .sort(sortByDate)

useHead({
  title: t('title'),
})
</script>

<template>
  <article v-for="{ path, meta, name } of posts" :key="path" class="page-item h-item">
    <PostMeta v-slot="{ title }" :frontmatter="meta?.frontmatter || {}">
      <h3 class="font-bold !mt-4 !mb-6 !text-2xl">
        <router-link :to="(name as string)">
          {{ title }}
        </router-link>
      </h3>
    </PostMeta>
  </article>
</template>

<style lang="postcss">
.page-item {
  @apply border-b border-gray-300 mb-8 pb-4;
}
</style>

<route lang="yaml">
meta:
  title: Blog
  menu:
    position: top
    title: Blog
</route>

<i18n lang="yaml">
  id:
    title: Blog
  en:
    title: Blog
</i18n>
