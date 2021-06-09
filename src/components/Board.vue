<template>
  <div class="flex justify-center p-4 ">
    <div class="border-4 border-gray-200">
      <div
        class="grid bg-gray-200 border-2 border-gray-100 border-t-gray-400 border-l-gray-400"
        :style="`grid-template-columns: repeat(${settings.columns}, minmax(0, 1fr));grid-template-rows: repeat(${settings.rows}, minmax(0, 1fr));`"
      >
        <cell
          v-for="index in [...Array(totalMines).keys()]"
          :key="index"
          :mines="mines"
          :settings="settings"
          :discovered="discoveredCells.indexOf(index) !== -1"
          :marked="markedCells.indexOf(index) !== -1"
          :maybe="markedAsMaybeCells.indexOf(index) !== -1"
          :cell-index="index"
          :exploded="explodedCell === index"
          @discover="discoverCell"
          @explode="explodeCell"
          @mark="markCell"
          @mark-maybe="markCellAsMaybe"
          @unmark="unmarkCell"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cell from './Cell.vue';

const presets = {
  BEGINNER: {
    rows: 16,
    columns: 15,
    mines: 10,
  },
};

export default defineComponent({
  name: 'HelloWorld',
  components: { Cell },
  data() {
    return {
      settings: presets.BEGINNER,
      mines: [] as Array<number>,
      discoveredCells: [] as Array<number>,
      markedCells: [] as Array<number>,
      markedAsMaybeCells: [] as Array<number>,
      explodedCell: null as null | number,
    };
  },
  computed: {
    totalMines(): number {
      return this.settings.rows * this.settings.columns;
    },
    maxMines(): number {
      return this.totalMines - 1;
    },
  },
  methods: {
    initMines(initialCellIndex: number) {
      this.mines = [];
      const minesToAssign = [...Array(this.settings.mines)];
      let randomCellIndex: number;
      do {
        randomCellIndex = Math.floor(Math.random() * this.maxMines);
        if (this.mines.indexOf(randomCellIndex) === -1 && initialCellIndex !== randomCellIndex) {
          minesToAssign.pop();
          this.mines.push(randomCellIndex);
        }
      } while (minesToAssign.length);
    },
    discoverCell(cellIndex: number) {
      if (this.mines.length === 0) {
        this.initMines(cellIndex);
      }

      this.discoveredCells.push(cellIndex);
    },
    explodeCell(cellIndex: number) {
      this.explodedCell = cellIndex;

      this.mines.forEach(this.discoverCell);
    },
    markCell(cellIndex: number) {
      this.markedCells.push(cellIndex);
    },
    unmarkCell(cellIndex: number) {
      const index = this.markedAsMaybeCells.indexOf(cellIndex);
      this.markedAsMaybeCells.splice(index, 1);
    },
    markCellAsMaybe(cellIndex: number) {
      const index = this.markedCells.indexOf(cellIndex);
      this.markedCells.splice(index, 1);
      this.markedAsMaybeCells.push(cellIndex);
    },
  },
});
</script>
