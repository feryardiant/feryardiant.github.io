<template>
  <i :data-feather="name"></i>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'
import feather from 'feather-icons'

const { name, width, height } = defineProps({
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
});

onMounted(() => {
  feather.replace({ width, height })
});
</script>
