<template>
  <div class="wrapper">
    <header class="header">
      <div class="container">
        <div class="-mx-6">
          <nuxt-link
            v-for="link of links"
            :key="link.id"
            class="link"
            :to="link.path"
          >
            {{ link.title }}
          </nuxt-link>
        </div>
      </div>
    </header>

    <main class="main">
      <nuxt tag="" />
    </main>

    <footer class="footer"></footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { id: 'home', path: '/', title: 'Home' },
        { id: 'about', path: '/about', title: 'About' },
        { id: 'posts', path: '/posts', title: 'All Posts' }
      ]
    }
  },

  head() {
    return {
      bodyAttrs: {
        class: 'font-sans bg-white text-gray-900 text-base'
      }
    }
  }
}
</script>

<style lang="postcss">
.container {
  @apply w-full max-w-screen-xl relative mx-auto px-6;
}

.hentry {
  @apply py-6;
}

.title {
  @apply w-full font-sans block text-4xl;
  color: #35495e;
}

.subtitle {
  @apply w-full block text-lg text-gray-700;
  color: #526488;
  word-spacing: 5px;
}

.link {
  @apply px-6 py-2 inline-block;
}
</style>
