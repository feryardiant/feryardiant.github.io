<template>
  <div id="app">
    <site-header></site-header>

    <section id="site-content">
      <router-view/>
    </section>

    <site-footer></site-footer>
  </div>
</template>

<script>
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'

export default {
  name: 'App',

  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>

<style lang="scss">
$column-gap: 2rem;
$button-color: $white;

@import url(https://fonts.googleapis.com/css?family=Fira+Code:400,600,700);
@import "~bulma/sass/base/minireset.sass";
@import "~bulma/sass/base/generic.sass";
@import "~bulma/sass/base/helpers.sass";
@import "~bulma/sass/elements/container.sass";
@import "~bulma/sass/grid/columns.sass";
@import "~bulma/sass/elements/image.sass";
@import "~bulma/sass/elements/title.sass";
@import "~bulma/sass/elements/content.sass";
@import "~bulma/sass/elements/button.sass";
@import "~bulma/sass/form/shared.sass";
@import "~bulma/sass/form/input-textarea.sass";
@import "~bulma/sass/form/checkbox-radio.sass";
// @import "~bulma/sass/form/select.sass";
// @import "~bulma/sass/form/file.sass";
@import "~bulma/sass/form/tools.sass";

$content-height: $header-height + $footer-height;

#app {
  min-height: 100vh;
}

.inner-container {
  padding-left: 2rem;
  padding-right: 2rem;
}

#site-content {
  min-height: calc(100vh - #{$content-height});

  .inner-container {
    padding-top: (2 * $gap);
    padding-bottom: (2 * $gap);
  }
}

</style>
