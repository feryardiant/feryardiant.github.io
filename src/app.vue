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
    },
  },
  htmlAttrs: {
    lang: locale,
  },
  meta: [
    {
      name: 'author',
      content: 'Fery Wardiyanto',
    },
    {
      property: 'og:site_name',
      content: '%site.name',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/assets/favicon.svg',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/svg+xml',
      href: '/icon-192x192.png',
    },
    {
      rel: 'mask-icon',
      color: '#388370',
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
