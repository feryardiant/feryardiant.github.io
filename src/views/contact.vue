<template>
  <div class="container">
    <main class="contact">
      <h1 class="title">Let's get in touch</h1>

      <div class="columns">
        <form class="column is-three-quarters-desktop">
          <div class="columns">
            <div class="column">
              <div class="field">
                <label for="name" class="label">Full Name</label>
                <div class="control">
                  <input id="name" class="input" type="text" required placeholder="John Doe">
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label for="email" class="label">Email</label>
                <div class="control">
                  <input id="email" class="input" type="email" required placeholder="john@example.com">
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <label for="subject" class="label">Subject</label>
            <div class="control">
              <input id="subject" class="input" type="subject" required>
            </div>
          </div>

          <div class="field">
            <label for="message" class="label">Message</label>
            <div class="control">
              <textarea name="message" id="message" class="textarea" required placeholder="Type something here..."></textarea>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary">Submit</button>
            </div>

            <div class="control">
              <reset class="button is-text">Cancel</reset>
            </div>
          </div>
        </form>

        <div class="column else-where">
          <h4>Me elsewhere</h4>
          <a href="#" rel="nofolow">LinkedIn</a>
          <a href="#" rel="nofolow">GitHub</a>
          <a href="#" rel="nofolow">StackOverflow</a>
          <a href="#" rel="nofolow">Twitter</a>
          <a href="#" rel="nofolow">Instagram</a>
          <a href="#" rel="nofolow">Facebook</a>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.else-where {
  a {
    display: block;
  }
}
</style>
