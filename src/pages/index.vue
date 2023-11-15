<template>
  <div class="flex flex-row gap-8">
    <figure class="w-64">
      <img alt="Vue logo" class="rounded-md" src="../assets/avatar.png">
    </figure>

    <div class="flex flex-col gap-4 flex-shrink text-gray-700">
      <h1 class="font-bold text-4xl">
        Hi, I'm Fery Wardiyanto
      </h1>

      <h2 class="font-bold text-2xl">
        Freelance Web Developer
      </h2>

      <p>Nice to meet you! I work for clients or Companies as Freelancer with more than 7 years of experiences on web development.</p>

      <social-links no-title no-label icon-size="24" />
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
