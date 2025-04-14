<template>
  <div class="lyrics-container" ref="container">
    <div class="lyrics-wrapper" :style="{ transform: `translateY(${-currentIndex * 32}px)` }">
      <div
        v-for="(line, index) in lyrics"
        :key="index"
        class="lyric-line"
        :class="{ active: index === currentIndex }"
      >
        {{ line.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerWord',
  props: {
    currentTime: {
      type: Number,
      default: 0
    },
    lyrics: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  watch: {
    currentTime() {
      this.updateCurrentLyric()
    }
  },
  methods: {
    updateCurrentLyric() {
      const index = this.lyrics.findIndex((line, index) => {
        const nextLine = this.lyrics[index + 1]
        if (!nextLine) return true
        return this.currentTime >= line.time && this.currentTime < nextLine.time
      })
      if (index !== -1) {
        this.currentIndex = index
      }
    }
  }
}
</script>

<style scoped>
.lyrics-container {
  height: 400px;
  overflow: hidden;
  position: relative;
  margin: 2rem auto;
  max-width: 600px;
}

.lyrics-wrapper {
  transition: transform 0.3s ease;
}

.lyric-line {
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s;
  font-size: 1rem;
}

.lyric-line.active {
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
}
</style> 