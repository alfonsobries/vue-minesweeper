<template>
  <div class="flex bg-black border-2 border-white border-t-gray-400 border-l-gray-400">
    <div>
      <digital-counter-number :number="1" />
      <digital-counter-number :number="2" />
      <digital-counter-number :number="3" />
      <digital-counter-number :number="4" />
      <digital-counter-number :number="5" />
      <digital-counter-number :number="6" />
      <digital-counter-number :number="7" />
      <digital-counter-number :number="8" />
      <digital-counter-number :number="9" />
    </div>
    <!-- <digital-counter-number :number="4" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DigitalCounterNumber from './DigitalCounterNumber.vue';

export default defineComponent({
  name: 'DigitalCounter',
  components: { DigitalCounterNumber },

});
</script>
