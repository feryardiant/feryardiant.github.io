<template>
  <div class="container">
    <main class="home inner-container">
      <div class="columns">
        <figure class="image column is-one-third-desktop">
          <img
            alt="Vue logo"
            class="image is-rounded"
            src="@/assets/img/avatar.png"
          />
        </figure>

        <div class="column">
          <h1 class="title">Hi, I'm Fery Wardiyanto</h1>
          <h2 class="subtitle">Freelance Web Developer</h2>
          <p>
            Nice to meet you! I work for clients or Companies as Freelancer with
            more than 7 years of experiences on web development.
          </p>
          <social-links no-title no-label icon-size="24" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SocialLinks from '@/components/social-links'
// @ is an alias to /src

export default {
  name: 'home-page',
  components: {
    SocialLinks
  }
}
</script>

<style lang="scss" scoped>
.columns {
  align-items: center;
}

.image {
  max-width: 326px;
  min-height: 100%;
}

p {
  margin-bottom: 2rem;
}
</style>
