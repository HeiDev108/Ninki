import { auth, usersCollection } from '@/includes/firebase';

export default {
  // if namespaced, set mapping functions to include parameter for namespace
  // namespaced: true,
  state: {
    authModalShow: false, // use to show register/login modal form
    userLoggedIn: false, // use to determine if a user is logged in
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    async register({ commit }, payload) {
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email, payload.password,
      );

      // add additional details to firebase userProfile
      userCred.user.updateProfile({
        displayName: payload.name,
      });

      // add to users collection
      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        displayName: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
        createdAt: new Date(),
      });

      commit('toggleAuth');
    },
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);

      commit('toggleAuth');
    },
    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuth');
      }
    },
    async signout({ commit }) {
      await auth.signOut();

      commit('toggleAuth');
    },
  },
};
