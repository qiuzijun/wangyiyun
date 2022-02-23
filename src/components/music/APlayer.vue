<template>
  <div id="player"></div>
</template>
<script>
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";
import { mapState } from "vuex";
export default {
  data() {
    return {
      musicList: [],
    };
  },
  methods: {
    playMusic() {
      let list = this.musicList;
      const ap = new APlayer({
        container: document.getElementById("player"),
        mini: false,
        autoplay: false,
        theme: "#FADFA3",
        loop: "all",
        order: "random",
        preload: "auto",
        volume: 0.7,
        mutex: true,
        listFolded: false,
        listMaxHeight: 90,
        lrcType: 3,
        audio: list,
      });
      console.log(list);
      return ap;
    },
  },
  computed: {
    ...mapState(["songSheetList"]),
    ...mapState(["list"]),
  },
  watch: {
    songSheetList: {
      handler: function (newName = []) {
        // 去重
        let songSheet = [];
        let map = new Map();
        if (newName !== []) {
          newName.forEach((data) => {
            if (!map.has(data.id)) {
              map.set(data.id, data);
            }
          });
          map.forEach((data) => {
            // 转换歌曲时间格;
            songSheet.push({
              name: data.name,
              artist: data.ar,
              url: "url2.mp3",
              cover: "cover2.jpg",
              lrc: "lrc2.lrc",
              theme: "#46718b",
            });
          });
          // 歌单
          this.musicList = songSheet;
          console.log(this.musicList);
        }
      },
      deep: true,
    },
    // 监听榜单
    list: {
      handler: function (newName) {
        // 如果榜单播放更新歌单目录
        if (newName.length > 0) {
          this.musicList = newName;
          console.log(this.musicList);
        }
      },
    },
  },
  mounted() {
    this.playMusic();
  },
};
</script>
<style lang="less" scoped></style>
