<template>
  <span class="flex items-center w-5 h-5">
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CenteredEmoji',

});
</script>
