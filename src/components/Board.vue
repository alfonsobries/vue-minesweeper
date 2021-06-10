<template>
  <div
    class="flex flex-col items-center justify-center p-4 space-y-4 overflow-auto"
  >
    <preset-selector
      :presets="presets"
      :selected-preset="selectedPreset"
      @select-preset="selectPreset"
    />

    <div class="flex max-w-full overflow-auto">
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
          :style="`
            grid-template-columns: repeat(${settings.columns}, minmax(0, 1fr));
            grid-template-rows: repeat(${settings.rows}, minmax(0, 1fr));
            min-width: ${(settings.columns * 24) + 4}px;
          `"
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

    <div class="relative flex flex-col items-center justify-center pt-10 mx-auto space-y-3 text-sm text-center text-gray-500 sm:flex-row whitespace-nowrap sm:space-y-0">
      <span class="inline-flex items-center px-3">
        Made with
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-4 h-4 mx-1 text-red-300"
        ><path
          fill-rule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clip-rule="evenodd"
        /></svg>
        by
        <a
          href="https://twitter.com/alfonsobries"
          target="_blank"
          class="ml-1 text-gray-500 underline"
        >Alfonso Bribiesca</a></span>  <a
        href="https://github.com/alfonsobries/vue-minesweeper"
        target="_blank"
        class="inline-flex items-center px-3 text-gray-500 underline border-gray-200 sm:border-l"
      ><svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="w-4 h-4 mr-2"
      ><path d="M7.975 16a9.39 9.39 0 003.169-.509c-.473.076-.652-.229-.652-.486l.004-.572c.003-.521.01-1.3.01-2.197 0-.944-.316-1.549-.68-1.863 2.24-.252 4.594-1.108 4.594-4.973 0-1.108-.39-2.002-1.032-2.707.1-.251.453-1.284-.1-2.668 0 0-.844-.277-2.77 1.032A9.345 9.345 0 008 .717c-.856 0-1.712.113-2.518.34C3.556-.24 2.712.025 2.712.025c-.553 1.384-.2 2.417-.1 2.668-.642.705-1.033 1.612-1.033 2.707 0 3.852 2.342 4.72 4.583 4.973-.29.252-.554.692-.642 1.347-.58.264-2.027.692-2.933-.831-.19-.302-.756-1.045-1.549-1.032-.843.012-.34.478.013.667.428.239.919 1.133 1.032 1.422.201.567.856 1.65 3.386 1.184 0 .55.006 1.079.01 1.447l.003.428c0 .265-.189.567-.692.479 1.007.34 1.926.516 3.185.516z" /></svg>
        Github Source
      </a>
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
import PresetSelector, { Presets, PresetName, Settings } from './PresetSelector.vue';

const presets: Presets = {
  [PresetName.Beginner]: {
    rows: 9,
    columns: 9,
    mines: 10,
  },
  [PresetName.Intermediate]: {
    rows: 16,
    columns: 16,
    mines: 40,
  },
  [PresetName.Expert]: {
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
    PresetSelector,
  },
  data() {
    return {
      presets,
      selectedPreset: PresetName.Intermediate,
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
    settings(): Settings {
      return this.presets[this.selectedPreset];
    },
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
    selectPreset(preset: PresetName) {
      if (this.selectedPreset === preset) {
        return;
      }

      this.selectedPreset = preset;
      this.reset();
    },
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
