<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer id="colopon">
    <div class="container py-5">
      <p class="credits">
        &copy; {{ year }} Fery Wardiyanto
      </p>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.colopon {
  @apply border-t border-gray-300;
}

p {
  @apply text-center text-sm text-gray-500;
}
</style>
