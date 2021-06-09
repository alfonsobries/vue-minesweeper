<template>
  <button
    v-if="!clicked"
    type="button"
    class="w-6 h-6 text-xs border-2 border-gray-100 outline-none focus:outline-none border-b-gray-400 border-r-gray-400"
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
    mines: {
      type: Array,
      required: true,
    },
    settings: {
      type: Object,
      required: true,
    },
    clicked: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['clicked', 'explode'],
  computed: {
    hasMine(): boolean {
      return this.hasMineAtIndex(this.cellIndex);
    },
    row(): number {
      return Math.floor(this.cellIndex / this.settings.columns);
    },
    column(): number {
      return this.cellIndex % this.settings.columns;
    },
    topIndex(): number | null {
      return this.getIndexByRowAndColumn(this.row - 1, this.column);
    },
    topLeftIndex(): number | null {
      return this.getIndexByRowAndColumn(this.row - 1, this.column - 1);
    },
    topRightIndex(): number | null {
      return this.getIndexByRowAndColumn(this.row - 1, this.column + 1);
    },
    bottomIndex(): number | null {
      return this.getIndexByRowAndColumn(this.row + 1, this.column);
    },
    bottomLeftIndex(): number | null {
      return this.getIndexByRowAndColumn(this.row + 1, this.column - 1);
    },
    bottomRightIndex(): number | null {
      return this.getIndexByRowAndColumn(this.row + 1, this.column + 1);
    },
    leftIndex(): number | null {
      return this.getIndexByRowAndColumn(this.row, this.column - 1);
    },
    rightIndex(): number | null {
      return this.getIndexByRowAndColumn(this.row, this.column + 1);
    },

    minesCount(): number {
      const mines = [
        this.hasMineAtIndex(this.topIndex),
        this.hasMineAtIndex(this.topLeftIndex),
        this.hasMineAtIndex(this.topRightIndex),
        this.hasMineAtIndex(this.bottomIndex),
        this.hasMineAtIndex(this.bottomLeftIndex),
        this.hasMineAtIndex(this.bottomRightIndex),
        this.hasMineAtIndex(this.leftIndex),
        this.hasMineAtIndex(this.rightIndex),
      ];

      return mines.filter((has) => has).length;
    },
  },
  methods: {
    hasMineAtIndex(index: number | null): boolean {
      if (index === null) {
        return false;
      }

      return this.mines.indexOf(index) !== -1;
    },
    getIndexByRowAndColumn(row: number, column: number): number | null {
      if (row < 0 || column < 0 || row > this.settings.rows - 1 || column > this.settings.columns - 1) {
        return null;
      }
      return (row * this.settings.columns) + column;
    },
    onClick() {
      this.$emit('clicked', this.cellIndex);
      // if (this.hasMine) {
      //   this.$emit('explode', this.cellIndex);
      // } else {
      //   this.$emit('clicked', this.cellIndex);
      // }
    },
  },
});
</script>
