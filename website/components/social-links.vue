<template>
  <div class="else-where">
    <h4 v-if="!noTitle" v-html="title" />

    <a
      v-for="link in links"
      :key="link.icon"
      :href="link.url"
      rel="nofolow"
      :class="classes"
      target="__blank"
    >
      <icon :name="link.icon" :width="iconSize" :height="iconSize" />
      <span v-if="!noLabel" v-html="link.label" />
    </a>
  </div>
</template>

<script>
import Icon from '@/components/icon'
import socialLinks from '@/assets/social-links'

export default {
  name: 'social-links',
  components: {
    Icon
  },
  props: {
    title: {
      type: String,
      default() {
        return 'Me elsewhere'
      }
    },
    display: {
      type: String,
      default() {
        return 'inline'
      },
      validator(value) {
        return ['inline', 'block'].includes(value)
      }
    },
    noTitle: {
      type: Boolean,
      default: false
    },
    noLabel: {
      type: Boolean,
      default: false
    },
    iconSize: {
      type: [Number, String],
      default() {
        return 16
      }
    }
  },
  data() {
    return {
      links: socialLinks
    }
  },
  computed: {
    classes() {
      return `is-${this.display}`
    }
  }
}
</script>

<style lang="scss" scoped>
.feather {
  margin: 0 1em;

  a.is-block &,
  a:first-child & {
    margin-left: 0;
  }
}
</style>
