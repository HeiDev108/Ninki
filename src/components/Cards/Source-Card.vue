<template>
  <a :href="href" target="_blank"
    class="mx-1 my-1 bg-gray-50 rounded-full px-4 hover:bg-blue-200 cursor-pointer">
    <img
      class="h-10 w-auto py-2"
      :src="src"
      :alt="alt"
    />
  </a>
</template>

<script>
export default {
  name: 'Source-Card',
  props: {
    href: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
  },
};
</script>
