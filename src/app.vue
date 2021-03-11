<template>
  <site-header />

  <main id="site-content">
    <router-view />
  </main>

  <site-footer />
</template>

<style lang="postcss">
#site-content {
  /* min-height: calc(100vh - #{$content-height}); */

  .inner-container {
    padding-top: (2 * $gap);
    padding-bottom: (2 * $gap);
  }
}
</style>

