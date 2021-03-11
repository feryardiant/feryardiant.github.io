<script setup>
import { defineProps } from 'vue';

const { frontmatter } = defineProps(['frontmatter']);
const postDate = frontmatter.modified || frontmatter.date;
const formatDate = (date) => new Date(date).toLocaleDateString();
</script>

<template>
  <header class="page-header">
    <p class="page-meta">
      <time class="modified" v-if="postDate" :datetime="postDate" :title="postDate">{{ formatDate(postDate) }}</time>
      <span v-for="tag in frontmatter.tags" :key="tag" class="tag">#{{ tag }}</span>
    </p>

    <h1 class="page-title entry-title">{{ frontmatter.title }}</h1>

    <p v-if="frontmatter.subtitle" class="opacity-50 !-mt-6 italic">
      {{ frontmatter.subtitle }}
    </p>

    <figure v-if="frontmatter.thumb" class="image column is-one-third-desktop">
      <img :alt="frontmatter.title" class="image is-rounded" :src="`/src/assets/uploads/${frontmatter.thumb}`">
    </figure>
  </header>

  <slot />
</template>

<style lang="postcss">
h1, h3 {
  &.page-title {
    font-weight: 700;
    line-height: 1.6em;
    margin-top: 0;
    margin-bottom: 0;

    > a {
      @apply inline-block;
      text-decoration: none;
      font-weight: inherit;
    }
  }
}

h3.page-title {
  font-size: 1.8rem;
}

.page-title {
  padding-bottom: .5em;
}

p.page-meta {
  @apply text-sm text-gray-500;
  margin-top: 0;
  margin-bottom: .5em;

  * {
    margin-right: .5rem;
  }
}

.page-content {
  padding-left: 2rem;

  .header-anchor {
    position: absolute;
    left: 0;
    top: 2px;
    text-decoration: none;
    font-size: 1rem;
  }

  h1,
  h2,
  h3,
  h4 {
    position: relative;
    margin-left: -2rem;
    padding-left: 2rem;

    > .header-anchor {
      display: none;
    }

    &:hover > .header-anchor {
      display: block;
    }
  }
}
</style>
