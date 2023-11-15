<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col md:flex-row gap-8">
    <figure class="w-full md:w-1/4">
      <img alt="Vue logo" class="rounded-md" loading="eager" src="../static/avatar.webp">
    </figure>

    <div class="w-full md:w-3/4 flex flex-col gap-4 flex-shrink text-gray-700">
      <h1 class="font-bold text-3xl">
        <strong>Hi!</strong> I'm Fery Wardiyanto
      </h1>

      <p>Full-stuck web developer based on <a href="https://www.google.co.id/maps/place/Batang,Indonesia" rel="nofollow" target="__blank">Batang, Indonesia</a>.</p>

      <social-links no-title no-label icon-size="24" />

      <div class="prose">
        <p>I begin my career in software development since 2012, working as freelance while doing my college at <a href="https://stmik-wp.ac.id/" target="_blank" rel="noopener">STMIK Widya Pratama Pekalongan</a>.</p>
        <p>In 2015 I decide to focus in Web Development on <strong>PHP</strong> as my main language using <a href="https://laravel.com" target="_blank" rel="noopener">Laravel</a> and <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue</a> as my framework of choise.</p>
        <p>I love <a href="https://github.com/feryardiant" target="_blank" rel="noopener">open source</a> and some times I give a contribution to projects or tools that I used to work with and currently <s>I’m available as Freelance or remote worker</s> I’m doing my best at my own company, <a href="https://creasi.co" target="_blank" rel="noopener">creasi.co</a>.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image {
  max-width: 326px;
  min-height: 100%;
}
</style>

<route lang="yaml">
title: Home
</route>
