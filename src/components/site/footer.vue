<script setup lang="ts">
const year = new Date().getFullYear()
const author = import.meta.env.SITE_AUTHOR_NAME
</script>

<template>
  <footer id="colopon border-t border-gray-300 sticky">
    <div class="container py-5">
      <p class="credits text-center text-sm text-gray-500">
        &copy; 2012 - {{ year }} {{ author }}
      </p>
    </div>
  </footer>
</template>
