<template>
  <header id="masthead">
    <div class="container">
      <nav class="nav inner-container">
        <router-link to="/">
          <span>Home</span>
        </router-link>
        <router-link to="/about">
          <span>About</span>
        </router-link>
        <!-- <router-link :to="{ name: 'contact' }">
          <span>Contact</span>
        </router-link> -->
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'site-header'
}
</script>
