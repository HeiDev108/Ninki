<template>
  <!-- Header -->
  <header id="header" class="bg-gray-800 border-blue-600">
    <nav class="container mx-auto flex justify-start items-center
      py-5 px-4">
      <!-- App Name -->
      <router-link class="text-white font-bold uppercase text-2xl mr-4"
      :to="{ name: 'home' }" exact-active-class="no-active">
        Ninki 人気
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#"
              @click.prevent="toggleAuthModal">
                Login / Register
            </a>
          </li>
          <template v-else>
           <li>
              <a class="px-2 text-white" href="#"
                @click.prevent="signout">Logout</a>
           </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
    }),
  },
  methods: {
    // Use spread operator (...) before the function to merge objects,
    // as we're already inside one.
    ...mapMutations(['toggleAuthModal']),

    // We can use spread for mapactions to automatically create functions that
    // will dispatch to actions of same name
    // ...mapActions(['signout']),

    // redirect the user back to home upon signout if they are on a page that requires auth
    signout() {
      this.$store.dispatch('signout');

      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>
