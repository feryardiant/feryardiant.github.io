<script setup lang="ts">
const $utterances = ref<HTMLDivElement>()

onMounted(() => {
  const utterances = document.createElement('script')

  utterances.src = 'https://utteranc.es/client.js'
  utterances.async = true
  utterances.setAttribute('repo', 'feryardiant/feryardiant.github.io')
  utterances.setAttribute('issue-term', 'pathname')
  utterances.setAttribute('theme', 'github-light')
  utterances.setAttribute('crossorigin', 'anonymous')
  utterances.setAttribute('label', 'comment')

  $utterances.value?.appendChild(utterances)
})
</script>

<template>
  <div id="utterance" ref="$utterances" />
</template>
