<template>
  <div class="container">
    <main class="home">
      <div class="columns">
        <figure class="image column is-one-third">
          <img alt="Vue logo" class="image is-rounded" src="@/assets/avatar.png">
        </figure>

        <div class="column">
          <h1 class="title">Hi, I'm Fery Wardiyanto</h1>
          <h2 class="subtitle">Freelance Web Developer</h2>
          <p>Nice to meet you! I work for clients or Companies as Freelancer with more than 7 years of experiences on web development.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {}
}
</script>

<style lang="scss" scoped>
.columns {
  display: flex;
  align-items: center;
}
</style>
