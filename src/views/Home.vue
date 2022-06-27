<template>
  <main class="flex-grow">
    <!-- Introduction -->
    <banner :video="randVideo"/>

      <!-- Main Content -->
      <div class="bg-gray-200 pt-6">
        <section class="container mx-auto">
          <app-song-list :songs="spotify" />
        </section>
      </div>
  </main>
</template>

<script>
// @ is an alias to /src
import {
  mapActions,
  mapGetters,
} from 'vuex';
import AppSongList from '@/components/SongList.vue';
import Banner from '@/components/Banner.vue';
import IconSecondary from '@/directives/iconSecondary';
import helper from '@/includes/helper';

export default {
  name: 'Home',
  data() {
    return {
      songs: [],
      maxPerPage: 50,
      pendingRequest: false,
      videos: [
        'DreamHopper.webm',
        'IcecreamGirl.webm',
        'ToughHeart1.webm',
      ],
    };
  },
  components: {
    AppSongList,
    Banner,
  },
  directives: {
    'icon-secondary': IconSecondary,
  },
  async created() {
    // this.getSongs();
    this.fetchSongs();
  },
  computed: {
    ...mapGetters(['spotify', 'chart']),
    randVideo() {
      return this.videos[helper.randomRange(0, this.videos.length)];
    },
  },
  methods: {
    ...mapActions(['updateSpotify', 'fetchSongs']),
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }
      this.pendingRequest = true;

      const songs = await helper.getSongs(this.chart);
      this.updateSpotify(songs);
      this.songs = this.spotify;

      this.pendingRequest = false;
    },
  },
};
</script>
<style>

</style>
