<template>
  <div class="border-2 border-gray-100 border-t-gray-400 border-l-gray-400">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Container',

});
</script>
