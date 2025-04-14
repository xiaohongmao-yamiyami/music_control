<template>
  <div class="playlist-overlay" @click.self="$emit('close')">
    <div class="playlist-container">
      <div class="playlist-header">
        <h2>播放列表</h2>
        <button class="close-btn" @click="$emit('close')">
          <i class="ri-close-line"></i>
        </button>
      </div>

      <div class="playlist-content">
        <div
          v-for="(song, index) in playlist"
          :key="song.id"
          class="playlist-item"
          :class="{ active: currentSong.id === song.id }"
          @click="playSong(index)"
        >
          <div class="song-info">
            <span class="song-name">{{ song.name }}</span>
            <span class="artist-name">{{ song.artist }}</span>
          </div>
          <div class="song-duration">{{ formatTime(song.duration) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MusicPlaylist',
  computed: {
    ...mapState([
      'playlist',
      'currentSong'
    ])
  },
  methods: {
    ...mapActions([
      'playSong'
    ]),
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>
.playlist-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.playlist-container {
  width: 400px;
  height: 100%;
  background: rgba(30, 30, 30, 0.95);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.playlist-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.playlist-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #fff;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.playlist-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.playlist-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.playlist-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.playlist-item.active {
  background: var(--primary-color);
}

.song-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.song-name {
  font-size: 1rem;
  color: #fff;
}

.artist-name {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.song-duration {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.playlist-item.active .song-name,
.playlist-item.active .artist-name,
.playlist-item.active .song-duration {
  color: #fff;
}
</style> 