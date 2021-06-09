<template>
  <div class="flex justify-center p-4">
    <div class="bg-gray-200 border-4 border-gray-200 ">
      <container class="flex justify-between p-1 mb-1">
        <digital-counter
          :number="missingMines"
          :digits="3"
        />

        <layout-button
          class="px-2"
          @click="reset"
        >
          <centered-emoij v-if="won">
            😎
          </centered-emoij>
          <centered-emoij v-else-if="lost">
            😵
          </centered-emoij>
          <centered-emoij v-else>
            🙂
          </centered-emoij>
        </layout-button>

        <digital-counter
          :number="timeElapsed"
          :digits="3"
        />
      </container>
      <container
        class="grid"
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
          :lost="lost"
          :won="won"
          :exploded="explodedCell === index"
          @discover="discoverCell"
          @explode="explodeCell"
          @mark="markCell"
          @mark-maybe="markCellAsMaybe"
          @unmark="unmarkCell"
        />
      </container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cell from './Cell.vue';
import CenteredEmoij from './CenteredEmoij.vue';
import Container from './Container.vue';
import DigitalCounter from './DigitalCounter.vue';
import LayoutButton from './LayoutButton.vue';

const presets = {
  BEGINNER: {
    rows: 9,
    columns: 9,
    mines: 10,
  },
  INTERMEDIATE: {
    rows: 16,
    columns: 16,
    mines: 40,
  },
  EXPERT: {
    rows: 16,
    columns: 30,
    mines: 99,
  },
};

export default defineComponent({
  name: 'Board',
  components: {
    Cell,
    Container,
    LayoutButton,
    CenteredEmoij,
    DigitalCounter,
  },
  data() {
    return {
      settings: presets.INTERMEDIATE,
      mines: [] as Array<number>,
      discoveredCells: [] as Array<number>,
      markedCells: [] as Array<number>,
      markedAsMaybeCells: [] as Array<number>,
      explodedCell: null as null | number,
      timeElapsed: 0,
      timerInterval: null as null | number,
    };
  },
  computed: {
    totalMines(): number {
      return this.settings.rows * this.settings.columns;
    },
    missingMines(): number {
      return this.won ? 0 : Math.max(this.mines.length - this.markedCells.length, 0);
    },
    maxMines(): number {
      return this.totalMines - 1;
    },
    lost(): boolean {
      return this.explodedCell !== null;
    },
    won(): boolean {
      return (this.totalMines - this.mines.length) === this.discoveredCells.length;
    },
  },
  watch: {
    won(won) {
      if (won) {
        this.stopTimer();
      }
    },
    lost(lost) {
      if (lost) {
        this.stopTimer();

        this.mines.forEach(this.discoverCell);
      }
    },
  },
  methods: {
    reset() {
      this.mines = [];
      this.markedCells = [];
      this.markedAsMaybeCells = [];
      this.discoveredCells = [];
      this.explodedCell = null;
      this.timeElapsed = 0;
      this.stopTimer();
    },
    initTimer() {
      this.timerInterval = setInterval(() => {
        this.timeElapsed += 1;
      }, 1000);
    },
    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
    },
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

      this.initTimer();
    },
    discoverCell(cellIndex: number) {
      if (this.mines.length === 0) {
        this.initMines(cellIndex);
      }

      if (this.discoveredCells.indexOf(cellIndex) === -1) {
        this.discoveredCells.push(cellIndex);
      }
    },
    explodeCell(cellIndex: number) {
      this.explodedCell = cellIndex;
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
