<script lang="ts" setup>
const route = useRoute()
const title = computed(() => {
  return route.meta.frontmatter?.title || route.meta.title
})

useTitle(title, {
  titleTemplate: '%s - Fery Wardiyanto',
})
</script>

<template>
  <section class="container py-5">
    <router-view />
  </section>
</template>
