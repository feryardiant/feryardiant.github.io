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
