<template>
  <span
    class="flex items-center"
    :class="{
      'w-5 h-5': !small,
      'w-4 h-4 text-sm': !small,
    }"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CenteredEmoji',
  props: {
    small: {
      type: Boolean,
      default: false,
    },
  },

});
</script>
