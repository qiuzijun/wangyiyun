<template>
  <div class="lyric">
    <div class="left">
      <div class="content_">
        <div class="list">
          <div class="img">
            <img
              :src="songsInformation.songsDetail.Url"
              alt=""
              width="130px"
              height="130px"
            />
            <img src="../assets/img/lyric_bk.png" alt="" />
          </div>
          <div class="text">
            <div class="name">
              <img src="../assets/img/d_q.png" alt="" />
              <span>{{ songsInformation.songsDetail.name }}</span>
            </div>
            <div class="singerName">
              <p>
                歌手：<span
                  v-for="item in songsInformation.songsDetail.singer"
                  :key="item.id"
                  @click="
                    Jump(item.id, item.name, songsInformation.songsDetail.Url)
                  "
                  >{{ item.name }}&nbsp;&nbsp;</span
                >
              </p>
            </div>
            <div class="imgList">
              <div class="b_f">
                <div
                  class="b_f_left"
                  @click="soaringPlay(songsInformation.lyricId)"
                >
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
                <p>转发</p>
              </div>
              <div class="x_z">
                <div class="x_z_bu"></div>
                <p>下载</p>
              </div>
              <div class="xin_x">
                <div class="xin_x_bu"></div>
                <p>(3333)</p>
              </div>
            </div>
            <div class="lyricList">
              <ul ref="lyric_ul" id="lyricList">
                <li
                  v-for="(item, index) in songsInformation.lyric"
                  :key="index"
                >
                  <p>{{ item.name }}</p>
                </li>
              </ul>
              <p @click="open">
                {{ lyricShow == true ? "收起" : "展开"
                }}<span
                  ><i
                    :class="
                      lyricShow == true
                        ? 'el-icon-arrow-up'
                        : 'el-icon-arrow-down'
                    "
                  ></i
                ></span>
              </p>
              <i
                data-clipboard-target="#lyricList"
                class="el-icon-document-copy copy-link"
                title="复制歌词"
                @click="copy"
              ></i>
            </div>
          </div>
        </div>
        <!-- 评论 -->
        <div class="comment">
          <div class="commentName">
            <h3>评论</h3>
            <!-- <p class="ff_p">{{ list.length }}首歌</p> -->
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
      <p>相似歌曲</p>
      <div class="beSimilar">
        <ul>
          <li v-for="item in songsInformation.Simi" :key="item.id">
            <div class="name">
              <p @click="songsInformation.lyricId = item.id">{{ item.name }}</p>
              <p>
                <span
                  v-for="data in item.artists"
                  :key="data.id"
                  @click="Jump(data.id, data.name, data.picUrl)"
                >
                  {{ data.name }}</span
                >/
              </p>
            </div>
            <div class="i">
              <span
                ><i
                  class="el-icon-caret-right"
                  @click="soaringPlay(item.id)"
                ></i
              ></span>
              <span><i class="el-icon-plus"></i></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { lyric, comment, beSimilar, detail } from "@/api/http.js";
import { mapState } from "vuex";
import { Message } from "element-ui";

export default {
  data() {
    return {
      // 歌曲信息
      songsInformation: {
        // 歌词
        lyric: [],
        //相似音乐
        Simi: [],
        // 歌曲id
        lyricId: "",
        // 歌曲信息
        songsDetail: [],
      },
      // 歌词显示隐藏
      lyricShow: false,
      // 评论
      commentList: [],
      // 页码
      pageNo: 1,
      // 评论条数
      pageSize: 20,
      //
      cursor: 0,
    };
  },
  created() {
    if (this.$route.params.id == undefined) {
      this.songsInformation.lyricId = localStorage.getItem("lyricId");
    } else {
      if (localStorage.getItem("lyricId") == this.$route.params.id) {
        this.songsInformation.lyricId = localStorage.getItem("lyricId");
      } else {
        this.songsInformation.lyricId = this.$route.params.id;
      }
    }
  },
  computed: {
    ...mapState(["addId"]),
  },
  watch: {
    addId(newName) {
      if (newName) {
        this.songsInformation.lyricId = newName;
        //   获取歌词
        this.getLyric();
        // 获取评论
        this.getComment();
        // 获取相似音乐
        this.getSimi();
        // 获取歌曲详情
        this.getMusicDetails();
      }
    },
  },
  methods: {
    //   获取歌词
    async getLyric() {
      let res;
      try {
        res = await lyric({
          id: this.songsInformation.lyricId,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      this.songsInformation.lyric = [];
      // 处理歌词
      for (let i = 0; i < res.data.lrc.lyric.split("]").length; i++) {
        if (res.data.lrc.lyric.split("]")[i].split("[")[0] !== "") {
          this.songsInformation.lyric.push({
            time: res.data.lrc.lyric.split("]")[i - 1].split("[")[1],
            name: res.data.lrc.lyric.split("]")[i].split("[")[0],
          });
        }
      }
    },
    // 获取歌单评论
    async getComment() {
      let res;
      try {
        res = await comment({
          id: this.songsInformation.lyricId,
          type: 0,
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
      this.cursor = res.data.data.comments[this.pageSize - 1].time;
    },
    // 获取相似音乐
    async getSimi() {
      let res;
      try {
        res = await beSimilar({
          id: this.songsInformation.lyricId,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      this.songsInformation.Simi = res.data.songs;
    },
    //   获取歌曲详情
    async getMusicDetails() {
      let res;
      try {
        res = await detail({
          ids: this.songsInformation.lyricId,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      res.data.songs.forEach((data) => {
        this.songsInformation.songsDetail.id = data.id;
        this.songsInformation.songsDetail.name = data.name;
        this.songsInformation.songsDetail.Url = data.al.picUrl;
        this.songsInformation.songsDetail.singer = data.ar;
        this.songsInformation.songsDetail.time = data.dt;
        this.songsInformation.songsDetail.analysisTime = this.$moment(
          data.dt
        ).format("mm:ss");
      });
      //   console.log();
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
    // 歌词显示隐藏
    open() {
      this.lyricShow = !this.lyricShow;
      if (this.lyricShow) {
        this.$refs.lyric_ul.style.height = "auto";
      } else {
        this.$refs.lyric_ul.style.height = "250px";
      }
    },
    // 跳转歌手信息页面
    Jump(id, name, src) {
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
    // 播放
    soaringPlay(id) {
      // 传递id值
      this.$store.dispatch("playId", id);
      // console.log(id);
    },
    // 复制歌词
    copy() {
      const clipboard = new this.Clipboard(".copy-link");
      clipboard.on("success", function (e) {
        e.clearSelection();
        Message({
          message: "复制成功",
          type: "success",
        });
      });

      clipboard.on("error", function () {
        Message.error("复制失败");
      });
    },
  },
  mounted() {
    //   获取歌词
    this.getLyric();
    // 获取评论
    this.getComment();
    // 获取相似音乐
    this.getSimi();
    // 获取歌曲详情
    this.getMusicDetails();
  },
};
</script>
<style lang="less" scoped>
.lyric {
  width: 980px;
  background-color: white;
  margin: 0 auto;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  overflow: hidden;
  .left {
    width: 708px;
    background-color: white;
    border-right: 1px solid #d3d3d3;
    padding: 20px 40px 40px 30px;
    float: left;
    > .content_ {
      width: 640px;
      overflow: hidden;
      .list {
        width: 100%;
        overflow: hidden;
        .img {
          width: 205px;
          height: 205px;
          float: left;
          position: relative;
          top: 30px;
          img:last-child {
            position: absolute;
            top: 0px;
          }
          img:first-child {
            position: absolute;
            top: 40px;
            left: 38px;
          }
        }
        .text {
          width: 414px;
          float: right;
          position: relative;
          .name {
            span {
              font-size: 24px;
              color: #333;
              margin-left: 5px;
            }
          }
          .singerName {
            margin-top: 10px;
            color: #ccc;
            span {
              color: #0c73c2;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
          .imgList {
            width: 100%;
            height: 31px;
            margin-top: 5px;
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
              width: 60px;
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
          .lyricList {
            position: relative;
            ul {
              margin-top: 30px;
              height: 250px;
              overflow: hidden;
              li {
                margin-bottom: 10px;
              }
            }
            > p {
              position: absolute;
              bottom: -3px;
              color: #0c73c2;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
            .el-icon-document-copy {
              font-size: 20px;
              position: absolute;
              top: 0;
              right: 0;
              &:hover {
                color: #d3d3d3;
                cursor: pointer;
              }
            }
          }
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
              width: 500px;
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
    padding: 20px 40px 40px 30px;
    > p {
      color: #333;
      font-weight: bold;
      border-bottom: 1px solid #d3d3d3;
      margin-bottom: 5px;
    }
    .beSimilar {
      width: 100%;
      ul {
        width: 100%;
        margin-top: 20px;
        li {
          width: 100%;
          height: 35px;
          margin-top: 10px;
          .name {
            float: left;
            p {
              width: 140px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
            p:last-child {
              color: #ccc;
            }
          }
          .i {
            float: right;
            i {
              font-size: 16px;
              color: #ccc;
              margin-right: 10px;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
