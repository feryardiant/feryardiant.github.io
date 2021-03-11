<template>
  <footer id="colopon">
    <div class="container py-5">
      <p class="credits">&copy; {{ year }} Fery Wardiyanto</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style lang="postcss" scoped>
p {
  @apply text-sm text-gray-500;
  text-align: center;
}
</style>
