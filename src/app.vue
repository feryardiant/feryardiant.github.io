<script lang="ts" setup>
const router = useRouter()
const { locale } = useI18n()

onMounted(() => {
  const redirect = sessionStorage.getItem('site-redirect')

  if (redirect) {
    sessionStorage.removeItem('site-redirect')
    router.push(redirect)
  }
})

useHead({
  titleTemplate: '%s - %site.name',
  templateParams: {
    schemaOrg: {
      host: import.meta.env.SITE_URL,
    },
    site: {
      name: import.meta.env.SITE_NAME,
      url: import.meta.env.SITE_URL,
      description: import.meta.env.SITE_DESCRIPTION,
      author: import.meta.env.SITE_AUTHOR_NAME,
    },
  },
  htmlAttrs: {
    lang: locale,
  },
  meta: [
    {
      name: 'author',
      content: '%site.author',
    },
    {
      property: 'og:site:name',
      content: '%site.name',
    },
    {
      property: 'og:description',
      content: '%site.description',
    },
    {
      property: 'og:url',
      content: '%site.url',
    },
  ],
  link: [
    {
      rel: 'icon',
      sizes: '32x32',
      href: '/icons/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/icons/mobile-icon-192x192.png',
    },
    {
      rel: 'mask-icon',
      color: '#5bbad5',
      href: '/assets/safari-pinned-tab.svg',
    },
  ],
})
</script>

<template>
  <site-header />

  <main id="site-content">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <site-footer />
</template>
