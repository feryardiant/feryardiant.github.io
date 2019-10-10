<template>
  <footer id="colopon">
    <div class="container">
      <div class="wrapper">
        <p class="credits">&copy; 2019 Fery Wardiyanto</p>
        <ul class="pages">
          <li>
            <a href="#">Privacy</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'site-footer'
}
</script>

<style lang="scss" scoped>
.container {
  border-top: 2px solid $border;
}

.wrapper {
  display: flex;
  max-height: $footer-height;
}

.credits,
.pages {
  display: inline-flex;
  width: 50%;
  padding: $gap 0;
}

.credits {
  justify-content: flex-start;
}

.pages {
  justify-content: flex-end;
}
</style>
