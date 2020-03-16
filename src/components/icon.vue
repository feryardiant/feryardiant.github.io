<template>
  <i :data-feather="name"></i>
</template>

<script>
import feather from 'feather-icons'

export default {
  name: 'icon',

  props: {
    name: {
      type: String,
      required: true,
      validator (value) {
        return Object.prototype.hasOwnProperty.call(feather.icons, value)
      }
    },

    width: {
      type: [Number, String],
      default () {
        return 16
      }
    },

    height: {
      type: [Number, String],
      default () {
        return 16
      }
    }
  },

  mounted () {
    feather.replace({
      width: this.width,
      height: this.height
    })
  }
}
</script>
