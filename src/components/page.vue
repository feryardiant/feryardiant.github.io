<script setup lang="ts">
import type { Frontmatter } from 'unplugin-vue-markdown/types'

const { frontmatter } = defineProps<{
  frontmatter: Frontmatter
  excerpt?: string
}>()

const allowComments = computed(() => import.meta.env.PROD && frontmatter.comments)
</script>

<template>
  <header class="page-header">
    <post-meta v-slot="{ title }" singular :frontmatter="frontmatter">
      <h1 class="font-bold !mt-4 !mb-6 !text-3xl">
        {{ title }}
      </h1>
    </post-meta>
  </header>

  <article class="page-content">
    <slot />
  </article>

  <Utterances v-if="allowComments" />
</template>

<style lang="postcss">
.page-content {
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
