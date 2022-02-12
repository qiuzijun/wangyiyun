<template>
  <div class="music" :class="transition">
    <img
      src="../../assets/img/musicBkT.png"
      alt=""
      width="65px"
      height="72px"
      class="musicBkT"
    />

    <div class="content">
      <!-- 左、右切换、播放键 -->
      <div class="play">
        <img
          :src="img_left"
          alt=""
          @mouseover="img_left = playList.playLeft_02"
          @mouseout="img_left = playList.playLeft_01"
          @click="leftClick"
        />

        <img
          :src="img_play"
          alt=""
          @mouseover="playOver"
          @mouseout="playOut"
          @click.stop="playClick"
        />

        <img
          :src="img_right"
          alt=""
          @mouseover="img_right = playList.playRight_02"
          @mouseout="img_right = playList.playRight_01"
          @click="rightClick"
        />
      </div>
      <!-- 歌曲头像 -->
      <div class="head">
        <div class="musicGif" v-show="musicGif"></div>
        <img :src="songsDetail.Url" alt="" width="34px" height="35px" />
        <img
          src="../../assets/img/headBk.png"
          alt=""
          @click="routeLyric(songsId)"
        />
      </div>
      <!-- 歌曲名以及进度条 -->
      <div class="progressBar">
        <!-- 歌名 -->
        <div class="name">
          <a href="">{{ songsDetail.name }}</a>
          <span>
            <span
              @click="routeSinger(item.id, item.name, songsDetail.Url)"
              v-for="item in songsDetail.singer"
              :key="item.id"
              >{{ item.name }}/</span
            >
            <a href="">
              <img
                :src="link"
                alt=""
                @mouseover="link = require('../../assets/img/lj_02.png')"
                @mouseout="link = require('../../assets/img/lj_01.png')"
              />
            </a>
          </span>
        </div>
        <!-- 进度条背景 -->
        <div class="bar"></div>
        <!-- 进度条 -->
        <div class="redBar">
          <el-slider
            v-model="value"
            :show-tooltip="false"
            @input="inputValue"
            @change="sliderChange"
            id="slider"
          ></el-slider>
        </div>
      </div>
      <div class="time">
        <span>{{ time }}</span>
        /
        <span>{{ songsDetail.analysisTime }}</span>
      </div>
      <!-- 收藏以及转发 -->
      <div class="shareList">
        <ul>
          <li
            v-for="(item, index) in otherImg"
            :key="index"
            @mouseover="share = index"
            @mouseout="share = -1"
          >
            <img :src="share == index ? item.brighten : item.original" alt="" />
          </li>
        </ul>
      </div>
      <!-- 音量以及歌曲列表 -->
      <div class="voiceList">
        <ul>
          <li
            v-for="(item, index) in voiceList"
            :key="index"
            @mouseover="voice = index"
            @mouseout="voice = -1"
            @click.stop="voiceClick(index)"
          >
            <img :src="voice == index ? item.brighten : item.original" alt="" />
            <p v-if="index == 2 ? true : false">{{ musicList.length }}</p>
          </li>
        </ul>
        <!-- 音量条 -->
        <div class="volumeBar" v-show="volumeShow">
          <div class="bar">
            <el-slider
              v-model="valueBar"
              vertical
              :show-tooltip="false"
              height="93px"
              @input="volumeChange"
            ></el-slider>
          </div>
        </div>
        <!-- 歌曲列表 -->
        <div class="musicList" ref="musicList">
          <div class="head">
            <div class="headLeft">
              <p>播放列表({{ musicList.length }})</p>
              <div
                class="head_qc"
                @mouseover="head_qc = garbage.brighten"
                @mouseout="head_qc = garbage.original"
                @click="clearSongList"
              >
                <img :src="head_qc" alt="" />
                <span>清除</span>
              </div>
              <div
                class="head_sc"
                @mouseover="head_sc = otherImg[1].brighten"
                @mouseout="head_sc = otherImg[1].original"
              >
                <img :src="head_sc" alt="" />
                <span>收藏全部</span>
              </div>
              <div class="line"></div>
            </div>
            <div class="headRight">
              <p>{{ songsDetail.name }}</p>
              <img
                :src="fork_c"
                alt=""
                @mouseover="fork_c = fork.brighten"
                @mouseout="fork_c = fork.original"
                @click.stop="forkClick"
              />
            </div>
          </div>
          <div class="content">
            <!-- 歌单列表 -->
            <div class="list">
              <div class="contentList" ref="contentList" @scroll="listScroll">
                <ul>
                  <li
                    v-for="item in musicList"
                    :key="item.id"
                    ref="li"
                    :style="{
                      backgroundColor: item.id == songsId ? '#0e0f11' : '',
                      color: item.id == songsId ? 'white' : '#ccc',
                    }"
                    @click="songListPlaying(item.id)"
                  >
                    <!-- 正在播放图标 -->
                    <div
                      class="playing"
                      v-show="item.id == songsId ? true : false"
                    ></div>
                    <!-- 歌名 -->
                    <div class="name">
                      {{ item.name }}
                    </div>
                    <!-- 图片 -->
                    <div class="img">
                      <i class="el-icon-folder-add" title="收藏"></i>
                      <i class="el-icon-refresh-right" title="转发"></i>
                      <i
                        class="el-icon-download"
                        title="下载"
                        @click="download(item.id)"
                      ></i>
                      <i class="el-icon-delete" title="删除"></i>
                    </div>
                    <!-- 歌手 -->
                    <div class="singer">
                      <span
                        v-for="data in item.ar"
                        :key="data.id"
                        @click="routeSinger(data.id, data.name, item.al.picUrl)"
                      >
                        {{ data.name }}/
                      </span>
                    </div>
                    <!-- 时间 -->
                    <div class="time">
                      {{ $moment(item.dt).format("mm:ss") }}
                    </div>
                    <!-- 链接 -->
                    <div class="link">
                      <a href="">
                        <img
                          :src="
                            index == item.id
                              ? require('../../assets/img/lj_02.png')
                              : require('../../assets/img/lj_01.png')
                          "
                          alt=""
                          @mouseover="index = item.id"
                          @mouseout="index = -1"
                        />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- 歌单滚轮 -->
              <div class="roller" ref="roller">
                <div class="roller_body" ref="rollerBar" id="rollerBar"></div>
              </div>
            </div>
            <div class="lyric">
              <div class="content" ref="lyric_height">
                <ul>
                  <li
                    v-for="(item, index) in lyricList"
                    :key="index"
                    ref="lyricLi"
                  >
                    <p>{{ item.name }}</p>
                  </li>
                </ul>
                <!-- 歌词滚轮 -->
                <!-- <div class="roller" ref="lyric">
                  <div
                    class="roller_lyric"
                    ref="roller_lyric"
                    id="roller_lyric"
                  ></div> -->
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- 已播放音乐提示 -->
        <div class="already" v-show="alreadyShow">
          <p>已开始播放</p>
        </div>
      </div>
    </div>

    <img
      :src="img"
      alt=""
      @click.stop="lockClick"
      @mouseover="lockOver"
      @mouseout="lockOut"
      class="musicImg"
    />
    <audio
      :src="songsDetail.url"
      ref="audioRef"
      v-show="false"
      @ended="overAudio"
      @pause="onPause"
      @play="onPlay"
      @timeupdate="audioTime"
    ></audio>
  </div>
</template>
<script>
import { detail, lyric, songUrl } from "@/api/http.js";
import { mapState } from "vuex";
// import axios from "axios";
export default {
  data() {
    return {
      transition: "transition",
      slider: true, //当拖拽改变播放进度时暂停音乐实时时间歌曲进度
      value: 0, //歌曲进度条
      valueBar: 100, //音量进度条
      width: 20, //进度条预加载长度
      share: -1, //切换收藏、转发、画中画
      voice: -1, //切换音量、循环、歌曲列表
      volumeShow: false, //音量组件显示隐藏
      musicShow: true, //歌曲列表组件显示隐藏
      number: 0, //循环、循序、单曲循环图片初始
      index: -1, //歌单链接图标切换
      e_y: 0, //歌单滚轮
      lyric_y: 0, //歌词滚轮
      songSheetHeight: 0, //歌单高度
      lyric_height: 0, //歌词高度
      musicGif: false, //音乐播放动图
      head_sc: require("../../assets/img/s_01.png"),
      head_qc: require("../../assets/img/garbage_01.png"),
      fork_c: require("../../assets/img/fork_01.png"),
      link: require("../../assets/img/lj_01.png"),
      img: require("../../assets/img/lock_01.png"),
      img_left: require("../../assets/img/left_01.png"),
      img_play: require("../../assets/img/musicPlay_01.png"),
      img_right: require("../../assets/img/right_01.png"),
      lockList: {
        lock_01: require("../../assets/img/lock_01.png"),
        lock_02: require("../../assets/img/lock_02.png"),
        lock_03: require("../../assets/img/lock_03.png"),
        lock_04: require("../../assets/img/lock_04.png"),
      },
      playList: {
        playLeft_01: require("../../assets/img/left_01.png"),
        playLeft_02: require("../../assets/img/left_02.png"),
        playRight_01: require("../../assets/img/right_01.png"),
        playRight_02: require("../../assets/img/right_02.png"),
        musicPlay_01: require("../../assets/img/musicPlay_01.png"),
        musicPlay_02: require("../../assets/img/musicPlay_02.png"),
        musicPlay_03: require("../../assets/img/musicPlay_03.png"),
        musicPlay_04: require("../../assets/img/musicPlay_04.png"),
      },
      otherImg: [
        {
          original: require("@/assets/img/painting_01.png"),
          brighten: require("@/assets/img/painting_02.png"),
        },
        {
          original: require("@/assets/img/s_01.png"),
          brighten: require("@/assets/img/s_02.png"),
        },
        {
          original: require("@/assets/img/z_01.png"),
          brighten: require("@/assets/img/z_02.png"),
        },
      ],
      voiceList: [
        {
          original: require("@/assets/img/yl_01.png"),
          brighten: require("@/assets/img/yl_02.png"),
        },
        {
          original: require("@/assets/img/xh_01.png"),
          brighten: require("@/assets/img/xh_02.png"),
        },
        {
          original: require("@/assets/img/lie_01.png"),
          brighten: require("@/assets/img/lie_02.png"),
        },
      ],
      garbage: {
        original: require("@/assets/img/garbage_01.png"),
        brighten: require("@/assets/img/garbage_02.png"),
      },
      fork: {
        original: require("@/assets/img/fork_01.png"),
        brighten: require("@/assets/img/fork_02.png"),
      },
      alreadyShow: false, // 已开始播放提示显示与隐藏

      //歌曲信息
      songsDetail: {
        id: "", //歌曲id
        name: "", //歌名
        singerName: "", //歌手名
        analysisTime: "", //解析后歌曲时间
        time: 0, //歌曲时间
        url: "", //歌曲地址
      },
      // 歌曲进度时间
      time: "00:00",
      // 歌单列表
      musicList: [],
      // 歌词
      lyricList: [],
      // 歌曲id
      songsId: "",
      // 歌曲地址
      songsUrl: "",
    };
  },
  watch: {
    // // 监听歌词是否渲染
    // lyricList: {
    //   handler: function (newName) {
    //     if (newName.length > 0) {
    //       // 计算歌词滚轮高度
    //       this.lyricHeight();
    //     }
    //   },
    //   deep: true,
    // },
    // 监听歌曲详情
    songsDetail: {
      handler: function (newName) {
        // 保存最后一次的歌曲信息

        if (newName) {
          // 修改网页标题
          document.title = newName.name;
        } else {
          document.title = "网易云音乐";
        }
      },
    },
    // 监听歌曲id
    addId(newName) {
      // id传值
      if (newName) {
        // 歌曲id
        this.songsId = newName;
        // 获取歌曲详情
        this.getMusicDetails();
        // 获取歌曲地址
        this.getSongUrl();
        // 获取歌词
        this.getLyric();
      }
    },
    // 监听vuex歌单
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
            songSheet.push(data);
          });
          // 歌单
          this.musicList = songSheet;
          // localStorage.setItem("list", JSON.stringify(songSheet));
          this.$nextTick(() => {
            // 计算歌单滚动条高度
            this.rollerHeight();
          });
        }
      },
      deep: true,
    },
    // 监听已播放音乐提示
    alreadyShow(newName) {
      if (newName == true) {
        setTimeout(() => {
          this.alreadyShow = false;
        }, 2000);
      }
    },
    // 监听榜单
    list: {
      handler: function (newName) {
        // 如果榜单播放更新歌单目录
        if (newName.length > 0) {
          this.musicList = newName;
          // 传递第一首歌id
          this.$store.dispatch("playId", newName[0].id);
          this.$nextTick(() => {
            // 计算歌单滚动条高度
            this.rollerHeight();
          });
        }
      },
    },
  },
  computed: {
    ...mapState(["addId"]),
    ...mapState(["songSheetList"]),
    ...mapState(["list"]),
  },
  created() {
    // 点击歌单组件外隐藏组件
    const _this = this;
    document.addEventListener("click", (event) => {
      event = event || window.event;
      //得到目标元素的位置信息
      let target = _this.$refs.musicList.getBoundingClientRect();
      //判断之间的关系：如果点击的x坐标在目标位置left、right之间and点击的y坐标在目标位置的top、bottom之间则证明在元素内点击，否则则在元素外点击
      if (
        target.left < event.clientX &&
        event.clientX < target.right &&
        target.top < event.clientY &&
        event.clientY < target.bottom
      ) {
        // console.log(1);
      } else {
        _this.musicShow = true;
        _this.$refs.musicList.style.visibility = "hidden";
        _this.$refs.rollerBar.style.visibility = "hidden";
      }
    });
  },
  methods: {
    // 获取歌曲地址
    async getSongUrl() {
      let res;
      try {
        res = await songUrl({
          id: this.songsId,
        });
      } catch (error) {
        console.log(error);
      }

      // this.songsUrl = res.data.data[0].url;
      this.songsDetail.url = res.data.data[0].url;
      // 切换歌曲自动播放
      this.$nextTick(() => {
        this.alreadyShow = true;
        this.$refs.audioRef.play();
        this.img_play = this.playList.musicPlay_02;
      });
    },
    // 获取歌词
    async getLyric() {
      let res;
      try {
        res = await lyric({
          id: this.songsId,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      this.lyricList = [];
      // 处理歌词
      for (let i = 0; i < res.data.lrc.lyric.split("]").length; i++) {
        if (res.data.lrc.lyric.split("]")[i].split("[")[0] !== "") {
          this.lyricList.push({
            time: res.data.lrc.lyric.split("]")[i - 1].split("[")[1],
            name: res.data.lrc.lyric.split("]")[i].split("[")[0],
          });
        }
      }
      // 打印歌词
      // console.log(this.lyricList);
    },
    //   获取歌曲详情
    async getMusicDetails() {
      let res;
      try {
        res = await detail({
          ids: this.songsId,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      // console.log(res);
      res.data.songs.forEach((data) => {
        this.songsDetail.id = data.id;
        this.songsDetail.name = data.name;
        this.songsDetail.Url = data.al.picUrl;
        this.songsDetail.singer = data.ar;
        this.songsDetail.time = data.dt;
        this.songsDetail.analysisTime = this.$moment(data.dt).format("mm:ss");
      });
      // console.log(this.songsDetail);
      // 存储最后一次的歌曲
      localStorage.setItem("detail", JSON.stringify(this.songsDetail));
    },
    // 当音频播放
    onPlay() {
      // 修改网页标题
      document.title = this.songsDetail.name;
      this.musicGif = true;
      // console.log("开始播放声音");
      // console.log(this.$refs.audioRef.buffered.start(0));
      // console.log(this.$refs.audioRef.buffered.end(0));
    },
    // 当音频暂停
    onPause() {
      // 修改网页标
      if (this.$route.meta.title == undefined) {
        document.title = "网易云音乐";
      } else {
        document.title = this.$route.meta.title;
      }
      this.musicGif = false;
      // console.log("暂停播放声音");
    },
    //播放完毕执行
    overAudio() {
      this.musicGif = false;
      this.img_play = this.playList.musicPlay_01;
      setTimeout(() => {
        // 播放完毕回归进度条
        this.value = 0;
        // 播放完毕回归歌曲进度时间
        this.time = "00:00";
      });
      // 播放完毕播放下一首
      if (this.musicList.length > 0) {
        for (let i = 0; i < this.musicList.length; i++) {
          if (this.musicList[i].id == this.songsId) {
            if (this.musicList[i + 1] !== undefined) {
              this.$store.dispatch("playId", this.musicList[i + 1].id);
            } else {
              this.$store.dispatch("playId", this.musicList[0].id);
            }
          }
        }
      }
    },
    // 音乐实时时间
    audioTime(e) {
      setTimeout(() => {
        let time =
          (
            ((e.target.currentTime * 1000).toFixed(0) / this.songsDetail.time) *
            100
          ).toFixed(0) * 1;
        // 进度条进度
        if (time !== Infinity && this.slider == true) {
          this.value = time;
          // 歌曲进度时间
          this.time = this.$moment(e.target.currentTime * 1000).format("mm:ss");
        }
      });
    },
    // 隐藏歌单组件
    forkClick() {
      this.musicShow = true;
      this.$refs.musicList.style.visibility = "hidden";
      this.$refs.rollerBar.style.visibility = "hidden";
    },
    // 拖拽改变播放进度
    sliderChange(e) {
      this.value = e;
      this.$refs.audioRef.currentTime =
        ((e / 100) * this.songsDetail.time) / 1000;
    },
    // 拖拽改变播放时间
    inputValue() {
      document.getElementById("slider").addEventListener("mousedown", () => {
        this.slider = false;
      });
      document.getElementById("slider").addEventListener("mouseup", () => {
        this.slider = true;
      });
    },
    lockClick() {
      if (this.img == this.lockList.lock_02) {
        this.img = this.lockList.lock_04;
      } else {
        this.img = this.lockList.lock_02;
      }
      switch (this.img) {
        case this.lockList.lock_04 || this.lockList.lock_03:
          this.transition = "bottom";
          break;

        default:
          this.transition = "transition";
          break;
      }
    },
    // 锁移入
    lockOver() {
      if (this.img == this.lockList.lock_01) {
        this.img = this.lockList.lock_02;
      } else {
        this.img = this.lockList.lock_04;
      }
    },
    // 离开锁
    lockOut() {
      if (this.img == this.lockList.lock_02) {
        this.img = this.lockList.lock_01;
      } else {
        this.img = this.lockList.lock_03;
      }
    },
    // 播放暂停
    playClick() {
      if (this.img_play == this.playList.musicPlay_03) {
        //   切换成播放键
        this.img_play = this.playList.musicPlay_04;
        this.$refs.audioRef.play();
      } else {
        //   暂停键
        this.img_play = this.playList.musicPlay_03;
        this.$refs.audioRef.pause();
      }
    },

    // 播放键移入
    playOver() {
      if (this.img_play == this.playList.musicPlay_01) {
        this.img_play = this.playList.musicPlay_03;
      } else {
        this.img_play = this.playList.musicPlay_04;
      }
    },
    // 播放键移出
    playOut() {
      if (this.img_play == this.playList.musicPlay_03) {
        this.img_play = this.playList.musicPlay_01;
      } else {
        this.img_play = this.playList.musicPlay_02;
      }
    },
    // 播放模式切换
    voiceClick(index) {
      // 循环、循序、单曲循环图片
      let voiceList = [
        {
          original: require("@/assets/img/xh_01.png"),
          brighten: require("@/assets/img/xh_02.png"),
        },
        {
          original: require("@/assets/img/sx_01.png"),
          brighten: require("@/assets/img/sx_02.png"),
        },
        {
          original: require("@/assets/img/sui_01.png"),
          brighten: require("@/assets/img/sui_02.png"),
        },
      ];

      this.number++;
      if (this.number == 3) {
        this.number = 0;
      }
      if (index == 1) {
        this.voiceList[index] = voiceList[this.number];
      }
      // 音量点击隐藏显示
      if (index == 0) {
        this.volumeShow = !this.volumeShow;
      }
      // 歌曲列表点击隐藏显示
      if (index == 2) {
        this.musicShow = !this.musicShow;
        if (!this.musicShow) {
          this.$refs.musicList.style.visibility = "visible";
          this.$refs.rollerBar.style.visibility = "visible";
        } else {
          this.$refs.musicList.style.visibility = "hidden";
          this.$refs.rollerBar.style.visibility = "hidden";
        }
      }
    },
    // 音量改变
    volumeChange(e) {
      // 改变音量
      this.$refs.audioRef.volume = (e / 100).toFixed(1);
      // 当音量最低修改音量图标
      if (e == 0) {
        this.voiceList[0] = {
          original: require("@/assets/img/wyl_01.png"),
          brighten: require("@/assets/img/wyl_02.png"),
        };
      } else {
        this.voiceList[0] = {
          original: require("@/assets/img/yl_01.png"),
          brighten: require("@/assets/img/yl_02.png"),
        };
      }
    },
    // 计算歌单滚动条高度
    rollerHeight() {
      let contentHeight = this.$refs.contentList.offsetHeight;
      let liHeight = 0;
      this.$refs.li.forEach((data) => {
        liHeight += data.offsetHeight * 1;
      });
      // 歌单高度
      this.songSheetHeight = liHeight;
      this.$refs.rollerBar.style.height =
        (contentHeight / liHeight) * contentHeight + "px";
      // if (liHeight < contentHeight) {
      //   this.$refs.rollerBar.style.visibility = "hidden";
      // } else {
      //   this.$refs.rollerBar.style.visibility = "visible";
      // }
    },
    //拖拽歌单滚轮
    songSheetMouseMove() {
      let bar = document.getElementById("rollerBar");
      bar.addEventListener("mousedown", (e) => {
        // console.log(e.pageY);
        e.preventDefault();
        this.e_y = e.pageY;
        document.onmousemove = (e) => {
          let rollerY = e.pageY - this.e_y;
          this.$refs.rollerBar.style.top = bar.offsetTop + rollerY + "px";
          this.e_y = e.pageY;
          // 判断上边界
          if (bar.offsetTop < 0) {
            this.$refs.rollerBar.style.top = 0 + "px";
          }
          // 判断下边界
          if (
            this.$refs.rollerBar.offsetHeight + bar.offsetTop >
            this.$refs.contentList.offsetHeight
          ) {
            this.$refs.rollerBar.style.top =
              this.$refs.contentList.offsetHeight -
              this.$refs.rollerBar.offsetHeight +
              "px";
          }
          // 计算歌单列表滚动距离
          let scrollTop =
            (bar.offsetTop *
              (this.songSheetHeight - this.$refs.contentList.offsetHeight)) /
            (this.$refs.contentList.offsetHeight -
              this.$refs.rollerBar.offsetHeight);
          this.$refs.contentList.scrollTop = scrollTop;
        };
        document.onmouseup = () => {
          document.onmousemove = null;
        };
      });
    },
    // 歌单滚轮事件
    listScroll(e) {
      this.$refs.rollerBar.style.top =
        (e.target.scrollTop *
          (this.$refs.contentList.offsetHeight -
            this.$refs.rollerBar.offsetHeight)) /
          (this.songSheetHeight - this.$refs.contentList.offsetHeight) +
        "px";
    },
    // // 计算歌词滚轮高度
    // lyricHeight() {
    //   let lyricHeight = this.$refs.lyric_height.offsetHeight;
    //   let liHeight = 0;
    //   this.$nextTick(() => {
    //     this.$refs.lyricLi.forEach((data) => {
    //       liHeight += data.offsetHeight * 1;
    //     });
    //     // 歌词高度
    //     this.$refs.roller_lyric.style.height =
    //       (lyricHeight / liHeight) * lyricHeight + "px";
    //   });
    // },
    // //拖拽歌词滚轮
    // lyricMouseMove() {
    //   let bar = document.getElementById("roller_lyric");
    //   bar.addEventListener("mousedown", (e) => {
    //     e.preventDefault();
    //     this.lyric_y = e.pageY;
    //     document.onmousemove = (e) => {
    //       let rollerY = e.pageY - this.lyric_y;
    //       this.$refs.roller_lyric.style.top = bar.offsetTop + rollerY + "px";
    //       this.lyric_y = e.pageY;
    //       // 判断上边界
    //       if (bar.offsetTop < 0) {
    //         this.$refs.roller_lyric.style.top = 0 + "px";
    //       }
    //       // 判断下边界
    //       if (
    //         this.$refs.roller_lyric.offsetHeight + bar.offsetTop >
    //         this.$refs.lyric_height.offsetHeight
    //       ) {
    //         this.$refs.roller_lyric.style.top =
    //           this.$refs.lyric_height.offsetHeight -
    //           this.$refs.roller_lyric.offsetHeight +
    //           "px";
    //       }
    //       // 计算歌单列表滚动距离
    //       let scrollTop =
    //         (bar.offsetTop *
    //           (this.songSheetHeight - this.$refs.lyric_height.offsetHeight)) /
    //         (this.$refs.lyric_height.offsetHeight -
    //           this.$refs.roller_lyric.offsetHeight);
    //       this.$refs.lyric_height.scrollTop = scrollTop;
    //     };
    //     document.onmouseup = () => {
    //       document.onmousemove = null;
    //     };
    //   });
    // },
    // // 歌词滚轮事件
    // lyricScroll(e) {
    //   let bar = document.getElementById("roller_lyric");
    //   this.$refs.roller_lyric.style.top =
    //     (e.target.scrollTop *
    //       (this.$refs.lyric_height.offsetHeight -
    //         this.$refs.roller_lyric.offsetHeight)) /
    //       (this.songSheetHeight - this.$refs.lyric_height.offsetHeight) +
    //     "px";
    //   // 判断下边界
    //   if (
    //     this.$refs.roller_lyric.offsetHeight + bar.offsetTop >
    //     this.$refs.lyric_height.offsetHeight
    //   ) {
    //     this.$refs.roller_lyric.style.top =
    //       this.$refs.lyric_height.offsetHeight -
    //       this.$refs.roller_lyric.offsetHeight +
    //       "px";
    //   }
    // },
    // 点击歌单列表播放
    songListPlaying(id) {
      // 点击列表传递id值
      this.$store.dispatch("playId", id);
    },
    // 左切歌
    leftClick() {
      if (this.musicList.length > 0) {
        for (let i = 0; i < this.musicList.length; i++) {
          if (this.musicList[i].id == this.songsId) {
            if (this.musicList[i - 1] == undefined) {
              this.$store.dispatch(
                "playId",
                this.musicList[this.musicList.length - 1].id
              );
            } else {
              this.$store.dispatch("playId", this.musicList[i - 1].id);
            }
          }
        }
      }
    },
    // 右切歌
    rightClick() {
      if (this.musicList.length > 0) {
        for (let i = 0; i < this.musicList.length; i++) {
          if (this.musicList[i].id == this.songsId) {
            if (this.musicList[i + 1] == undefined) {
              this.$store.dispatch("playId", this.musicList[0].id);
            } else {
              this.$store.dispatch("playId", this.musicList[i + 1].id);
            }
          }
        }
      }
    },
    // 清除歌单
    clearSongList() {
      this.musicList = [];
      this.$store.dispatch("delete", true);
    },
    // 下载歌曲
    async download(id) {
      console.log(id);
      // 获取url地址
      let res;
      try {
        res = await songUrl({
          id,
        });
      } catch (error) {
        console.log(error);
      }
      // 下载音乐文件
      window.location.href = res.data.data[0].url;
      window.open(res.data.data[0].url, "_black");
    },
    // 跳转歌手界面
    routeSinger(id, name, src) {
      this.$router.push({
        name: "singerInformation",
        params: {
          singer: {
            id,
            name,
            src,
          },
        },
      });
      let singer = {
        id,
        name,
        src,
      };
      localStorage.setItem("singerId", JSON.stringify(singer));
    },
    // 跳转歌词界面
    routeLyric(id) {
      this.$router.push({
        name: "lyric",
        params: {
          id,
        },
      });
      localStorage.setItem("lyricId", id);
    },
  },
  mounted() {
    //拖拽歌单滚轮
    this.songSheetMouseMove();
    // // 拖拽歌词滚轮
    // this.lyricMouseMove();
    // 获取用户最后一次操作的歌单，和播放的获取
    if (localStorage.getItem("detail")) {
      // this.musicList = JSON.parse(localStorage.getItem("list"));
      this.songsDetail = JSON.parse(localStorage.getItem("detail"));
    }
  },
};
</script>
<style lang="less" scoped>
.transition {
  transition: all 0.5s;
  &:hover {
    bottom: 0px;
  }
}
.bottom {
  bottom: 0px !important;
}
.music {
  width: 100%;
  height: 53px;
  background-image: url("../../assets/img/musicBk.png");
  background-size: 100% 54px;
  position: fixed;
  bottom: -53px;
  cursor: pointer;
  z-index: 1000;
  .musicBkT {
    margin-top: -17px;
    float: right;
  }
  .musicImg {
    margin-top: -65px;
    margin-right: -30px;
    float: right;
    cursor: pointer;
  }
  .content {
    width: 980px;
    height: 53px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .play {
      width: 100px;
      height: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .head {
      width: 34px;
      height: 35px;
      position: relative;
      .musicGif {
        width: 34px;
        height: 35px;
        background-image: url("../../assets/Gif/playing.gif");
        background-size: 34px 35px;
        background-repeat: no-repeat;
        position: absolute;
        top: 0px;
        left: 0px;
      }
      img:last-child {
        position: absolute;
        top: 0px;
        left: 0px;
      }
    }
    .progressBar {
      width: 493px;
      height: 37px;
      position: relative;
      .name {
        width: 100%;
        height: 28px;
        position: relative;
        a {
          color: #e8e8e8;
          margin-right: 15px;
          &:hover {
            text-decoration: underline;
          }
        }
        > span {
          font-size: 10px;
          color: #9b9b9b;
          display: inline-block;
          span {
            &:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }
          a {
            margin-left: 15px;
            position: absolute;
            top: 2px;
          }
        }
      }
      .bar {
        width: 100%;
        height: 9px;
        background-image: url("../../assets/img/bar_01.png");
        background-repeat: no-repeat;
      }
      .redBar {
        width: 100%;
        height: 9px;
        position: absolute;
        top: 13px;
      }
    }
    > .time {
      margin-top: 28px;
      color: #797979;
      span:first-child {
        color: #a1a1a1;
      }
    }
    .shareList {
      width: 95px;
      height: 25px;
      ul {
        li {
          margin-right: 12px;
          float: left;
        }
      }
    }
    .voiceList {
      width: 130px;
      height: 25px;
      position: relative;
      > ul {
        li {
          width: 25px;
          margin-right: 10px;
          float: left;
          position: relative;
          p {
            line-height: 25px;
            color: #666;
            position: absolute;
            top: 0px;
            right: -15px;
          }
        }
      }
      .volumeBar {
        width: 32px;
        height: 113px;
        background-image: url("../../assets/img/volume.png");
        position: absolute;
        top: -126px;
        left: -7px;
        z-index: 1000;
        .bar {
          width: 32px;
          height: 93px;
          margin: 15px 0px 0 -3px;
        }
      }
      .musicList {
        width: 986px;
        height: 301px;
        position: absolute;
        top: -313px;
        left: -850px;
        cursor: default;
        user-select: none;
        visibility: hidden;
        .head {
          width: 100%;
          height: 40px;
          background-image: url("https://s2.music.126.net/style/web2/img/frame/playlist_bg.png?2e83d0858e49f17bd40ae4d665d762b9");
          background-repeat: no-repeat;
          .headLeft {
            width: 566px;
            height: 100%;
            line-height: 40px;
            color: #ccc;
            float: left;
            p {
              font-size: 14px;
              color: #e2e2e2;
              margin-left: 25px;
              float: left;
            }
            .head_sc {
              margin-right: 50px;
              float: right;
              display: flex;
              justify-content: space-between;
              align-items: center;
              img {
                margin-right: 5px;
              }
              &:hover {
                cursor: pointer;
                span {
                  color: #e2e2e2;
                  text-decoration: underline;
                }
              }
            }
            .head_qc {
              margin-right: 15px;
              float: right;
              display: flex;
              justify-content: space-between;
              align-items: center;
              img {
                margin-right: 5px;
              }
              &:hover {
                cursor: pointer;
                span {
                  color: #e2e2e2;
                  text-decoration: underline;
                }
              }
            }
            .line {
              width: 2px;
              height: 15px;
              margin-left: 485px;
              margin-top: 10px;
              border-right: 1px solid #2c2c2c;
            }
          }
          .headRight {
            width: 420px;
            height: 100%;
            float: right;
            position: relative;
            p {
              width: 375px;
              text-align: center;
              height: 39px;
              line-height: 39px;
              color: #fff;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
            }
            img {
              position: absolute;
              left: 390px;
              top: 15px;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        .content {
          width: 100%;
          height: 260px;
          overflow: hidden;

          background: url("https://s2.music.126.net/style/web2/img/frame/playlist_bg.png?2e83d0858e49f17bd40ae4d665d762b9")
            no-repeat;
          background-position: -1014px 0;
          background-repeat: repeat-y;
          opacity: 0.9;
          .list {
            width: 560px;
            padding-left: 6px;
            height: 100%;
            position: relative;
            overflow: hidden;
            .contentList {
              width: 583px;
              height: 100%;
              overflow-y: scroll;
              overflow-x: hidden;
              ul {
                width: 100%;
                li {
                  width: 100%;
                  height: 28px;
                  display: flex;
                  justify-content: space-between;
                  line-height: 28px;
                  color: #ccc;
                  position: relative;
                  .playing {
                    width: 10px;
                    height: 28px;
                    background: url("../../assets/img/listPlay.png") no-repeat
                      1px;
                    position: absolute;
                    left: 0px;
                  }
                  .name {
                    width: 266px;
                    padding-left: 17px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  .img {
                    width: 100px;

                    i {
                      display: none;
                      font-size: 15px;
                      margin-top: 6px;
                      margin-right: 10px;
                      float: left;
                    }
                  }
                  .singer {
                    width: 80px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    span {
                      &:hover {
                        text-decoration: underline;
                      }
                    }
                  }
                  .time {
                    width: 45px;
                  }
                  .link {
                    width: 43px;
                    a {
                      img {
                        margin-top: 8px;
                      }
                    }
                  }
                  &:hover {
                    color: white;
                    background-color: #0e0f11;
                    cursor: pointer;
                    .img {
                      i {
                        display: block;
                      }
                    }
                  }
                }
              }
            }
            .roller {
              width: 9px;
              height: 100%;
              background-color: #0e0f11;
              position: absolute;
              top: 0;
              right: 0;
              .roller_body {
                width: 9px;
                height: 26px;
                border-radius: 5px;
                cursor: pointer;
                background: #868686;
                border: 1px solid #a6a6a6;
                opacity: 0.8;
                visibility: hidden;
                position: absolute;
                top: 0px;
              }
            }
          }
          .lyric {
            width: 437px;
            height: 100%;
            float: right;
            overflow: hidden;
            // position: relative;
            .content {
              width: 447px;
              overflow-y: scroll;
              position: relative;
              // top: 50px;
              // right: 0;
              > ul {
                width: 100%;
                position: absolute;
                top: 50px;
                right: 0;
                li {
                  width: 100%;
                  height: 32px;
                  p {
                    text-align: center;
                    color: #989898;
                  }
                }
              }
              .roller {
                width: 9px;
                height: 260px;
                background-color: #0e0f11;
                position: absolute;

                right: 2px;
                .roller_lyric {
                  width: 9px;
                  height: 26px;
                  border-radius: 5px;
                  cursor: pointer;
                  background: #868686;
                  border: 1px solid #a6a6a6;
                  opacity: 0.8;
                  position: absolute;
                  top: 0px;
                }
              }
            }
          }
        }
      }
      .already {
        width: 152px;
        height: 49px;
        position: absolute;
        top: -62px;
        right: -27px;
        background: url("../../assets/img/already.png") no-repeat;
        p {
          text-align: center;
          line-height: 42px;
          color: white;
        }
      }
    }
  }
}
/deep/ .el-slider__bar {
  background: #c70c0c;
}
/deep/ .el-slider__runway {
  background-color: transparent;
}
/deep/ .el-slider__button {
  width: 22px;
  height: 20px;
  border-radius: none;
  background-color: transparent;
  border: none;
  background-image: url("../../assets/img/spot_01.png");
}
</style>
