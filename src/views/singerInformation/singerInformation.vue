<template>
  <div class="singer">
    <div class="left">
      <div class="content">
        <p v-show="singerData == undefined ? false : true">
          {{ singerData == undefined ? "" : singerData.name }}
        </p>
        <div class="list_img">
          <img
            :src="singerData == undefined ? '' : singerData.src"
            width="638px"
            height="300px"
            alt=""
          />
          <div class="bk"></div>
          <div class="list">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="1">热门作品</el-menu-item>
              <el-menu-item index="2">所有专辑</el-menu-item>
              <el-menu-item index="3">相关MV</el-menu-item>
              <el-menu-item index="4">艺人介绍</el-menu-item>
            </el-menu>
          </div>
        </div>
        <!-- 热门作品 -->
        <div class="hotWorks" v-if="index == 1 ? true : false">
          <div class="imgList">
            <div class="b_f">
              <div class="b_f_left" @click="playList">
                <p>播放</p>
              </div>
              <div class="b_f_right"></div>
            </div>
            <div class="s_c">
              <div class="s_c_bu"></div>
              <p>收藏热门50</p>
            </div>
          </div>
          <div class="musicList">
            <ul>
              <li v-for="(item, index) in list" :key="item.id">
                <div class="number">
                  <p>
                    <span>{{ index + 1 }}</span>
                  </p>
                </div>
                <div class="name_img">
                  <div class="playImg" @click="playId(item.id)"></div>
                  <p>
                    <span>{{ item.name }}</span>
                    <span v-show="item.alia.length > 0 ? true : false"
                      >-({{ item.alia[0] }})</span
                    >
                  </p>
                  <div
                    class="mv"
                    @click="routeMv(item.mv)"
                    v-show="item.mv == 0 ? false : true"
                  ></div>
                </div>
                <div class="time">
                  <p>{{ item.time }}</p>
                </div>
                <div class="time_img">
                  <i class="el-icon-plus" title="加入播放列表"></i>
                  <i class="el-icon-folder-add" title="收藏"></i>
                  <i class="el-icon-refresh-right" title="分享"></i>
                  <i class="el-icon-bottom" title="下载"></i>
                </div>
                <div class="song_name">
                  <p>
                    <span v-for="data in item.ar" :key="data.name"
                      >{{ data.name }}/</span
                    >
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 所有专辑 -->
        <div class="all" v-else-if="index == 2 ? true : false">
          <ul>
            <li v-for="item in hotAlbums" :key="item.id">
              <div class="list_img">
                <img src="../../assets/img/pian.png" alt="" class="list_bk" />
                <img
                  :src="item.picUrl"
                  alt=""
                  class="list_img"
                  width="130px"
                  height="130px"
                />
              </div>
              <div class="play" @click="allPlay(item.id)"></div>
              <p>{{ item.name }}</p>
              <p>
                {{ item.time }}
              </p>
            </li>
          </ul>
          <!-- 分页 -->
          <div class="page">
            <Page
              :total="200"
              :page-size="12"
              @on-change="albumIndexChange"
              show-total
              class="p_con"
            ></Page>
          </div>
        </div>
        <!-- 相关MV -->
        <div class="relevant" v-else-if="index == 3 ? true : false">
          <ul>
            <li v-for="item in songsMv" :key="item.id">
              <div class="mvImg">
                <img :src="item.imgurl" alt="" width="137px" height="103px" />
                <div class="bk"></div>
              </div>
              <div class="playImg" @click="routeMv(item.id)"></div>
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </div>
        <!-- 艺人介绍 -->
        <div class="introduce" v-else>
          <div class="title">
            <div class="identification"></div>
            <h2>{{ singerData.name }}简介</h2>
          </div>
          <!-- 人物介绍 -->
          <div class="text">
            <p>
              {{ describe.briefDesc }}
            </p>
          </div>
          <!-- 描述 -->
          <div class="desc">
            <ul>
              <li v-for="item in describe.introduction" :key="item.ti">
                <h2>{{ item.ti }}</h2>
                <p v-show="item.ti !== '主要成就' ? true : false">
                  {{ item.txt }}
                </p>
                <p
                  v-show="item.ti == '主要成就' ? true : false"
                  v-for="data in item.txt"
                  :key="data"
                >
                  {{ data }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="content">
        <div class="title">
          <p>热门歌手</p>
        </div>
        <div class="list">
          <ul>
            <li v-for="item in singer" :key="item.id">
              <img :src="item.picUrl" alt="" width="50px" height="50px" />
              <p>
                {{ item.name }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  firstMusic,
  singerAlbum,
  singerMv,
  singerInformation,
  hotSinger,
  singerDetail,
} from "@/api/http.js";
export default {
  data() {
    return {
      activeIndex: "1", //默认菜单
      dropShow: false, //热门单曲显示隐藏
      index: 1, //切换菜单 ，1为默认值
      singerData: "", //歌手数据
      // 歌曲列表
      list: [],
      //专辑列表
      hotAlbums: [],
      // 专辑页数
      albumsIndex: 1,
      // mv列表
      songsMv: [],
      // 艺人介绍
      describe: [],
      // 热门歌手
      singer: [],
      // 歌手详情
      detail: [],
    };
  },
  watch: {
    singerData: {
      handler: function (newName) {
        if (newName) {
          // console.log(newName);s
        }
      },
    },
    $route: {
      handler: function (newName) {
        console.log(newName);
      },
    },
  },
  methods: {
    // 切换菜单的回调
    handleSelect(key) {
      this.index = key;
      switch (key * 1) {
        case 1:
          this.getNoMusic();
          break;
        case 2:
          this.getAlbum();
          break;
        case 3:
          this.getSongsMv();
          break;
        case 4:
          this.getDesc();
          break;

        default:
          break;
      }
    },
    // 获取歌手信息
    async getSingerDetail() {
      let res;
      try {
        res = await singerDetail({
          id: this.singerData.id,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      this.detail = res.data.data;
    },
    // 获取歌手前50歌曲
    async getNoMusic() {
      let res;
      try {
        res = await firstMusic({
          id: this.singerData.id,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      res.data.songs.forEach((data) => {
        // 歌曲时间
        data.time = this.$moment(data.dt).format("mm:ss");
      });
      this.list = res.data.songs;
    },
    // 获取歌手专辑
    async getAlbum() {
      let res;
      try {
        res = await singerAlbum({
          id: this.singerData.id,
          offset: this.albumsIndex,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      res.data.hotAlbums.forEach((data) => {
        data.time = this.$moment(data.publishTime).format("YYYY.MM.DD");
      });
      this.hotAlbums = res.data.hotAlbums;
    },
    // 获取相关MV
    async getSongsMv() {
      let res;
      try {
        res = await singerMv({
          id: this.singerData.id,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      this.songsMv = res.data.mvs;
    },
    // 专辑分页
    albumIndexChange(e) {
      this.albumsIndex = e;
      this.getAlbum();
    },
    // 获取艺人介绍
    async getDesc() {
      let res;
      try {
        res = await singerInformation({
          id: this.singerData.id,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      res.data.introduction.forEach((data) => {
        if (data.ti == "主要成就") {
          data.txt = data.txt.split("\n");
        }
      });
      this.describe = res.data;
    },
    // 获取热门歌手
    async getHotSongs() {
      let res;
      try {
        res = await hotSinger({});
      } catch (error) {
        console.log(error);
        return;
      }
      this.singer = res.data.artists.slice(0, 6);
    },
    //播放列表
    playList() {
      this.$store.dispatch("singerMusic", this.singerData.id);
    },
    // 单曲播放
    playId(id) {
      this.$store.dispatch("playId", id);
    },
    // 专辑播放
    allPlay(id) {
      this.$store.dispatch("newDiscId", id);
    },
    // 播放mv
    routeMv(id) {
      this.$router.push({
        name: "mv",
        params: {
          id,
        },
      });
      localStorage.setItem("mvId", id);
    },
  },
  created() {
    if (this.$route.params.singer == undefined) {
      this.singerData = JSON.parse(localStorage.getItem("singerId"));
    } else {
      if (
        JSON.parse(localStorage.getItem("singerId")).id ==
        this.$route.params.singer.id
      ) {
        this.singerData = JSON.parse(localStorage.getItem("singerId"));
      } else {
        this.singerData = this.$route.params.singer;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 获取歌手前50歌曲
      this.getNoMusic();
      // 热门歌手
      this.getHotSongs();
    });
    // 获取歌手详情
    this.getSingerDetail();
  },
};
</script>
<style lang="less" scoped>
.singer {
  width: 980px;

  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  box-sizing: border-box;
  background-color: white;
  margin: 0 auto;
  overflow: hidden;

  .left {
    width: 708px;
    border-right: 1px solid #d3d3d3;
    float: left;
    .content {
      padding: 47px 30px 40px 39px;
      > p {
        font-size: 24px;
        span {
          font-size: 12px;
          color: #ccc;
        }
      }
      .list_img {
        width: 100%;
        height: 340px;
        position: relative;
        .bk {
          width: 100%;
          height: 300px;
          position: absolute;
          top: 0;
          background-image: url("../../assets/img/ban_mask.png");
        }
        .list {
          width: 100%;
          .el-tabs--border-card {
            margin-top: -5px;
          }
        }
      }
      .hotWorks {
        .imgList {
          width: 100%;
          height: 31px;
          margin-top: 25px;
          position: relative;
          .b_f {
            width: 97px;
            height: 31px;
            // float: left;
            .b_f_left {
              width: 66px;
              height: 31px;
              background-image: url("../../assets/img/btn_1.png");
              float: left;
              p {
                color: white;
                line-height: 31px;
                margin-left: 35px;
              }
              &:hover {
                background-image: url("../../assets/img/btn_2.png");
                cursor: pointer;
              }
            }
            .b_f_right {
              width: 31px;
              height: 31px;
              background-image: url("../../assets/img/btn_jia_1.png");
              float: right;
              &:hover {
                background-image: url("../../assets/img/btn_jia_2.png");
                cursor: pointer;
              }
            }
          }
          .s_c {
            width: 89px;
            height: 31px;
            position: absolute;
            top: 0;
            left: 105px;
            background-image: url("../../assets/img/shou_1.png");
            background-repeat: no-repeat;

            &:hover {
              background-image: url("../../assets/img/shou_2.png");
              cursor: pointer;
              .s_c_bu {
                background-image: url("../../assets/img/btn_bu_2.png");
              }
            }
            .s_c_bu {
              width: 5px;
              height: 31px;
              background-image: url("../../assets/img/btn_bu_1.png");
              background-repeat: no-repeat;
              float: right;
            }
            p {
              color: #333;
              font-family: simsun, \5b8b\4f53;
              line-height: 31px;
              float: right;
            }
          }
        }
        .musicList {
          width: 100%;
          margin-top: 20px;
          ul {
            li {
              height: 30px;
              display: flex;
              justify-content: space-between;
              .number {
                width: 77px;
                padding: 6px 10px;
                p {
                  color: #999;
                  text-align: center;
                }
              }
              .name_img {
                width: 315px;
                padding: 6px 10px;

                .playImg {
                  width: 24px;
                  height: 20px;
                  background-image: url("../../assets/img/soPlay_01.png");
                  background-size: 17px;
                  margin-right: 10px;
                  background-repeat: no-repeat;
                  float: left;
                  &:hover {
                    background-image: url("../../assets/img/soPlay_02.png");
                    cursor: pointer;
                  }
                }
                p {
                  width: 200px;
                  margin-right: -7px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  float: left;
                  span:first-child {
                    &:hover {
                      text-decoration: underline;
                      cursor: pointer;
                    }
                  }
                  span:last-child {
                    color: #aeaeae;
                  }
                }
                .mv {
                  width: 35px;
                  height: 17px;
                  background-image: url("../../assets/img/mv_1.png");
                  background-repeat: no-repeat;
                  margin-left: 15px;
                  float: left;
                  &:hover {
                    background-image: url("../../assets/img/mv_2.png");
                    cursor: pointer;
                  }
                }
              }
              .time {
                width: 91px;

                padding: 6px 10px;
                display: block;
                p {
                  color: #666;
                  text-align: center;
                }
              }
              .time_img {
                width: 91px;

                padding: 6px 10px;
                display: none;
                i {
                  color: #999;
                  font-size: 16px;
                  font-weight: bold;
                  &:hover {
                    color: black;
                    cursor: pointer;
                  }
                }
              }
              .song_name {
                width: 174px;

                padding: 6px 10px;
                p {
                  color: #666;
                  text-align: center;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  span {
                    &:hover {
                      text-decoration: underline;
                      cursor: pointer;
                    }
                  }
                }
              }
              &:hover {
                .time_img {
                  display: block;
                }
                .time {
                  display: none;
                }
              }
            }
            li:nth-child(odd) {
              background-color: #f7f7f7;
            }
          }
        }
      }
      .all {
        width: 100%;
        overflow: hidden;
        ul {
          margin-left: -2px;
          margin-top: 20px;
          overflow: hidden;
          li {
            padding: 0 0 30px 7px;
            float: left;
            position: relative;
            .list_img {
              width: 153px;
              height: 130px;
              position: relative;
              img:first-child {
                position: absolute;
                top: 0px;
                z-index: 100;
              }
              img:last-child {
                width: 130px;
                position: absolute;
                top: 0px;
                z-index: 1;
              }
            }
            .play {
              width: 28px;
              height: 28px;
              background-image: url("../../assets/img/d_p_1.png");
              background-repeat: no-repeat;
              background-size: 28px;
              position: absolute;
              top: 97px;
              right: 35px;
              z-index: 10000;
              display: none;
              &:hover {
                background-image: url("../../assets/img/d_p_2.png");
                cursor: pointer;
              }
            }
            p {
              width: 120px;
              margin-top: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
            &:hover {
              .play {
                display: block;
                cursor: pointer;
              }
            }
          }
        }
        .page {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .relevant {
        width: 100%;
        height: 400px;
        ul {
          overflow: hidden;
          margin-left: -32px;
          margin-top: 20px;
          li {
            width: 167px;
            height: 170px;
            float: left;
            position: relative;
            padding: 0 0 30px 33px;
            .mvImg {
              position: relative;
              .bk {
                width: 137px;
                height: 103px;
                background-image: url("../../assets/img/mv_bk.png");
                position: absolute;
                top: 0;
              }
            }
            .playImg {
              width: 44px;
              height: 44px;
              position: absolute;
              top: 34px;
              left: 76px;
              background-image: url("../../assets/img/mv_p_1.png");
              &:hover {
                background-image: url("../../assets/img/mv_p_2.png");
                cursor: pointer;
              }
            }
            p {
              font-size: 14px;
              margin-top: 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .introduce {
        width: 100%;
        .title {
          width: 100%;
          height: 19px;
          margin-top: 10px;
          .identification {
            width: 3px;
            height: 16px;
            background-color: red;
            float: left;
          }
          h2 {
            color: #333;
            font-size: 14px;
            margin-left: 10px;
            line-height: 16px;
          }
        }
        .text {
          margin-top: 10px;
          P {
            line-height: 25px;
            color: #666;
            text-indent: 2em;
          }
        }
        .desc {
          ul {
            li {
              margin-top: 35px;
              h2 {
                color: #333;
                font-size: 14px;
              }
              p {
                line-height: 25px;
                color: #666;
              }
            }
          }
        }
      }
    }
  }
  .right {
    width: 270px;
    float: right;
    .content {
      padding: 20px 40px 40px 30px;
      .title {
        border-bottom: 1px solid #ccc;
        p {
          font-weight: bold;
          margin-bottom: 5px;
        }
      }
      .list {
        ul {
          margin-top: 20px;
          overflow: hidden;
          margin-left: -30px;
          li {
            width: 75px;
            height: 92px;
            float: left;
            padding: 0 0 0 25px;
            p {
              text-align: center;
              margin-top: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
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
/deep/.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid red;
}
/deep/.el-menu--horizontal {
  border-left: solid 1px #e6e6e6;
  border-right: solid 1px #e6e6e6;
}
/deep/.el-menu {
  // background-color: #f8f8f8;
  background-image: url("https://s2.music.126.net/style/web2/img/tab.png?fdde8dd4195d89873a0d20b9af229c48");
  margin-top: -5px;
}
/deep/.el-menu--horizontal > .el-menu-item {
  width: 100px;
  height: 39px;
  line-height: 40px;
  text-align: center;
  user-select: none;
}
/deep/.el-button {
  padding: 8px 20px;
  background-image: url("https://s2.music.126.net/style/web2/img/button2.png?799e16737f2d11a98e1b6c989025dcaa");
  background-size: 9px 10002px;
}
/deep/.el-button--primary {
  border: 1px solid #d3d3d3;
  background-color: transparent;
  color: black;
}
</style>
