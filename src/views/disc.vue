<template>
  <div class="songListInformation">
    <div class="left">
      <div class="songText" v-if="list.length > 0 ? false : true">
        <div class="top">
          <img :src="list.album.picUrl" alt="" width="200px" height="200px" />
          <div class="bk"></div>
          <div class="g_d_content">
            <div class="name">
              <img src="../assets/img/g_d.png" alt="" />
              <span>{{ list.album.name }}</span>
            </div>
            <div class="establishName">
              <div class="e_name">
                <p class="e_n">
                  歌手:<span
                    v-for="item in list.album.artists"
                    :key="item.id"
                    @click="routeSinger(item.id, item.name, item.picUrl)"
                    >{{ item.name }}/</span
                  >
                </p>
                <p>发行时间:{{ list.album.Time }}</p>
                <p>发行公司:{{ list.album.company }}</p>
              </div>
            </div>
            <div class="imgList">
              <div class="b_f">
                <div class="b_f_left" @click="playList(discId)">
                  <p>播放</p>
                </div>
                <div class="b_f_right"></div>
              </div>
              <div class="s_c">
                <div class="s_c_bu"></div>
                <p>收藏</p>
              </div>
              <div class="z_fa">
                <div class="z_fa_bu"></div>
                <p>({{ dynamic.shareCount }})</p>
              </div>
              <div class="x_z">
                <div class="x_z_bu"></div>
                <p>下载</p>
              </div>
              <div class="xin_x">
                <div class="xin_x_bu"></div>
                <p>({{ dynamic.commentCount }})</p>
              </div>
            </div>
            <div class="introduce" ref="introduce">
              <span>专辑介绍:</span>
              <span class="description">{{ list.album.description }}</span>
            </div>
            <p @click="open">
              {{ discShow == false ? "收起" : "展开"
              }}<i
                :class="
                  discShow == false ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                "
              ></i>
            </p>
          </div>
        </div>
        <div class="list">
          <div class="listName">
            <h3>歌曲列表</h3>
            <p class="ff_p">{{ list.songs.length }}首歌</p>
          </div>
          <div class="listContent">
            <div class="listTitle">
              <ul>
                <li></li>
                <li>
                  <p>歌曲标题</p>
                </li>
                <li>
                  <p>时长</p>
                </li>
                <li>
                  <p>歌手</p>
                </li>
                <li>
                  <p>专辑</p>
                </li>
              </ul>
            </div>
            <div class="musicList">
              <ul>
                <li v-for="(item, index) in list.songs" :key="item.id">
                  <div class="number">
                    <p>
                      <span>{{ index + 1 }}</span>
                    </p>
                  </div>
                  <div class="name_img">
                    <div class="playImg" @click="play(item.id)"></div>
                    <p>
                      <span>{{ item.name }}</span>
                    </p>
                    <div
                      class="mv"
                      v-show="item.mv == 0 ? false : true"
                      @click="routeMv(item.mv)"
                    ></div>
                  </div>
                  <div class="time">
                    <p>{{ item.songTime }}</p>
                  </div>
                  <div class="time_img">
                    <i class="el-icon-plus" title="加入播放列表"></i>
                    <i class="el-icon-folder-add" title="收藏"></i>
                    <i class="el-icon-refresh-right" title="分享"></i>
                    <i class="el-icon-bottom" title="下载"></i>
                  </div>
                  <div class="song_name">
                    <p>
                      <span
                        v-for="data in item.ar"
                        :key="data.id"
                        @click="routeSinger(data.id, data.name, item.al.picUrl)"
                        >{{ data.name }}/</span
                      >
                    </p>
                  </div>
                  <div class="album">
                    <p>{{ item.al.name }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 评论 -->
        <div class="comment">
          <div class="commentName">
            <h3>评论</h3>
            <p>共{{ commentList.totalCount }}条评论</p>
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
                :total="commentList.totalCount"
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
      <p>喜欢这个歌单的人</p>
      <!-- <ul>
        <li v-for="item in list.playlist.subscribers" :key="item.id">
          <img :src="item.avatarUrl" alt="" width="40px" height="40px" />
        </li>
      </ul> -->
    </div>
  </div>
</template>
<script>
import { comment, newDiscInformation, newDiscDynamic } from "@/api/http.js";
export default {
  data() {
    return {
      // 评论
      commentList: [],
      // 页码
      pageNo: 1,
      // 评论条数
      pageSize: 20,
      //
      cursor: 0,
      //  歌单歌曲
      list: [],
      //   歌单id
      songListId: "",
      // 歌词显示隐藏
      discShow: false,
      //   新碟详情
      dynamic: {},
      //  新碟id
      discId: "",
    };
  },
  methods: {
    // 获取歌单评论
    async getComment() {
      let res;
      try {
        res = await comment({
          id: this.discId,
          type: 3,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          cursor: this.cursor,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      // 评论
      this.commentList = res.data.data;
      if (res.data.data.comments[this.pageSize - 1] == undefined) {
        this.cursor = 0;
      } else {
        this.cursor = res.data.data.comments[this.pageSize - 1].time;
      }
    },
    //
    // 获取歌单歌曲
    async getNewDisc() {
      let res;
      try {
        res = await newDiscInformation({
          id: this.discId,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      res.data.album.Time = this.$moment(res.data.album.publishTime).format(
        "YYYY-MM-DD"
      );
      res.data.songs.forEach((data) => {
        data.songTime = this.$moment(data.dt).format("mm:ss");
      });
      this.list = res.data;
      console.log(this.list);
    },
    // 获取新碟详情
    async getDynamic() {
      let res;
      try {
        res = await newDiscDynamic({
          id: this.discId,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      this.dynamic = res.data;
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
    // 播放歌单
    playList(id) {
      this.$store.dispatch("discId", id);
    },
    // 单曲播放
    play(id) {
      this.$store.dispatch("playId", id);
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
    // 介绍显示隐藏
    open() {
      this.discShow = !this.discShow;
      if (this.discShow) {
        this.$refs.introduce.style.height = "200px";
      } else {
        this.$refs.introduce.style.height = "630px";
      }
    },
  },
  created() {
    if (this.$route.params.id == undefined) {
      this.discId = localStorage.getItem("discId");
    } else {
      this.discId = this.$route.params.id;
    }
  },
  beforeMount() {
    // 获取评论
    this.getComment();
    // 获取歌曲
    this.getNewDisc();
    //
    this.getDynamic();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.songListInformation {
  width: 980px;
  background-color: white;
  margin: 0 auto;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  overflow: hidden;
  .left {
    width: 708px;
    border-right: 1px solid #d3d3d3;
    padding: 20px 40px 40px 30px;
    float: left;
    .songText {
      width: 100%;
      position: relative;
      .top {
        width: 100%;
        overflow: hidden;
        > img {
          position: absolute;
          top: 4px;
          left: 4px;
        }
        .bk {
          width: 208px;
          height: 208px;
          float: left;
          background-image: url("../assets/img/g_d_bk.png");
        }
        .g_d_content {
          width: 410px;
          float: right;
          .name {
            width: 100%;
            height: 24px;
            font-size: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            position: relative;
            span {
              margin-left: 5px;
              position: absolute;
              top: -4px;
            }
          }
          .establishName {
            width: 100%;
            height: 35px;
            margin-top: 10px;
            margin-bottom: 10px;
            .e_name {
              span {
                color: #0c73c2;
                &:hover {
                  text-decoration: underline;
                  cursor: pointer;
                }
              }
            }
          }
          .imgList {
            width: 100%;
            height: 31px;
            margin-top: 25px;
            display: flex;
            justify-content: space-between;
            .b_f {
              width: 97px;
              height: 31px;
              .b_f_left {
                width: 66px;
                height: 31px;
                background-image: url("../assets/img/btn_1.png");
                float: left;
                p {
                  color: white;
                  line-height: 31px;
                  margin-left: 35px;
                }
                &:hover {
                  background-image: url("../assets/img/btn_2.png");
                  cursor: pointer;
                }
              }
              .b_f_right {
                width: 31px;
                height: 31px;
                background-image: url("../assets/img/btn_jia_1.png");
                float: right;
                &:hover {
                  background-image: url("../assets/img/btn_jia_2.png");
                  cursor: pointer;
                }
              }
            }
            .s_c {
              width: 70px;
              height: 31px;
              background-image: url("../assets/img/shou_1.png");
              background-repeat: no-repeat;
              &:hover {
                background-image: url("../assets/img/shou_2.png");
                cursor: pointer;
                .s_c_bu {
                  background-image: url("../assets/img/btn_bu_2.png");
                }
              }
              .s_c_bu {
                width: 5px;
                height: 31px;
                background-image: url("../assets/img/btn_bu_1.png");
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
            .z_fa {
              width: 60px;
              height: 31px;
              background-image: url("../assets/img/z_1.png");
              background-repeat: no-repeat;
              &:hover {
                background-image: url("../assets/img/z_2.png");
                cursor: pointer;
                .z_fa_bu {
                  background-image: url("../assets/img/btn_bu_2.png");
                }
              }
              .z_fa_bu {
                width: 5px;
                height: 31px;
                background-image: url("../assets/img/btn_bu_1.png");
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
            .x_z {
              width: 59px;
              height: 31px;
              background-image: url("../assets/img/xia_1.png");
              background-repeat: no-repeat;
              &:hover {
                background-image: url("../assets/img/xia_2.png");
                cursor: pointer;
                .x_z_bu {
                  background-image: url("../assets/img/btn_bu_2.png");
                }
              }
              .x_z_bu {
                width: 5px;
                height: 31px;
                background-image: url("../assets/img/btn_bu_1.png");
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
            .xin_x {
              width: 83px;
              height: 31px;
              background-image: url("../assets/img/x_1.png");
              background-repeat: no-repeat;
              &:hover {
                background-image: url("../assets/img/x_2.png");
                cursor: pointer;
                .xin_x_bu {
                  background-image: url("../assets/img/btn_bu_2.png");
                }
              }
              .xin_x_bu {
                width: 5px;
                height: 31px;
                background-image: url("../assets/img/btn_bu_1.png");
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
          .label {
            width: 100%;
            height: 22px;
            margin-top: 30px;
            position: relative;
            ul {
              position: absolute;
              top: -2px;
              left: 35px;
              li {
                float: left;
                width: 52px;
                height: 22px;
                background-color: #f4f4f4;
                border-radius: 10px;
                margin-right: 10px;
                line-height: 22px;
                text-align: center;
                border: 1px solid #ccc;
                &:hover {
                  background-color: white;
                  cursor: pointer;
                }
              }
            }
          }
          .introduce {
            width: 100%;
            margin-top: 10px;
            overflow: hidden;
            span:first-child {
              font-weight: bold;
            }
            // text-overflow: ellipsis;
            // white-space: nowrap;
            .description {
              height: 200px;
              display: block;
              text-indent: 2em;
            }
            p {
              color: #0c73c2;
            }
          }
          > p {
            margin-top: 15px;
            color: #0c73c2;
            &:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
      .list {
        width: 100%;
        margin-top: 75px;
        .listName {
          width: 100%;
          height: 35px;
          border-bottom: 2px solid #c20c0c;
          h3 {
            font-size: 20px;
            line-height: 35px;
            font-weight: 500;
            float: left;
          }
          .ff_p {
            color: #666;
            margin-left: 22px;
            margin-top: 9px;
            float: left;
          }
          p:last-child {
            color: #666;
            margin-top: 9px;
            float: right;

            span {
              color: #c20c0c;
              font-weight: bold;
            }
          }
        }
        .listContent {
          width: 100%;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          .listTitle {
            width: 100%;
            height: 35px;
            background-image: url("../assets/img/list_bk.png");
            ul {
              li {
                float: left;
              }
              li:first-child {
                width: 77px;
                height: 35px;
                border-right: 1px solid #ccc;
              }
              li:last-child {
                width: 127px;
                height: 35px;
                p {
                  padding: 8px 10px;
                }
              }
              li:nth-child(2) {
                width: 230px;
                height: 35px;
                border-right: 1px solid #ccc;
                p {
                  padding: 8px 10px;
                }
              }
              li:nth-child(4) {
                width: 89px;
                height: 35px;
                border-right: 1px solid #ccc;
                p {
                  padding: 8px 10px;
                }
              }
              li:nth-child(3) {
                width: 111px;
                height: 35px;
                border-right: 1px solid #ccc;
                p {
                  padding: 8px 10px;
                }
              }
            }
          }
          .musicList {
            width: 100%;
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
                    // line-height: 65px;
                    text-align: center;
                  }
                }
                .name_img {
                  width: 220px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  img {
                    margin-right: 10px;
                    cursor: pointer;
                  }
                  .playImg {
                    width: 30px;
                    height: 20px;
                    background-image: url("../assets/img/soPlay_01.png");
                    background-size: 17px;
                    margin-top: 3px;
                    margin-right: 10px;
                    background-repeat: no-repeat;
                    &:hover {
                      background-image: url("../assets/img/soPlay_02.png");
                      cursor: pointer;
                    }
                  }
                  p {
                    width: 276px;
                    margin-right: -7px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    span:first-child {
                      &:hover {
                        text-decoration: underline;
                        cursor: pointer;
                      }
                    }
                    span:last-child {
                      color: black;
                    }
                  }
                  .mv {
                    width: 35px;
                    height: 17px;
                    background-image: url("../assets/img/mv_1.png");
                    background-repeat: no-repeat;
                    &:hover {
                      background-image: url("../assets/img/mv_2.png");
                      cursor: pointer;
                    }
                  }
                }
                .time {
                  width: 110px;
                  padding: 6px 10px;
                  display: block;
                  p {
                    color: #666;
                    // line-height: 65px;
                    text-align: center;
                  }
                }
                .time_img {
                  width: 110px;
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
                  width: 89px;
                  padding: 6px 10px;
                  p {
                    color: #666;
                    // line-height: 65px;
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
                .album {
                  width: 127px;
                  height: 30px;
                  padding: 6px 10px;
                  p {
                    text-align: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &:hover {
                      text-decoration: underline;
                      cursor: pointer;
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
              li:last-child {
                border-bottom: 1px solid #ccc;
              }
              li:nth-child(odd) {
                background-color: #f7f7f7;
              }
            }
          }
        }
      }
      .comment {
        width: 100%;
        margin-top: 100px;
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
              width: 565px;
              border: 1px solid #ccc;
              float: right;
              position: relative;
              .text_cont {
                width: 100%;
                resize: none;
                outline: none;
                padding: 5px 6px 6px;
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
            width: 500px;
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
                  width: 565px;
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
    padding: 20px 40px 40px 30px;
    float: right;
    > p {
      font-weight: bold;
      border-bottom: 1px solid #d3d3d3;
    }
    ul {
      margin-left: -10px;
      margin-top: 20px;
      li {
        padding: 0 0 15px 10px;
        float: left;
      }
    }
  }
}
</style>
