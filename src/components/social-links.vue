<script setup>
import { Icon } from '@iconify/vue'
import socialLinks from '../assets/social-links.json'

const { title, display, noTitle, iconSize } = defineProps({
  title: {
    type: String,
    default() {
      return 'Me elsewhere'
    },
  },
  display: {
    type: String,
    default() {
      return 'inline'
    },
    validator(value) {
      return ['inline', 'block'].includes(value)
    },
  },
  noTitle: {
    type: Boolean,
    default: false,
  },
  noLabel: {
    type: Boolean,
    default: false,
  },
  iconSize: {
    type: [Number, String],
    default() {
      return 16
    },
  },
})
</script>

<template>
  <div class="flex flex-row gap-4">
    <h4 v-if="!noTitle" v-html="title" />

    <a
      v-for="link in socialLinks"
      :key="link.icon"
      :href="link.url"
      rel="nofolow"
      target="__blank"
    >
      <icon :icon="`mdi:${link.icon}`" :display="display" :width="iconSize" :height="iconSize" />
    </a>
  </div>
</template>
