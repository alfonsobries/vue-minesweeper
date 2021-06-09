<template>
  <span class="flex flex-col items-center justify-center p-0.5">
    <span class="flex h-3">
      <span class="flex justify-end">
        <span
          class="block h-3 border-2 border-transparent  -mr-0.5"
          :class="{
            'border-l-red-500': numbers[number][0][3],
            'border-l-red-900 opacity-50': !numbers[number][0][3],
          }"
        />
      </span>
      <span class="flex flex-col justify-between">
        <span
          class="block w-3 border-2 border-transparent"
          :class="{
            'border-t-red-500': numbers[number][0][0],
            'border-t-red-900 opacity-50': !numbers[number][0][0],

          }"
        />
        <span
          class="block w-3 border-2 border-transparent"
          :class="{
            'border-b-red-500': numbers[number][0][2],
            'border-b-red-900 opacity-50': !numbers[number][0][2],
          }"
        />
      </span>
      <span class="flex justify-start ">
        <span
          class="block h-3 border-2 border-transparent  -ml-0.5"
          :class="{
            'border-r-red-500': numbers[number][0][1],
            'border-r-red-900 opacity-50': !numbers[number][0][1],
          }"
        />
      </span>
    </span>
    <span class="flex h-3">
      <span class="flex justify-end">
        <span
          class="block h-3 border-2 border-transparent  -mr-0.5"
          :class="{
            'border-l-red-500': numbers[number][1][3],
            'border-l-red-900 opacity-50': !numbers[number][1][3],
          }"
        />
      </span>
      <span class="flex flex-col justify-between">
        <span
          class="block w-3 border-2 border-transparent"
          :class="{
            'border-t-red-500': numbers[number][1][0],
            'border-t-red-900 opacity-50': !numbers[number][1][0],
          }"
        />
        <span
          class="block w-3 border-2 border-transparent"
          :class="{
            'border-b-red-500': numbers[number][1][2],
            'border-b-red-900 opacity-50': !numbers[number][1][2],
          }"
        />
      </span>
      <span class="flex justify-start ">
        <span
          class="block h-3 border-2 border-transparent  -ml-0.5"
          :class="{
            'border-r-red-500': numbers[number][1][1],
            'border-r-red-900 opacity-50': !numbers[number][1][1],
          }"
        />
      </span>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const numbers = {
  0: [
    [1, 1, 0, 1],
    [0, 1, 1, 1],
  ],

  1: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  2: [
    [1, 1, 0, 0],
    [1, 0, 1, 1],
  ],
  3: [
    [1, 1, 0, 0],
    [1, 1, 1, 0],
  ],
  4: [
    [0, 1, 0, 1],
    [1, 1, 0, 0],
  ],
  5: [
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  6: [
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  7: [
    [1, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  8: [
    [1, 1, 0, 1],
    [1, 1, 1, 1],
  ],
  9: [
    [1, 1, 0, 1],
    [1, 1, 0, 0],
  ],
};

export default defineComponent({
  name: 'DigitalCounterNumber',
  props: {
    number: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      numbers,
    };
  },

});
</script>
