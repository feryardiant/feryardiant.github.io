<template>
  <div class="else-where inline-flex">
    <h4 v-if="!noTitle" v-html="title" />

    <a
      v-for="link in socialLinks"
      :key="link.icon"
      :href="link.url"
      rel="nofolow"
      class="flex-1"
      target="__blank"
    >
      <icon :name="link.icon" :width="iconSize" :height="iconSize" />
      <span v-if="!noLabel" v-html="link.label" />
    </a>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import socialLinks from '/~/assets/social-links'

const { title, display, noTitle, noLabel, iconSize } = defineProps({
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
