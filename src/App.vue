<template>
  <div class="app-container">
    <div class="blur-background" :style="{ backgroundImage: `url(${currentSong.cover})` }"></div>
    
    <div class="main-content">
      <div class="player-section">
        <player />
      </div>
      
      <div class="lyrics-section">
        <player-word 
          :current-time="currentTime"
          :lyrics="currentLyrics"
        />
      </div>
    </div>

    <playlist 
      v-if="showPlaylist"
      @close="showPlaylist = false"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Player from './components/player.vue'
import Playlist from './components/playlist.vue'
import PlayerWord from './components/player-word.vue'

export default {
  name: 'App',
  components: {
    Player,
    Playlist,
    PlayerWord
  },
  data() {
    return {
      showPlaylist: false
    }
  },
  computed: {
    ...mapState([
      'currentSong',
      'currentTime'
    ]),
    currentLyrics() {
      return this.currentSong.lyrics || []
    }
  },
  async created() {
    await this.$store.dispatch('loadPlaylist')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css');

:root {
  --primary-color: #1DB954;
  --secondary-color: #4F4F4F;
}

body {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: linear-gradient(135deg, #1E1E1E, #2D2D2D);
  min-height: 100vh;
  color: #FFFFFF;
  margin: 0;
  padding: 0;
}

.app-container {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.blur-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  filter: blur(30px) brightness(0.4);
  z-index: -1;
}

.main-content {
  display: flex;
  min-height: 100vh;
}

.player-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lyrics-section {
  flex: 1;
  padding: 2rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}
</style> 