<template>
  <footer id="colopon">
    <div class="container">
      <div class="inner-container">
        <p class="credits">&copy; {{ year }} Fery Wardiyanto</p>
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
  name: 'site-footer',

  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  border-top: 2px solid $border;
}

.inner-container {
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
