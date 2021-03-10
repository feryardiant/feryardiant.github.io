<script setup>
import { defineProps } from 'vue';
// import { useRoute } from 'vue-router';

// const route = useRoute();
const { frontmatter } = defineProps(['frontmatter']);
console.log(frontmatter)
</script>

<template>
  <header class="page-header">
    <h1 class="page-title entry-title">{{ frontmatter.title }}</h1>

    <p v-if="frontmatter.subtitle" class="opacity-50 !-mt-6 italic">
      {{ frontmatter.subtitle }}
    </p>
  </header>

  <article class="page-content entry-content">
    <slot />
  </article>
</template>
