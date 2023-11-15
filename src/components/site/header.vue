<script setup lang="ts">
const menu = [
  { to: '/', title: 'Home' },
  { to: '/about', title: 'About Me' },
  { to: '/posts', title: 'Blog' },
]
</script>

<template>
  <header id="masthead">
    <div class="container">
      <nav class="nav-primary text-center">
        <router-link v-for="{ to, title } in menu" :key="to" :to="to">
          {{ title }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style lang="postcss" scoped>
nav {
  text-align: center;
}

a {
  padding: 1rem 0.5rem;
  line-height: 1em;
  @apply text-gray-500 inline-block;
}
</style>
