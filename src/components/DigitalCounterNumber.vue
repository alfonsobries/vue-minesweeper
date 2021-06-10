<template>
  <span class="flex flex-col items-center justify-center p-0.5">
    <span class="flex h-3">
      <span class="flex justify-end">
        <span
          class="block h-3 border-2 border-transparent  -mr-0.5"
          :class="{
            'border-l-red-500': isOn(number,0,3),
            'border-l-red-900 opacity-50': !isOn(number,0,3),
          }"
        />
      </span>
      <span class="flex flex-col justify-between">
        <span
          class="block w-3 border-2 border-transparent"
          :class="{
            'border-t-red-500': isOn(number,0,0),
            'border-t-red-900 opacity-50': !isOn(number,0,0),

          }"
        />
        <span
          class="block w-3 border-2 border-transparent"
          :class="{
            'border-b-red-500': isOn(number,0,2),
            'border-b-red-900 opacity-50': !isOn(number,0,2),
          }"
        />
      </span>
      <span class="flex justify-start ">
        <span
          class="block h-3 border-2 border-transparent  -ml-0.5"
          :class="{
            'border-r-red-500': isOn(number,0,1),
            'border-r-red-900 opacity-50': !isOn(number,0,1),
          }"
        />
      </span>
    </span>
    <span class="flex h-3">
      <span class="flex justify-end">
        <span
          class="block h-3 border-2 border-transparent  -mr-0.5"
          :class="{
            'border-l-red-500': isOn(number,1,3),
            'border-l-red-900 opacity-50': !isOn(number,1,3),
          }"
        />
      </span>
      <span class="flex flex-col justify-between">
        <span
          class="block w-3 border-2 border-transparent"
          :class="{
            'border-t-red-500': isOn(number,1,0),
            'border-t-red-900 opacity-50': !isOn(number,1,0),
          }"
        />
        <span
          class="block w-3 border-2 border-transparent"
          :class="{
            'border-b-red-500': isOn(number,1,2),
            'border-b-red-900 opacity-50': !isOn(number,1,2),
          }"
        />
      </span>
      <span class="flex justify-start ">
        <span
          class="block h-3 border-2 border-transparent  -ml-0.5"
          :class="{
            'border-r-red-500': isOn(number,1,1),
            'border-r-red-900 opacity-50': !isOn(number,1,1),
          }"
        />
      </span>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type NumberPartConfig = [
  [boolean, boolean, boolean, boolean],
  [boolean, boolean, boolean, boolean],
];

type NumbersConfig = {
  0: NumberPartConfig,
  1: NumberPartConfig,
  2: NumberPartConfig,
  3: NumberPartConfig,
  4: NumberPartConfig,
  5: NumberPartConfig,
  6: NumberPartConfig,
  7: NumberPartConfig,
  8: NumberPartConfig,
  9: NumberPartConfig,

};
const numbers: NumbersConfig = {
  0: [
    [true, true, false, true],
    [false, true, true, true],
  ],

  1: [
    [false, true, false, false],
    [false, true, false, false],
  ],
  2: [
    [true, true, false, false],
    [true, false, true, true],
  ],
  3: [
    [true, true, false, false],
    [true, true, true, false],
  ],
  4: [
    [false, true, false, true],
    [true, true, false, false],
  ],
  5: [
    [true, false, false, true],
    [true, true, true, false],
  ],
  6: [
    [true, false, false, true],
    [true, true, true, true],
  ],
  7: [
    [true, true, false, false],
    [false, true, false, false],
  ],
  8: [
    [true, true, false, true],
    [true, true, true, true],
  ],
  9: [
    [true, true, false, true],
    [true, true, false, false],
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
  methods: {
    isOn(n: keyof NumbersConfig, part: 0 | 1, part2:0 | 1 | 2 | 3): boolean {
      return numbers[n][part][part2];
    },
  },
});
</script>
