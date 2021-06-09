<template>
  <button
    type="button"
    class="flex items-center justify-center text-center text-black border-2 border-gray-100 outline-none focus:outline-none border-b-gray-400 border-r-gray-400"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutButton',

});
</script>
