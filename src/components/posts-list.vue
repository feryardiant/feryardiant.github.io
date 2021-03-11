<script setup>
import {} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const posts = router.getRoutes()
  .filter(({ path, meta }) => path.startsWith('/posts') && meta.frontmatter.date)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .filter(post => !post.path.endsWith('.html'));
const formatDate = (date) => new Date(date).toLocaleDateString();

console.log(posts);
</script>

<template>
  <article v-for="{ path, meta } of posts" :key="path" class="page-item h-item">
    <p class="page-meta">
      <time class="modified" v-if="meta.frontmatter.date" :datetime="meta.frontmatter.date" :title="meta.frontmatter.date">{{ formatDate(meta.frontmatter.date) }}</time>
      <span v-for="tag in meta.frontmatter.tags" :key="tag" class="tag">#{{ tag }}</span>
    </p>

    <h3 class="page-title entry-title">
      <router-link :to="path">{{ meta.frontmatter.title }}</router-link>
    </h3>

    <figure v-if="meta.frontmatter.thumb" class="image column is-one-third-desktop">
      <img :alt="meta.frontmatter.title" class="image is-rounded" :src="`/src/assets/uploads/${meta.frontmatter.thumb}`">
    </figure>

    <p v-if="meta.frontmatter.excerpt" class="excerpt" v-html="meta.frontmatter.excerpt" />
  </article>
</template>

<style lang="postcss">
.page-item {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #D1D5DB;
}
</style>
