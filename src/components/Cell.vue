<template>
  <button
    v-if="!clicked"
    type="button"
    class="w-6 h-6 border-2 border-gray-100 outline-none focus:outline-none border-b-gray-400 border-r-gray-400"
    @click="onClick"
  />
  <span
    v-else
    type="button"
    class="flex items-center justify-center w-6 h-6 text-sm shadow-sm"
  >
    <template v-if="hasMine">💣</template>
    <template v-else>{{ minesCount }}</template>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    cellIndex: {
      type: Number,
      required: true,
    },
    hasMine: {
      type: Boolean,
      required: true,
    },
    clicked: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['clicked'],
  computed: {
    minesCount() {
      return 1;
    },
  },
  methods: {
    onClick() {
      this.$emit('clicked', this.cellIndex);
    },
  },
});
</script>
