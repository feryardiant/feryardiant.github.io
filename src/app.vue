<template>
  <site-header />

  <section id="site-content">
    <router-view />
  </section>

  <site-footer />
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

