<template>
  <div class="container">
    <main class="contact inner-container">
      <h1 class="title">Let's get in touch</h1>

      <div class="columns content">
        <form class="column is-three-quarters-tablet is-full-mobile">
          <div class="columns">
            <div class="column">
              <div class="field">
                <label for="name" class="label">Full Name</label>
                <div class="control">
                  <input
                    id="name"
                    class="input"
                    type="text"
                    required
                    placeholder="John Doe"
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label for="email" class="label">Email</label>
                <div class="control">
                  <input
                    id="email"
                    class="input"
                    type="email"
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <label for="subject" class="label">Subject</label>
            <div class="control">
              <input id="subject" class="input" type="subject" required />
            </div>
          </div>

          <div class="field">
            <label for="message" class="label">Message</label>
            <div class="control">
              <textarea
                name="message"
                id="message"
                class="textarea"
                required
                placeholder="Type something here..."
              ></textarea>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button type="submit" class="button is-primary">Submit</button>
            </div>

            <div class="control">
              <button type="reset" class="button is-text">Cancel</button>
            </div>
          </div>
        </form>

        <social-links class="column" display="block" />
      </div>
    </main>
  </div>
</template>

<script>
import SocialLinks from '@/components/social-links'

export default {
  name: 'contact-page',

  components: {
    SocialLinks
  }
}
</script>
