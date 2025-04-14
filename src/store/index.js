import { createStore } from 'vuex'

export default createStore({
  state: {
    currentSong: {
      id: '',
      name: '',
      artist: '',
      cover: '',
      url: '',
      lyrics: []
    },
    playlist: [],
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    shuffle: false,
    repeat: false
  },

  getters: {
    progress: state => {
      return state.duration ? (state.currentTime / state.duration) * 100 : 0
    }
  },

  mutations: {
    setCurrentSong(state, song) {
      state.currentSong = song
    },
    setPlaylist(state, playlist) {
      state.playlist = playlist
    },
    setPlaying(state, isPlaying) {
      state.isPlaying = isPlaying
    },
    setCurrentTime(state, time) {
      state.currentTime = time
    },
    setDuration(state, duration) {
      state.duration = duration
    },
    setVolume(state, volume) {
      state.volume = volume
    },
    toggleShuffle(state) {
      state.shuffle = !state.shuffle
    },
    toggleRepeat(state) {
      state.repeat = !state.repeat
    }
  },

  actions: {
    async loadPlaylist({ commit }) {
      // 这里应该从后端 API 获取播放列表
      // 现在我们使用示例数据
      const playlist = [
        {
          id: '1',
          name: '示例歌曲 1',
          artist: '艺术家 1',
          cover: 'https://picsum.photos/300/300',
          url: 'path/to/song1.mp3',
          duration: 180,
          lyrics: [
            { time: 0, text: '歌词第一行' },
            { time: 30, text: '歌词第二行' }
          ]
        },
        {
          id: '2',
          name: '示例歌曲 2',
          artist: '艺术家 2',
          cover: 'https://picsum.photos/300/300',
          url: 'path/to/song2.mp3',
          duration: 240,
          lyrics: [
            { time: 0, text: '另一首歌的歌词' },
            { time: 45, text: '第二行歌词' }
          ]
        }
      ]
      
      commit('setPlaylist', playlist)
      if (playlist.length > 0) {
        commit('setCurrentSong', playlist[0])
      }
    },

    togglePlay({ commit, state }) {
      commit('setPlaying', !state.isPlaying)
    },

    playSong({ commit }, index) {
      const song = this.state.playlist[index]
      if (song) {
        commit('setCurrentSong', song)
        commit('setPlaying', true)
      }
    },

    prev({ commit, state }) {
      const currentIndex = state.playlist.findIndex(song => song.id === state.currentSong.id)
      const newIndex = (currentIndex - 1 + state.playlist.length) % state.playlist.length
      const song = state.playlist[newIndex]
      commit('setCurrentSong', song)
    },

    next({ commit, state }) {
      const currentIndex = state.playlist.findIndex(song => song.id === state.currentSong.id)
      const newIndex = (currentIndex + 1) % state.playlist.length
      const song = state.playlist[newIndex]
      commit('setCurrentSong', song)
    },

    seek({ commit }, time) {
      commit('setCurrentTime', time)
    }
  }
}) 