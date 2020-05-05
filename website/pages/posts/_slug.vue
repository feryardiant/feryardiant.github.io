<template>
  <div class="container">
    <Article :file-path="filePath" />
  </div>
</template>

<script>
import Article from '~/components/article'

export default {
  components: {
    Article
  },

  asyncData({ params }) {
    return {
      filePath: `posts/${params.slug}`
    }
  }
}
</script>
