<template>
  <section class="relative w-full h-full bg-cover home-bg bg-center">
    <div class="">
      <video class="video-top"
        autoplay loop muted playsinline >
        <source :src="`/assets/img/${video}`" type="video/webm">
      </video>
      <div class="absolute flex flex-col items-center justify-end mx-auto
        inset-x-0 bottom-2 bg-text font-sans">
        <h1 class="font-black text-center text-4xl mb-2 text-gray-100 text-shadow-md">
          Japan's top songs
        </h1>
        <p class="w-full text-center text-2xl md:w-8/12 mx-auto text-gray-100
          font-bold text-shadow-md-2">
          See Japan's top rated songs from Spotify
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    video: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>

.video-top {
  object-fit: cover;
  width: 100vw;
  height: 75vh;
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
}

.home-bg {
  height: 400px;
  -webkit-text-stroke: 0px black;

}
</style>
