<template>
<section class="w-full mb-2 pt-2 text-white relative px-10 text-left">
  <div class="mt-2 shadow-xl rounded-lg bg-gray-50 border border-gray-200
    flex flex-col px-10 py-6" >
    <span class="border-b-2 border-red-400 mb-6 font-bold text-gray-800 text-2xl self-start">
      Song Info
    </span>
    <span class="text-lg font-bold text-gray-800 my-1">
      {{ song.name }}
    </span>

    <div class="self-start flex flex-row flex-wrap my-2">
      <source-card :href="`https://open.spotify.com/track/${song.spotify_track_ids}`" src="/assets/img/music/spotify.png" name="Spotify logo" />
      <source-card :href="`https://music.apple.com/us/search?term=${song.name}`" src="/assets/img/music/apple-music.png" name="Apple Music logo" />
      <source-card :href="`https://music.youtube.com/search?q=${song.name}`" src="/assets/img/music/youtube-music.png" name="Youtube Music logo" />
      <source-card :href="`https://www.amazon.com/s?k=${song.name}&i=digital-music`" src="/assets/img/music/amazon-music.png" name="Amazon Music logo" />
    </div>

    <iframe
      :src="`https://open.spotify.com/embed/track/${song.spotify_track_ids}`"
      class="h-20 w-full rounded-md my-3"
      allowfullscreen=""
      frameBorder="0"
      allowtransparency="true"
      allow="autoplay; encrypted-media"
    ></iframe>

  </div>
</section>
</template>

<script>
import SourceCard from '@/components/Cards/Source-Card.vue';

export default {
  name: 'Song-Details-Card',
  components: {
    SourceCard,
  },
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
};
</script>
