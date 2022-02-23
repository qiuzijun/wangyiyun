<template>
  <div class="mv">
    <div class="left">
      <div class="content">
        <div class="title">
          <img src="../assets/img/icon_mv.png" alt="" />
          <p>{{ mvData.name }}</p>
        </div>
        <p>{{ mvData.artistName }}</p>
        <div
          class="videoMv"
          id="videobox"
          @mouseover="progress = true"
          @mouseout="progress = false"
        >
          <video
            class="media"
            ref="media"
            id="video"
            @click="smallPlay"
            @ended="overVideo"
            @pause="onPause"
            @play="onPlay"
            @timeupdate="videoTime"
            :src="mvAddress.url"
          ></video>
          <div class="icon" :class="progress ? 'over_animation' : ''">
            <div class="left">
              <!-- 播放键 -->
              <i class="suspend" ref="suspend" @click="smallPlay"></i>
            </div>
            <div class="center">
              <!-- 播放时间进度 -->
              <p>{{ time }}</p>
              <!-- 播放进度条 -->
              <div class="progress">
                <el-slider
                  v-model="value3"
                  class="slider"
                  id="slider"
                  :show-tooltip="false"
                  @change="pageChange"
                ></el-slider>
              </div>
              <!-- 总播放时间 -->
              <p>{{ Time }}</p>
            </div>
            <div class="right">
              <!-- 音量，全屏等 -->
              <div
                class="icon_voice"
                ref="icon_voice"
                @mouseover="volumeShow = true"
                @mouseout="volumeShow = false"
              >
                <div class="voice"></div>
                <!-- 音量 -->
                <div class="volume" v-show="volumeShow">
                  <el-slider
                    v-model="value"
                    :show-tooltip="false"
                    vertical
                    height="87px"
                    @input="volumeInput"
                  >
                  </el-slider>
                  <!-- 三角 -->
                  <div class="s_j"></div>
                </div>
              </div>
              <p class="p">1080p</p>
              <i class="icon_enlarge" @click="fullScreen"></i>
            </div>
          </div>
          <!-- 播放进度条 -->
          <div class="progress" :class="progress ? '' : 'slider_animation'">
            <el-slider
              v-model="value3"
              class="slider"
              id="slider"
              :show-tooltip="false"
              @change="pageChange"
            ></el-slider>
          </div>
          <i class="icon_suspend" v-show="suspendShow" @click="largePlay"></i>
          <i class="icon_fast" v-show="fastShow">
            <svg
              t="1643002106249"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2293"
              width="200"
              height="200"
            >
              <path
                d="M951.272 470.072c22.304 22.68 22.304 59.496 0 82.184L467.216 900.16c-32.112 17.264-68.856 21.328-68.896-45.08V703.656L124.896 900.16c-32.088 17.264-69.76 17.776-68.88-46.856v-683.4c0.904-58.368 39.464-66.856 68.88-47.768l273.432 196.512v-149.64c0.032-56.584 39.464-65.96 68.896-46.872l484.048 347.936z"
                p-id="2294"
                fill="#ffffff"
              ></path>
            </svg>
          </i>
          <i class="icon_off" v-show="offShow">
            <svg
              t="1643002352972"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2831"
              width="200"
              height="200"
            >
              <path
                d="M81.3 552.8c-21.8-22.2-21.8-58.4 0.1-80.7l475.1-341.5c31.5-17 67.6-20.9 67.6 44.3v148.6l268.4-192.8c31.5-17 68.5-17.5 67.6 46v670.9c-0.9 57.2-38.8 65.5-67.6 46.9L624 701.5v146.9c0 55.5-38.8 64.7-67.6 46L81.3 552.8z m0 0"
                p-id="2832"
                fill="#ffffff"
              ></path>
            </svg>
          </i>
        </div>
        <!-- 评论 -->
        <div class="comment">
          <div class="commentName">
            <h3>评论</h3>
            <!-- <p class="ff_p">{{ list.length }}首歌</p> -->
            <p>共{{ commentList.total }}条评论</p>
          </div>
          <div class="reply">
            <div class="text">
              <img
                src="https://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"
                alt=""
                width="50px"
                height="50px"
              />
              <div class="content">
                <textarea
                  name=""
                  id=""
                  rows="3"
                  class="text_cont"
                  placeholder="评论"
                ></textarea>
                <div class="triangle"></div>
              </div>
            </div>
            <div class="reply_img">
              <img src="../assets/img/x_l.png" alt="" class="x_l" />
              <img src="../assets/img/@.png" alt="" class="ai_t" />
              <div class="p_l">
                <p>评论</p>
              </div>
              <p>140</p>
            </div>
          </div>
          <!-- 评论内容 -->
          <div class="cmmts">
            <p>评论</p>
            <div class="cmmts_text">
              <ul>
                <li v-for="item in commentList.comments" :key="item.commentId">
                  <img
                    :src="item.user.avatarUrl"
                    alt=""
                    width="50px"
                    height="50px"
                  />
                  <div class="user_con">
                    <div class="user_con_text">
                      <p>{{ item.user.nickname }}</p>
                      <p>：{{ item.content }}</p>
                    </div>
                    <div class="user_con_time">
                      <p>{{ item.timeStr }}</p>

                      <div class="d_z">
                        <img src="../assets/img/s_k_No.png" alt="" />
                        <p v-show="item.likedCount == 0 ? true : false">
                          ({{ item.likedCount }})
                        </p>
                        <p>|&nbsp;&nbsp;回复</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 分页 -->
            <div class="page">
              <Page
                :total="commentList.total"
                :page-size="20"
                @on-change="pageIndexChange"
                @on-page-size-change="pageSizeChange"
                show-total
                show-sizer
                :page-size-opts="[10, 20, 30, 40]"
                class="p_con"
              ></Page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="content">
        <div class="jj">
          <p>MV简介</p>
        </div>
        <div class="time">
          <p>
            发布时间：<span>{{ mvData.publishTime }}</span>
          </p>
          <p>
            播放次数：<span>{{ mvData.count }}万</span>次
          </p>
        </div>
        <p>
          {{ mvData.desc }}
        </p>
        <div class="tj">
          <p>相关推荐</p>
          <ul>
            <li>
              <div class="img">
                <img
                  src="https://p1.music.126.net/DTDrsFTtldAZ1ZHiKpaFSQ==/109951163573042344.jpg?param=96y54"
                  alt=""
                />
                <p>8888</p>
              </div>
              <div class="text">
                <p>绝地求生</p>
                <p>23:06</p>
                <p>by<span>哈哈哈</span></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mvComment, mvData, mvAddress } from "@/api/http.js";
export default {
  data() {
    return {
      mvId: "",
      suspendShow: true, //暂停/播放图标切换
      value: 100, //音量滑块
      value3: 0, //视频进度条
      volumeShow: false, //音量显示隐藏
      time: "00:00", //实时播放时间
      fastShow: false, //快进隐藏
      offShow: false, //快退隐藏
      Time: "",
      moveY: "",
      // 评论
      commentList: [],
      // 页码
      pageNo: 1,
      // 评论条数
      pageSize: 20,
      //
      cursor: 0,
      // mv数据
      mvData: [],
      // mv地址
      mvAddress: [],
      // 是否全屏
      noFullScreen: false,
      // 进度条栏动画
      progress: true,
    };
  },
  methods: {
    // 获取mv地址
    async getMvAddress() {
      let res;
      try {
        res = await mvAddress({
          id: this.mvId,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      this.mvAddress = res.data.data;
    },
    // 获取mv数据
    async getMvData() {
      let res;
      try {
        res = await mvData({
          id: this.mvId,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      res.data.data.count = (res.data.data.playCount / 1000).toFixed(1);
      this.mvData = res.data.data;
      document.title = res.data.data.name;
      this.Time = this.$moment(res.data.data.duration).format("mm:ss");
    },
    // 获取mv评论
    async getComment() {
      let res;
      try {
        res = await mvComment({
          id: this.mvId,
          offset: this.pageNo,
          limit: this.pageSize,
          before: this.cursor,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      this.commentList = res.data;
      this.cursor = res.data.comments[this.pageSize - 1].time;
    },
    // 分页页码
    pageIndexChange(e) {
      this.pageNo = e;
      this.getComment();
    },
    // 每页条数
    pageSizeChange(e) {
      this.pageSize = e;
      this.getComment();
    },
    // 播放完毕
    overVideo() {
      // console.log("播放完毕");
      this.smallPlay();
    },
    // 暂停播放
    onPause() {
      // console.log("暂停播放");
      this.progress = true;
    },
    // 开始播放
    onPlay() {
      // console.log("开始播放");
    },
    // 实时播放时间
    videoTime(e) {
      this.time = this.$moment(e.target.currentTime * 1000).format("mm:ss");
      let time =
        (((e.target.currentTime * 1000).toFixed(0) / 272000) * 100).toFixed(0) *
        1;
      this.value3 = time;
    },
    // 键盘控制快进与快退 、暂停
    fastForward() {
      var time = 10; //单位秒，每次增减10秒
      var videoElement = this.$refs.media;
      let _this = this;
      document.onkeyup = function (event) {
        //键盘事件
        let e = event || window.event || arguments.callee.caller.arguments[0];
        //鼠标上下键控制视频音量
        if (e && e.keyCode === 37) {
          // 按 向左键
          videoElement.currentTime !== 0
            ? (videoElement.currentTime -= time)
            : 1;
          _this.offShow = true;
          setTimeout(() => {
            _this.offShow = false;
          }, 1000);
          return false;
        } else if (e && e.keyCode === 39) {
          // 按 向右键
          videoElement.volume !== videoElement.duration
            ? (videoElement.currentTime += time)
            : 1;
          _this.fastShow = true;
          setTimeout(() => {
            _this.fastShow = false;
          }, 1000);
          return false;
        } else if (e && e.keyCode === 32) {
          // 按空格键 判断当前是否暂停
          videoElement.paused === true
            ? videoElement.play()
            : videoElement.pause();
          _this.smallPlay();
          return false;
        }
      };
    },
    //   小按钮播放视频
    smallPlay() {
      if (this.suspendShow) {
        this.$refs.suspend.classList.remove("suspend");
        this.$refs.suspend.classList.add("icon-play");
        this.$refs.media.play();
      } else {
        this.$refs.suspend.classList.remove("icon-play");
        this.$refs.suspend.classList.add("suspend");
        this.$refs.media.pause();
      }
      this.suspendShow = !this.suspendShow;
    },
    // 大图标播放
    largePlay() {
      this.suspendShow = false;
      this.$refs.media.play();
      this.$refs.suspend.classList.remove("suspend");
      this.$refs.suspend.classList.add("icon-play");
    },
    // 全屏
    fullScreen() {
      if (this.noFullScreen) {
        // 退出全屏
        this.exitFullscreen();
        this.noFullScreen = false;
      } else {
        // 全屏
        this.launchFullscreen(document.getElementById("videobox"));
        this.noFullScreen = true;
      }
      // window.setTimeout(function exit() {
      //   //檢查瀏覽器是否處於全屏
      //   if (
      //     this.invokeFieldOrMethod(document, "FullScreen") ||
      //     this.invokeFieldOrMethod(document, "IsFullScreen") ||
      //     document.IsFullScreen
      //   ) {
      //     this.exitFullscreen();
      //   }
      // }, 5 * 1000);
    },
    //反射調用
    invokeFieldOrMethod(element, method) {
      var usablePrefixMethod;
      ["webkit", "moz", "ms", "o", ""].forEach(function (prefix) {
        if (usablePrefixMethod) return;
        if (prefix === "") {
          // 无前缀，方法首字母小写
          method = method.slice(0, 1).toLowerCase() + method.slice(1);
        }
        var typePrefixMethod = typeof element[prefix + method];
        if (typePrefixMethod + "" !== "undefined") {
          if (typePrefixMethod === "function") {
            usablePrefixMethod = element[prefix + method]();
          } else {
            usablePrefixMethod = element[prefix + method];
          }
        }
      });

      return usablePrefixMethod;
    },
    //進入全屏
    launchFullscreen(element) {
      //此方法不可以在異步任務中執行，否則火狐無法全屏
      if (element.requestFullscreen) {
        document.getElementById("video").style.height = "1040px";
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        document.getElementById("video").style.height = "1040px";
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        document.getElementById("video").style.height = "1040px";
        element.msRequestFullscreen();
      } else if (element.oRequestFullscreen) {
        document.getElementById("video").style.height = "1040px";
        element.oRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        document.getElementById("video").style.height = "1040px";
        element.webkitRequestFullScreen();
      } else {
        var docHtml = document.documentElement;
        var docBody = document.body;
        var videobox = document.getElementById("videobox");
        document.getElementById("video").style.height = "1040px";
        var cssText = "width:100%;height:100%;overflow:hidden;";
        docHtml.style.cssText = cssText;
        docBody.style.cssText = cssText;
        videobox.style.cssText = cssText + ";" + "margin:0px;padding:0px;";
        document.IsFullScreen = true;
      }
    },
    fullele() {
      return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        null
      );
    },
    //判断是否全屏
    isFullScreen() {
      return !!(document.webkitIsFullScreen || this.fullele());
    },
    //退出全屏
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.getElementById("video").style.height = "360px";
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.getElementById("video").style.height = "360px";
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.getElementById("video").style.height = "360px";
        document.mozCancelFullScreen();
      } else if (document.oRequestFullscreen) {
        document.getElementById("video").style.height = "360px";
        document.oCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.getElementById("video").style.height = "360px";
        document.webkitExitFullscreen();
      } else {
        var docHtml = document.documentElement;
        var docBody = document.body;
        var videobox = document.getElementById("videobox");
        document.getElementById("video").style.height = "360px";
        docHtml.style.cssText = "";
        docBody.style.cssText = "";
        videobox.style.cssText = "";
        document.IsFullScreen = false;
      }
    },
    // 改变音量
    volumeInput(e) {
      this.$refs.media.volume = e / 100;
      if (e == 0) {
        this.$refs.icon_voice.classList.remove("icon_voice");
        this.$refs.icon_voice.classList.add("icon_noVolume");
      } else {
        this.$refs.icon_voice.classList.remove("icon_noVolume");
        this.$refs.icon_voice.classList.add("icon_voice");
      }
    },
    // 视频进度
    pageChange(e) {
      this.value3 = e;
      this.$refs.media.currentTime = ((e / 100) * 272000) / 1000;
    },
  },
  created() {
    if (this.$route.params.id == undefined) {
      this.mvId = JSON.parse(localStorage.getItem("mvId"));
    } else {
      if (JSON.parse(localStorage.getItem("mvId")) == this.$route.params.id) {
        this.mvId = JSON.parse(localStorage.getItem("mvId"));
      } else {
        this.mvId = this.$route.params.id;
      }
    }
  },
  mounted() {
    // Esc键退出全屏
    let that = this;
    window.addEventListener("resize", function () {
      if (!that.isFullScreen()) {
        document.getElementById("video").style.height = "360px";
      }
    });
    // 快进与快退
    this.fastForward();
    this.$nextTick(() => {
      // mv评论
      this.getComment();
      // mv数据
      this.getMvData();
      // 获取mv地址
      this.getMvAddress();
    });
  },
};
</script>
<style lang="less" scoped>
.mv {
  width: 980px;
  margin: 0 auto;
  background-color: white;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  overflow: hidden;
  > .left {
    width: 708px;
    background-color: white;
    border-right: 1px solid #d3d3d3;
    float: left;
    > .content {
      width: 100%;
      padding: 25px 30px 40px 39px;
      > p {
        color: #0c73c2;
        margin-top: 5px;
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .title {
        width: 100%;
        height: 32px;
        img {
          margin-top: 10px;
          float: left;
          margin-right: 10px;
        }
        p {
          font-size: 24px;
        }
      }
      .videoMv {
        width: 100%;
        height: 360px;
        background-color: black;
        margin-top: 10px;
        position: relative;
        overflow: hidden;
        .media {
          width: 100%;
          height: 360px;
        }
        .icon {
          width: 100%;
          height: 28px;
          position: absolute;
          bottom: -28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.2s;
          .left {
            width: 7%;
            height: 28px;
            // background-color: red;
            .suspend {
              width: 34px;
              height: 32px;
              background-image: url("../assets/img/icon_mv_suspend.png");
              background-repeat: no-repeat;
              background-position: center;
              margin-left: 5px;
              margin-bottom: 5px;
              float: left;
              &:hover {
                cursor: pointer;
                background-image: url("../assets/img/icon_mv_suspend_1.png");
              }
            }
            .icon-play {
              width: 34px;
              height: 32px;
              float: left;
              background-image: url("../assets/img/icon_mv_play.png");
              background-repeat: no-repeat;
              background-position: center;
              margin-left: 5px;
              margin-bottom: 5px;
              &:hover {
                cursor: pointer;
                background-image: url("../assets/img/icon_mv_play_1.png");
              }
            }
          }
          .center {
            width: 75%;
            height: 28px;
            // background-color: pink;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .progress {
              width: 80%;
              height: 4px;
              background-color: #333;
              border-radius: 2px;
              position: relative;
              .bk_color {
                width: 0%;
                height: 4px;
                background-color: red;
                border-radius: 2px;
                position: absolute;
                top: 0px;
                left: 0px;
              }
              .icon_d {
                width: 24px;
                height: 24px;
                background-image: url("../assets/img/icon_j_1.png");
                background-repeat: no-repeat;
                background-position: center;
                position: absolute;
                top: -10px;
                left: -3%;
                &:hover {
                  cursor: pointer;
                  background-image: url("../assets/img/icon_j_2.png");
                }
              }
              .slider {
                margin-top: -16px;
              }
            }
          }
          .right {
            width: 18%;
            height: 28px;
            // background-color: skyblue;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .p {
              &:hover {
                color: white;
                cursor: pointer;
              }
            }

            .icon_voice {
              width: 24px;
              height: 100px;
              top: -44px;
              position: relative;
              .voice {
                width: 16px;
                height: 12px;
                background-image: url("../assets/img/icon_s_1.png");
                background-repeat: no-repeat;
                &:hover {
                  background-image: url("../assets/img/icon_s_2.png");
                  cursor: pointer;
                }
                position: absolute;
                bottom: 0px;
                left: 5px;
              }
              .volume {
                width: 24px;
                height: 87px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: rgba(0, 0, 0, 0.7);
                position: absolute;
                bottom: 20px;
                right: 0px;
                .s_j {
                  width: 12px;
                  height: 7px;
                  background-image: url("../assets/img/s_j.png");
                  background-repeat: no-repeat;
                  position: relative;
                  top: 5px;
                  left: 5px;
                }
              }
            }
            .icon_noVolume {
              width: 24px;
              height: 100px;
              top: -44px;
              position: relative;
              .voice {
                width: 16px;
                height: 12px;
                background-image: url("../assets/img/no_volume_1.png");
                background-repeat: no-repeat;
                &:hover {
                  background-image: url("../assets/img/no_volume_2.png");
                  cursor: pointer;
                }
                position: absolute;
                bottom: 0px;
                left: 5px;
              }
              .volume {
                width: 24px;
                height: 87px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: rgba(0, 0, 0, 0.7);
                position: absolute;
                bottom: 20px;
                right: 0px;
                .s_j {
                  width: 12px;
                  height: 7px;
                  background-image: url("../assets/img/s_j.png");
                  background-repeat: no-repeat;
                  position: relative;
                  top: 5px;
                  left: 5px;
                }
              }
            }
            .icon_enlarge {
              width: 34px;
              height: 34px;
              background-image: url("../assets/img/icon_f_1.png");
              background-repeat: no-repeat;
              margin-top: 20px;
              &:hover {
                background-image: url("../assets/img/icon_f_2.png");
                cursor: pointer;
              }
            }
          }
        }
        .over_animation {
          bottom: 0px;
          transition: all 0.2s;
        }
        .icon_suspend {
          width: 74px;
          height: 74px;
          background-image: url("../assets/img/icon_mv_D_1.png");
          background-repeat: no-repeat;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          &:hover {
            background-image: url("../assets/img/icon_mv_D.png");
            cursor: pointer;
          }
        }
        .icon_fast {
          width: 74px;
          height: 74px;
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .icon_off {
          width: 74px;
          height: 74px;
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        > .progress {
          position: relative;
          bottom: -100px;
          /deep/.el-slider__button {
            background-image: none;
          }
        }
        .slider_animation {
          bottom: 24px;
          transition: all 0.2s;
        }
      }
      .comment {
        width: 100%;
        margin-top: 100px;
        padding-left: 40px;
        padding-right: 40px;
        .commentName {
          width: 100%;
          height: 35px;
          margin-bottom: 25px;
          border-bottom: 2px solid #c20c0c;
          h3 {
            font-size: 20px;
            line-height: 35px;
            font-weight: 500;
            float: left;
          }
          p {
            margin-left: 50px;
            line-height: 35px;
            color: #666;
            float: left;
          }
        }
        .reply {
          width: 100%;
          height: 98px;
          margin-top: 30px;
          .text {
            height: 63px;
            .content {
              width: 493px;
              border: 1px solid #ccc;
              float: right;
              position: relative;
              .text_cont {
                width: 100%;
                resize: none;
                outline: none;
                border: none;
              }
              .triangle {
                width: 10px;
                height: 10px;
                transform: rotateZ(45deg);
                position: absolute;
                left: -6px;
                top: 18px;
                border-left: 1px solid #ccc;
                border-bottom: 1px solid #ccc;

                background-color: white;
              }
            }
          }
          .reply_img {
            height: 35px;
            width: 497px;
            float: right;
            .x_l {
              margin-top: 10px;
              margin-left: 10px;
              margin-right: 10px;
            }
            > p {
              margin-top: 15px;
              margin-right: 10px;
              float: right;
            }
            .p_l {
              width: 46px;
              height: 25px;
              background-image: url("../assets/img/comment_1.png");

              margin-top: 10px;
              margin-left: 10px;
              float: right;
              &:hover {
                cursor: pointer;
                background-image: url("../assets/img/comment_2.png");
              }
              p {
                line-height: 25px;
                text-align: center;
                color: white;
              }
            }
          }
        }
        .cmmts {
          width: 100%;
          margin-top: 20px;
          > p {
            font-size: 12px;
            font-weight: bold;
            border-bottom: 1px solid #ccc;
          }
          .cmmts_text {
            width: 100%;
            ul {
              li {
                min-height: 80px;
                overflow: hidden;
                padding: 15px 0;

                border-bottom: 1px solid #ccc;
                > img {
                  cursor: pointer;
                }
                .user_con {
                  width: 500px;
                  min-height: 50px;
                  float: right;
                  .user_con_text {
                    width: 100%;
                    min-height: 21px;
                    overflow: hidden;
                    p:first-child {
                      color: #0c73c2;
                      float: left;
                      &:hover {
                        text-decoration: underline;
                        cursor: pointer;
                      }
                    }
                    // p:last-child {
                    //   float: right;
                    // }
                  }
                  .user_con_time {
                    width: 100%;
                    height: 16px;
                    margin-top: 13px;
                    p:first-child {
                      color: #999;
                      float: left;
                    }

                    .d_z {
                      float: right;
                      display: flex;
                      justify-content: space-between;
                      img {
                        margin-right: 5px;
                        &:hover {
                          cursor: pointer;
                        }
                      }
                      p:first-child {
                        // float: right;
                        margin-right: 5px;
                        &:hover {
                          text-decoration: underline;
                          cursor: pointer;
                        }
                      }
                      p:last-child {
                        // margin-right: -100px;
                        // float: right;
                        &:hover {
                          text-decoration: underline;
                          cursor: pointer;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          .page {
            width: 100%;
            margin-top: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
  .right {
    width: 270px;
    height: 400px;
    float: right;
    .content {
      width: 100%;
      height: 400px;
      padding: 20px 40px 40px 30px;
      .jj {
        padding-bottom: 5px;
        border-bottom: 1px solid #ccc;
        p {
          font-weight: bold;
        }
      }
      .tj {
        margin-top: 30px;
        > p {
          font-weight: bold;
          padding-bottom: 5px;
          border-bottom: 1px solid #ccc;
        }
        ul {
          li {
            width: 100%;
            height: 54px;
            margin-top: 20px;
            .img {
              float: left;
              position: relative;
              p {
                color: white;
                position: absolute;
                top: 0px;
                right: 5px;
              }
            }
            .text {
              width: 95px;
              float: right;
              p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
              }
            }
          }
        }
      }
      .time {
        color: #999;
        margin-top: 15px;
      }
      > p {
        margin-top: 15px;
      }
    }
  }
}
/deep/.volume {
  .el-slider__bar {
    background-color: #b2072a;
    width: 4px !important;
  }
}
/deep/.progress {
  .el-slider__runway {
    height: 4px !important;
    background-color: transparent;
  }
  .el-slider__bar {
    background-color: #b2072a;
    height: 4px;
  }
  .el-slider__button {
    width: 24px;
    height: 22px;
    background-color: transparent;
    border: none;
    background-repeat: no-repeat;
    background-image: url("../assets/img/icon_j_1.png");
  }
}
/deep/.volume {
  .el-slider__runway {
    width: 4px !important;
    height: 70px !important;
    margin: 5px 9px !important;

    background-color: rgba(255, 255, 255, 0.2);
  }
}

/deep/ .volume {
  .el-slider__button {
    width: 22px !important;
    background-color: transparent;
    border: none;
    background-repeat: no-repeat;
    background-image: url("../assets/img/icon_j_1.png");
  }
}
</style>
