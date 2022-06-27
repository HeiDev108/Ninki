<template>
  <main>
    <section class="container mx-auto">
    <!-- Music Header -->
    <div v-if="!song.name"
      class="flex items-center justify-center pt-40 py-8">
       <spinner />
    </div>
    <div v-else>
      <album-card :song="song"/>

      <song-details-card :song="song"/>

      <comments-card :songID="song.id"/>
    </div>
  </section>
  </main>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';
import AlbumCard from '@/components/Song/Album-Card.vue';
import SongDetailsCard from '@/components/Song/Song-Details-Card.vue';
import CommentsCard from '@/components/Song/Comments-Card.vue';
import Spinner from '@/components/Spinner.vue';
import helper from '@/includes/helper';

export default {
  name: 'Song',
  data() {
    return {
      song: {},
      songID: '',
    };
  },
  components: {
    AlbumCard,
    SongDetailsCard,
    CommentsCard,
    Spinner,
  },
  async beforeRouteEnter(to, from, next) {
    // set song ID in beforeRouteEnter to make it easily accessible for CommentsCard component
    next((vm) => {
      // eslint-disable-next-line no-param-reassign
      vm.songID = to.params.id;

      // scroll to top of window
      window.scrollTo(0, 0);
    });
  },
  async created() {
    // grab songs from vuex store
    let songs = this.spotify;

    // if we don't have songs, fetch them from back-end
    if (!songs.length) {
      songs = await helper.getSongs(this.chart);
      this.updateSpotify(songs);
    }

    // get individual song from array and set to data
    const currentSong = songs.find((song) => song.id === this.$route.params.id);
    this.song = currentSong;
  },
  computed: {
    ...mapGetters(['spotify', 'chart']),
    getGenre() {
      if (this.song.genre) {
        return this.song.genre.replace(/,/g, ', ');
      }
      return this.song.genre;
    },
  },
  methods: {
    ...mapActions(['updateSpotify']),
  },
};
</script>
