<template>
  <div class="hentry">
    <h1 class="title">{{ title }}</h1>
    <h2 class="subtitle">{{ description }}</h2>
    <hr class="my-6" />
    <component :is="component" />
  </div>
</template>

<script>
export default {
  name: 'Article',

  props: {
    filePath: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      md: null,
      title: '',
      description: '',
      component: null
    }
  },

  created() {
    try {
      const md = require(`~/entries/${this.filePath}.md`)

      this.title = md.attributes.title
      this.description = md.attributes.description
      this.component = md.vue.component
    } catch (e) {
      this.$nuxt.error({
        statusCode: 404,
        message: "Couldn't find page"
      })
    }
  },

  head() {
    return {
      title: this.title
    }
  }
}
</script>
