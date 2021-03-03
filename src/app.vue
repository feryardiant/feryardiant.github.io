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

@import "~bulma/sass/base/all";

@import "~bulma/sass/elements/container";
@import "~bulma/sass/grid/columns";
// @import "~bulma/sass/elements/image";
// @import "~bulma/sass/elements/title";
// @import "~bulma/sass/elements/content";
// @import "~bulma/sass/elements/button";
@import "~bulma/sass/form/shared";
@import "~bulma/sass/form/input-textarea";
@import "~bulma/sass/form/checkbox-radio";
// @import "~bulma/sass/form/select";
// @import "~bulma/sass/form/file";
@import "~bulma/sass/form/tools";

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
