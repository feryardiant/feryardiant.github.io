<script lang="ts" setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: 'Fery Wardiyanto' },
  ],
})
</script>

<template>
  <site-header />

  <main id="site-content">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <site-footer />
</template>
