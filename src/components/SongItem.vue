<template>
  <router-link :to="{ name: 'song', params: { id: song.id } }">
    <li
      class="flex justify-between items-center p-3 pl-6 cursor-pointer transition
        duration-200 hover:bg-blue-100"
      :id="`song-id-${song.id}`">
      <div class="w-full inline-flex">
        <div
          class="w-1/12 text-gray-600 text-center font-bold text-xl px-2"
          :id="`song-rank-${song.rank}`"
        >
          {{ song.rank }}
        </div>

        <div class="w-11/12 px-2 block text-gray-700 text-m song-name">
            <p class="flex font-bold">{{ song.name }}</p>
          <span v-if="song.artist_names" class="flex text-gray-600 text-sm">
            {{ song.artist_names.toString().replace(/,/g, ', ') }}
          </span>
        </div>
      </div>
    </li>
  </router-link>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SongItem',
  props: ['song'],
  computed: {
    ...mapGetters(['currentSong', 'playing']),
  },
  methods: {
    ...mapActions(['playSong', 'toggleAudio']),
    tryPlaying(song) {
      if (this.currentSong.url === song.url) {
        this.toggleAudio();
      } else {
        this.playSong(song);
      }
    },
  },
};
</script>

<style>

</style>
