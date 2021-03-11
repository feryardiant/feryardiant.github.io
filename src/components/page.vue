<script setup>
import { defineProps } from 'vue';

const { frontmatter } = defineProps(['frontmatter']);
</script>

<template>
  <header class="page-header">
    <post-meta :excerpt="false" :frontmatter="frontmatter" v-slot="{ title }">
      <h1 class="page-title entry-title">{{ title }}</h1>
    </post-meta>
  </header>

  <slot />
</template>

<style lang="postcss">
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
