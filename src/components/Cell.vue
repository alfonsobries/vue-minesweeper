<template>
  <layout-button
    v-if="!discovered && ! exploded"
    :disabled="lost || won"
    class="w-6 h-6 text-sm"
    @click.exact="onClick"
    @click.ctrl.prevent.exact="onSecondaryClick"
    @click.meta.prevent.exact="onSecondaryClick"
    @click.right.prevent.exact="onSecondaryClick"
  >
    <centered-emoij
      v-if="marked || won"
      small
    >
      🚩
    </centered-emoij>
    <span v-else-if="maybe">
      ?
    </span>
  </layout-button>
  <span
    v-else
    class="flex items-center justify-center w-6 h-6 text-sm border-t border-l border-gray-300 pointer-events-none"
    :class="{
      'bg-red-100': exploded
    }"
  >
    <centered-emoij v-if="exploded">💥</centered-emoij>
    <centered-emoij v-else-if="hasMine">💣</centered-emoij>
    <span
      v-else-if="minesCount > 0"
      class="font-mono font-semibold"
      :class="textColor"
    >{{ minesCount }}</span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CenteredEmoij from './CenteredEmoij.vue';
import LayoutButton from './LayoutButton.vue';

type MinesCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 0;

export default defineComponent({
  components: { LayoutButton, CenteredEmoij },
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
    discovered: {
      type: Boolean,
      required: true,
    },
    marked: {
      type: Boolean,
      required: true,
    },
    maybe: {
      type: Boolean,
      required: true,
    },
    exploded: {
      type: Boolean,
      required: true,
    },
    lost: {
      type: Boolean,
      required: true,
    },
    won: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['discover', 'explode', 'mark', 'mark-maybe', 'unmark'],
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
    textColor(): string | null {
      const colors = {
        0: null,
        1: 'text-blue-500',
        2: 'text-green-500',
        3: 'text-red-500',
        4: 'text-indigo-500',
        5: 'text-pink-500',
        6: 'text-yellow-500',
        7: 'text-black',
        8: 'text-grey-500',
        9: 'text-grey-500',
      };

      return colors[this.minesCount];
    },
    minesCount(): MinesCount {
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

      return mines.filter((has) => has).length as MinesCount;
    },
  },
  watch: {
    discovered(discovered) {
      if (discovered && this.minesCount === 0) {
        this.discover(this.topIndex);
        this.discover(this.topLeftIndex);
        this.discover(this.topRightIndex);
        this.discover(this.bottomIndex);
        this.discover(this.bottomLeftIndex);
        this.discover(this.bottomRightIndex);
        this.discover(this.leftIndex);
        this.discover(this.rightIndex);
      }
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
    discover(index: number | null) {
      if (index === null || this.hasMine) {
        return;
      }

      this.$emit('discover', index);
    },
    explode(index: number) {
      if (this.marked) {
        return;
      }
      this.$emit('explode', index);
    },
    mark(index: number) {
      this.$emit('mark', index);
    },
    unmark(index: number) {
      this.$emit('unmark', index);
    },
    markAsMaybe(index: number) {
      this.$emit('mark-maybe', index);
    },
    onClick() {
      if (this.marked) {
        return;
      }
      if (this.hasMine) {
        this.explode(this.cellIndex);
      } else {
        this.discover(this.cellIndex);
      }
    },
    onSecondaryClick() {
      if (this.marked) {
        this.markAsMaybe(this.cellIndex);
      } else if (this.maybe) {
        this.unmark(this.cellIndex);
      } else {
        this.mark(this.cellIndex);
      }
    },
  },
});
</script>
