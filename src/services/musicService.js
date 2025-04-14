// 模拟音乐数据
const mockPlaylist = [
  {
    id: 1,
    title: "星空下的梦想",
    artist: "陈思源",
    cover: "https://public.readdy.ai/ai/img_res/bf27317d1d1e0616d08363a07e805612.jpg",
    audio: "2.mp3",
    duration: 240,
    lyrics: [
      { time: 0, text: "星空下的梦想" },
      { time: 5, text: "照亮了我的心" },
      { time: 10, text: "让我不再迷茫" }
    ]
  },
  {
    id: 2,
    title: "雨后彩虹",
    artist: "林雨晴",
    cover: "https://public.readdy.ai/ai/img_res/d05953a2c18cffe3aac33996e88578b1.jpg",
    audio: "2.mp3",
    duration: 210,
    lyrics: [
      { time: 0, text: "雨后的天空" },
      { time: 4, text: "出现了一道彩虹" },
      { time: 8, text: "就像我们的约定" }
    ]
  }
]

class MusicService {
  constructor() {
    this.playlist = mockPlaylist
  }

  // 获取播放列表
  async getPlaylist() {
    return this.playlist
  }

  // 解析LRC歌词文件
  parseLrc(lrcText) {
    const lines = lrcText.split('\n')
    const lyrics = []
    
    lines.forEach(line => {
      const timeMatch = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/)
      if (timeMatch) {
        const minutes = parseInt(timeMatch[1])
        const seconds = parseInt(timeMatch[2])
        const milliseconds = parseInt(timeMatch[3])
        const time = minutes * 60 + seconds + milliseconds / 1000
        
        const text = line.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/g, '').trim()
        if (text) {
          lyrics.push({ time, text })
        }
      }
    })
    
    return lyrics
  }

  // 获取歌曲歌词
  async getLyrics(songId) {
    const song = this.playlist.find(s => s.id === songId)
    return song ? song.lyrics : []
  }

  // 创建歌单
  async createPlaylist(name, songs) {
    const newPlaylist = {
      id: Date.now(),
      name,
      songs,
      createdAt: new Date().toISOString()
    }
    return newPlaylist
  }

  // 分享歌单
  async sharePlaylist(playlistId) {
    // 模拟生成分享链接
    return `https://music-player.com/playlist/${playlistId}`
  }
}

export default new MusicService() 