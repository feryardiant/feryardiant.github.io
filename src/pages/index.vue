<template>
  <div class="columns">
    <figure class="image column is-one-third-desktop">
      <img alt="Vue logo" class="image is-rounded" src="../assets/avatar.png">
    </figure>

    <div class="column">
      <h1 class="title">
        Hi, I'm Fery Wardiyanto
      </h1>
      <h2 class="subtitle">
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

p {
  margin-bottom: 2rem;
}
</style>

<route lang="yaml">
title: Home
</route>
