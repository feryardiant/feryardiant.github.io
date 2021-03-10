<template>
  <footer id="colopon">
    <div class="container">
      <div class="inner-container">
        <p class="credits">&copy; {{ year }} Fery Wardiyanto</p>
        <ul class="pages">
          <li>
            <a href="#">Privacy</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'site-footer',

  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
