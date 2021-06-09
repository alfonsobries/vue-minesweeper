<template>
  <div class="flex p-0.5 bg-black border-2 border-white border-t-gray-400 border-l-gray-400">
    <digital-counter-number
      v-for="(n, index) in numbers"
      :key="index"
      :number="n"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DigitalCounterNumber from './DigitalCounterNumber.vue';

export default defineComponent({
  name: 'DigitalCounter',
  components: { DigitalCounterNumber },
  props: {
    number: {
      type: Number,
      required: true,
    },
    digits: {
      type: Number,
      required: true,
    },
  },
  computed: {
    numbers(): number[] {
      const numbers = String(this.number)
        .split('')
        .map((digit) => Number(digit));

      while (numbers.length < this.digits) {
        numbers.unshift(0);
      }

      return numbers;
    },
  },
});
</script>
