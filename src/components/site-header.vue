<template>
  <header id="masthead">
    <div class="container">
      <nav class="nav inner-container">
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
