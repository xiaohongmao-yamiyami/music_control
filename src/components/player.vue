<template>
  <div class="player">
    <!-- 封面 -->
    <div class="cover-container">
      <img :src="currentSong.cover" :alt="currentSong.name" class="cover-image">
    </div>

    <!-- 歌曲信息 -->
    <div class="song-info">
      <h2 class="song-name">{{ currentSong.name }}</h2>
      <p class="artist-name">{{ currentSong.artist }}</p>
    </div>

    <!-- 进度条 -->
    <div class="progress-bar">
      <div class="time">{{ formatTime(currentTime) }}</div>
      <div class="progress" @click="seek">
        <div class="progress-current" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="time">{{ formatTime(duration) }}</div>
    </div>

    <!-- 控制按钮 -->
    <div class="controls">
      <button class="control-btn" @click="toggleShuffle">
        <i class="ri-shuffle-line" :class="{ active: shuffle }"></i>
      </button>
      <button class="control-btn" @click="prev">
        <i class="ri-skip-back-fill"></i>
      </button>
      <button class="control-btn play-btn" @click="togglePlay">
        <i :class="isPlaying ? 'ri-pause-fill' : 'ri-play-fill'"></i>
      </button>
      <button class="control-btn" @click="next">
        <i class="ri-skip-forward-fill"></i>
      </button>
      <button class="control-btn" @click="toggleRepeat">
        <i class="ri-repeat-line" :class="{ active: repeat }"></i>
      </button>
    </div>

    <!-- 音量控制 -->
    <div class="volume-control">
      <i class="ri-volume-up-line"></i>
      <div class="volume-bar" @click="adjustVolume">
        <div class="volume-current" :style="{ width: volume * 100 + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'MusicPlayer',
  computed: {
    ...mapState([
      'currentSong',
      'isPlaying',
      'currentTime',
      'duration',
      'volume',
      'shuffle',
      'repeat'
    ]),
    ...mapGetters([
      'progress'
    ])
  },
  methods: {
    ...mapMutations([
      'setVolume',
      'toggleShuffle',
      'toggleRepeat'
    ]),
    ...mapActions([
      'togglePlay',
      'prev',
      'next',
      'seek'
    ]),
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },
    adjustVolume(event) {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const volume = Math.max(0, Math.min(1, x / rect.width))
      this.setVolume(volume)
    }
  }
}
</script>

<style scoped>
.player {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

.cover-container {
  width: 300px;
  height: 300px;
  margin: 0 auto 2rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.song-info {
  text-align: center;
  margin-bottom: 2rem;
}

.song-name {
  font-size: 1.5rem;
  margin: 0;
  color: #fff;
}

.artist-name {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.5rem 0;
}

.progress-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.time {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  min-width: 40px;
}

.progress {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.progress-current {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: var(--primary-color);
  border-radius: 2px;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.control-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.play-btn {
  font-size: 2.5rem;
  background: var(--primary-color);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn:hover {
  background: var(--primary-color);
  transform: scale(1.1);
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.volume-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.volume-current {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: var(--primary-color);
  border-radius: 2px;
}

.active {
  color: var(--primary-color);
}
</style> 