export default {
  state: {
    spotify: [],
    chart: 'daily',
    pendingRequest: false,
  },
  getters: {
    spotify: (state) => state.spotify,
    chart: (state) => state.chart,
    pendingRequest: (state) => state.pendingRequest,
  },
  mutations: {
    setSpotify: (state, payload) => {
      state.spotify = payload;
    },
    setChart: (state, payload) => {
      state.chart = payload;
    },
    setPendingRequest: (state, payload) => {
      state.pendingRequest = payload;
    },
  },
  actions: {
    async updateSpotify({ commit }, payload) {
      commit('setSpotify', payload);
    },
    async updateChart({ commit }, payload) {
      commit('setChart', payload);
    },
    async fetchSongs({ state, commit, dispatch }) {
      if (state.pendingRequest) {
        return;
      }
      commit('setPendingRequest', true);

      const songs = [];
      const spotifyUrl = '/api/ranking'; // 'https://ninki-api.herokuapp.com/ranking';
      const headers = {
        chart: state.chart,
        'Content-Encoding': 'gzip',
        'Accept-Encoding': 'gzip, deflate, br',
      };
      const reqOpt = {
        method: 'GET',
        headers,
      };

      const data = await fetch(spotifyUrl, reqOpt).then((response) => response.json());
      data.tracks.items.forEach((song, idx) => {
        const songData = {
          album_ids: song.track.album.id,
          album_release_date: song.track.album.release_date,
          album_names: song.track.album.name,
          artist_ids: song.track.album.artists.map((artist) => artist.id),
          artist_names: song.track.album.artists.map((artist) => artist.name),
          genre: '',
          id: song.track.id,
          name: song.track.name,
          image_url: song.track.album.images[0].url,
          rank: idx + 1,
          spotify_track_ids: song.track.id,
        };

        songs.push(songData);
      });
      dispatch('updateSpotify', songs);

      commit('setPendingRequest', false);
    },
  },

};
