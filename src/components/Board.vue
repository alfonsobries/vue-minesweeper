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
          :has-mine="mines.indexOf(index) !== -1"
          :clicked="clickedCells.indexOf(index) !== -1"
          :cell-index="index"
          @clicked="onCellClicked"
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
    columns: 16,
    mines: 40,
  },
};

export default defineComponent({
  name: 'HelloWorld',
  components: { Cell },
  data() {
    return {
      settings: presets.BEGINNER,
      mines: [] as Array<number>,
      clickedCells: [] as Array<number>,
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
    onCellClicked(cellIndex: number) {
      if (this.mines.length === 0) {
        this.initMines(cellIndex);
      }

      this.clickedCells.push(cellIndex);
    },
  },
});
</script>
