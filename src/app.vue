<template>
  <div id="app">
    <site-header />

    <section id="site-content">
      <router-view />
    </section>

    <site-footer />
  </div>
</template>

<script>
import SiteHeader from '/~/components/site-header.vue'
import SiteFooter from '/~/components/site-footer.vue'

export default {
  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>

