<template>
  <header id="masthead">
    <div class="container">
      <nav class="nav">
        <router-link :to="{ name: 'home' }">
          <span>Home</span>
        </router-link>
        <router-link :to="{ name: 'about' }">
          <span>About</span>
        </router-link>
        <router-link :to="{ name: 'contact' }">
          <span>Contact</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'site-header'
}
</script>

<style lang="scss" scoped>
header {
  max-height: $header-height;
}

nav {
  @include clearfix;

  min-height: 120px;
  display: flex;
  text-align: center;
  justify-content: center;
  white-space: nowrap;

  a {
    padding: (2 * $gap) 20px $gap;
    display: inline-flex;

    > span {
      border-bottom: 2px solid transparent;
    }

    &.is-active > span {
      border-bottom-color: $border;
    }
  }
}
</style>
