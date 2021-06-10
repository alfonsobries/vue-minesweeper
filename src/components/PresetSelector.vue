<template>
  <div class="max-w-full overflow-x-auto">
    <nav
      class="flex space-x-4"
      aria-label="Tabs"
    >
      <button
        v-for="preset in Object.keys(presets)"
        :key="preset"
        type="button"
        :class="{
          'bg-gray-100 text-gray-800': preset === selectedPreset,
          'text-gray-500 hover:text-gray-900': preset !== selectedPreset,
        }"
        class="px-3 py-2 text-sm rounded-md"
        @click="selectPreset(preset)"
      >
        {{ preset }}
      </button>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export type Settings = {
  rows: number,
  columns: number,
  mines: number,
};

export enum PresetName {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Expert = 'Expert',
}

export type Presets = {
  [PresetName.Beginner]: Settings,
  [PresetName.Intermediate]: Settings,
  [PresetName.Expert]: Settings,
};

export default defineComponent({
  name: 'PresetSelector',
  props: {
    presets: {
      type: Object as PropType<Presets>,
      required: true,
    },
    selectedPreset: {
      type: Object as PropType<PresetName>,
      required: true,
    },
  },
  emits: ['select-preset'],
  methods: {
    selectPreset(preset: PresetName) {
      this.$emit('select-preset', preset);
    },
  },
});
</script>
