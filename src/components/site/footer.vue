<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer id="colopon border-t border-gray-300">
    <div class="container py-5">
      <p class="credits text-center text-sm text-gray-500">
        &copy; {{ year }} Fery Wardiyanto
      </p>
    </div>
  </footer>
</template>
