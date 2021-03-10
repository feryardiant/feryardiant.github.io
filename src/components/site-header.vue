<template>
  <header id="masthead">
    <div class="container">
      <nav class="nav inner-container">
        <router-link v-for="{ to, title } in menu" :key="to" :to="to">{{ title }}</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
const menu = [
  { to: '/', title: 'Home' },
  { to: '/about', title: 'About Me' },
  { to: '/posts', title: 'Blog' },
];
</script>
