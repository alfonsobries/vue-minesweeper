<template>
  <div class="flex justify-center p-4">
    <div class="bg-gray-200 border-4 border-gray-200 ">
      <container class="flex justify-between p-1 mb-1">
        <digital-counter
          :number="320"
          :digits="3"
        />

        <layout-button
          class="px-2"
          @click="reset"
        >
          <centered-emoij v-if="lost">
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
          :active="active"
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
    rows: 16,
    columns: 15,
    mines: 10,
  },
};

export default defineComponent({
  name: 'HelloWorld',
  components: {
    Cell,
    Container,
    LayoutButton,
    CenteredEmoij,
    DigitalCounter,
  },
  data() {
    return {
      settings: presets.BEGINNER,
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
    maxMines(): number {
      return this.totalMines - 1;
    },
    active(): boolean {
      return !this.lost && !this.won;
    },
    lost(): boolean {
      return this.explodedCell !== null;
    },
    won(): boolean {
      // @TOOD
      return false;
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

      this.discoveredCells.push(cellIndex);
    },
    explodeCell(cellIndex: number) {
      this.explodedCell = cellIndex;

      this.mines.forEach(this.discoverCell);

      this.stopTimer();
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
