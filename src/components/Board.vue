<template>
  <div class="flex justify-center p-4 ">
    <div class="border-4 border-gray-200">
      <div class="bg-gray-200 border-2 border-gray-100 border-t-gray-400 border-l-gray-400">
        The board
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const presets = {
  BEGINNER: {
    rows: 16,
    columns: 16,
    mines: 40,
  },
};

export default defineComponent({
  name: 'HelloWorld',
  data() {
    return {
      settings: presets.BEGINNER,
    };
  },
});
</script>
