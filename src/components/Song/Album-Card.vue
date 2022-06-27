<template>
  <section class="w-full mb-2 pt-6 text-white relative px-10 text-left">
      <div class="mt-6 shadow-xl rounded-lg bg-gray-50 border border-gray-200
        flex flex-col px-10 py-6" >
        <span class="border-b-4 mb-6 font-bold text-gray-800 text-2xl self-start
            border-red-400 md:hidden">
            Album Info
          </span>
        <div class="flex flex-row">
          <div class="flex flex-row">
            <img :src="song.image_url"
            class="md:h-48 md:w-48 h-32 w-32 rounded-md"
            alt="Album Image" />
            <div class="flex flex-col md:ml-10 ml-4 my-auto">
              <span class="border-b-2 mb-4 font-bold text-gray-800
                text-xl border-red-400 self-start hidden md:block ">
                 Album Info
              </span>
              <span v-if="song.album_names"
                class="md:text-lg text-xl text-base font-bold text-gray-800 mb-2">
                {{ song.album_names.toString().replace(/,/g, ', ') }}
              </span>
              <span v-if="song.artist_names"
                class="md:text-m text-lg text-gray-700 mb-2">
                by {{ song.artist_names.toString().replace(/,/g, ', ')}}
              </span>
              <span class="md:text-m text-lg text-gray-700 mb-2">
                {{ getGenre }}
              </span>
              <span class="md:text-m text-lg text-gray-700 ">
                rank: {{ getRank }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>

export default {
  name: 'Album-Card',
  props: ['song'],
  computed: {
    getGenre() {
      if (this.song.genre) {
        return this.song.genre.replace(/,/g, ', ');
      }
      return this.song.genre;
    },
    getRank() {
      if (this.song.rank) {
        return this.song.rank;
      }
      return 'unranked';
    },
  },
};
</script>
