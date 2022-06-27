<template>
<!-- songs card -->
  <div class="flex flex-row bg-gray-50 rounded
    border-gray-200 border-2 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b-2 border-gray-200 text-gray-800
      flex justify-between flex-row">
      <span class="card-title text-2xl align-middle">Songs</span>
      <div class="flex flex-col align-middle">
        <span class="pb-1"> Chart Type: </span>
        <select v-model="chartType"
            class="px-3 bg-gray-100 text-gray-800 font-bold border hover:bg-blue-100
            border-gray-900 transition duration-100 focus:outline-none focus:border-black rounded">
            <option disabled="disabled" value>Select...</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="viral">Viral</option>
      </select>
    </div>
    </div>
    <!-- SongsList -->
    <div v-if="pendingRequest"
      class="flex justify-center py-40 pb-60">
      <spinner/>
    </div>
    <ol v-else id="playlist" class="w-full justify-center content-center pb-4">
      <app-song-item v-for="song in songs" :key="song.id"
      :song="song"/>
    </ol>

  <!-- .. end SongsList -->
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';
import AppSongItem from '@/components/SongItem.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'SongList',
  data() {
    return {
      chartType: 'daily',
    };
  },
  props: {
    songs: {
      type: Array,
      required: false,
    },
  },
  created() {
    this.chartType = this.chart;
  },
  components: {
    AppSongItem,
    Spinner,
  },
  computed: {
    ...mapGetters(['chart', 'pendingRequest']),
    selectOption() {
      return this.chart;
    },
  },
  methods: {
    ...mapActions(['updateChart', 'fetchSongs']),
  },
  watch: {
    chartType(newVal) {
      // update chart on the store whenever we change the option
      this.updateChart(newVal);

      // update songs
      this.fetchSongs();
    },
  },
};
</script>

<style>

</style>
