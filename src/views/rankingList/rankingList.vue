<template>
  <div class="rankingList">
    <div class="left">
      <!-- 云音乐特色榜 -->
      <div class="feature">
        <h2>云音乐特色榜</h2>
        <ul>
          <li
            v-for="item in topList.slice(0, 4)"
            :key="item.id"
            @click="featureList(item.id)"
          >
            <img :src="item.coverImgUrl" alt="" width="40px" height="40px" />
            <div class="name">
              <p>{{ item.name }}</p>
              <p>{{ item.updateFrequency }}</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 全球媒体榜 -->
      <div class="Media">
        <h2>全球媒体榜</h2>
        <ul>
          <li
            v-for="item in topList.slice(4, topList.length - 4)"
            :key="item.id"
            @click="mediaList(item.id)"
          >
            <img :src="item.coverImgUrl" alt="" width="40px" height="40px" />
            <div class="name">
              <p>{{ item.name }}</p>
              <p>{{ item.updateFrequency }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <!-- 榜单图、名 -->
      <div class="topName">
        <div class="img">
          <img
            :src="playlist.coverImgUrl"
            alt=""
            width="150px"
            height="150px"
          />
          <span class="msk"></span>
        </div>
        <div class="rightName">
          <p>{{ playlist.name }}</p>
          <div class="lately">
            <img src="../../assets/img/timeImg.png" alt="" />
            <span>最近更新：{{ playlist.time }}</span>
            <span>（{{ playlist.description }}）</span>
          </div>
          <div class="imgList">
            <div class="b_f">
              <div class="b_f_left" @click="listPlay(playlist.id)">
                <p>播放</p>
              </div>
              <div class="b_f_right"></div>
            </div>
            <div class="s_c">
              <div class="s_c_bu"></div>
              <p>({{ details.bookedCount }})</p>
            </div>
            <div class="z_fa">
              <div class="z_fa_bu"></div>
              <p>({{ details.shareCount }})</p>
            </div>
            <div class="x_z">
              <div class="x_z_bu"></div>
              <p>下载</p>
            </div>
            <div class="xin_x">
              <div class="xin_x_bu"></div>
              <p>({{ details.commentCount }})</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 榜单歌曲列表 -->
      <div class="list">
        <div class="listName">
          <h3>歌曲列表</h3>
          <p class="ff_p">{{ list.length }}首歌</p>
          <p>
            播放：<span>{{ details.playCount }}</span
            >次
          </p>
        </div>
        <div class="listContent">
          <div class="listTitle">
            <ul>
              <li></li>
              <li>
                <p>标题</p>
              </li>
              <li>
                <p>时长</p>
              </li>
              <li>
                <p>歌手</p>
              </li>
            </ul>
          </div>
          <div class="musicList">
            <ul>
              <li
                v-for="(item, index) in list"
                :key="item.id"
                :style="{
                  height: index < 3 ? '70px' : '30px',
                  lineHeight: index < 3 ? '70px' : '20px',
                }"
              >
                <div class="number">
                  <p>
                    <span>{{ index + 1 }}</span>
                  </p>
                </div>
                <div class="name_img">
                  <img
                    :src="item.al.picUrl"
                    alt=""
                    width="50px"
                    height="50px"
                    v-show="index < 3 ? true : false"
                  />
                  <div class="playImg" @click="play(item.id)"></div>
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
                    <span
                      v-for="(data, index) in item.ar"
                      :key="data.id + index"
                      @click="routeSinger(data.id, data.name, item.al.picUrl)"
                      >{{ data.name }}/</span
                    >
                  </p>
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
            <img src="../../assets/img/x_l.png" alt="" class="x_l" />
            <img src="../../assets/img/@.png" alt="" class="ai_t" />
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
                      <img src="../../assets/img/s_k_No.png" alt="" />
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
</template>
<script>
import { topList, soaringList, dynamic, comment } from "@/api/http.js";
export default {
  data() {
    return {
      // 所有榜单
      topList: [],
      // 榜单歌曲
      list: [],
      // 榜单信息
      playlist: [],
      // 榜单Id
      listId: 19723756, //榜单默认值
      // 歌单详情动态部分,如评论数,是否收藏,播放数
      details: {},
      // 歌单评论
      commentList: [],
      // 页码
      pageNo: 1,
      // 评论条数
      pageSize: 20,
      //
      cursor: 0,
    };
  },
  methods: {
    // 获取所有榜单
    async getTopList() {
      let res;
      try {
        res = await topList({});
      } catch (error) {
        console.log(error);
        return;
      }
      // 所有榜单

      this.topList = res.data.list;
    },
    // 获取所有歌曲
    async getMusic() {
      let res;
      try {
        res = await soaringList({
          id: this.listId,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      // console.log(res);
      this.playlist = res.data.playlist;
      // 修改更新日期格式
      this.playlist.time = this.$moment(res.data.playlist.updateTime).format(
        "MM月DD日"
      );
      // console.log(this.playlist);
      // 所有榜单歌曲
      res.data.playlist.tracks.forEach((data) => {
        // 歌曲时间
        data.time = this.$moment(data.dt).format("mm:ss");
      });
      this.list = res.data.playlist.tracks;
    },
    //获取歌单详情动态部分,如评论数,是否收藏,播放数
    async getDynamic() {
      let res;
      try {
        res = await dynamic({
          id: this.listId,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      // console.log(res);
      this.details = res.data;
    },
    // 获取歌单评论
    async getComment() {
      let res;
      try {
        res = await comment({
          id: this.listId,
          type: 2,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          cursor: this.cursor,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      // console.log(res);
      // 评论
      this.commentList = res.data.data;
      this.cursor = res.data.data.comments[this.pageSize - 1].time;
    },
    // 切换云音乐特色榜
    featureList(id) {
      this.listId = id;
      // 获取所有歌曲
      this.getMusic();
      //获取歌单详情动态部分,如评论数,是否收藏,播放数
      this.getDynamic();
      // 获取歌单评论
      this.getComment();
    },
    // 切换全球媒体榜
    mediaList(id) {
      this.listId = id;
      // 获取所有歌曲
      this.getMusic();
      //获取歌单详情动态部分,如评论数,是否收藏,播放数
      this.getDynamic();
      // 获取歌单评论
      this.getComment();
    },
    // 播放
    play(id) {
      // console.log(id);
      // 传递id
      this.$store.dispatch("playId", id);
    },
    // 榜单播放
    listPlay(id) {
      // 传递id
      this.$store.dispatch("listId", id);
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
  },
  mounted() {
    // 获取所有榜单
    this.getTopList();
    // 获取所有歌曲
    this.getMusic();
    //获取歌单详情动态部分,如评论数,是否收藏,播放数
    this.getDynamic();
    // 获取歌单评论
    this.getComment();
    // console.log(this.$route.params.id);
    if (this.$route.params.id !== undefined) {
      this.listId = this.$route.params.id;
    }
  },
};
</script>
<style lang="less" scoped>
.rankingList {
  width: 982px;
  overflow: hidden;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  margin: 0 auto;
  .left {
    width: 240px;
    float: left;
    .Media {
      width: 242px;
      height: auto;
      > h2 {
        font-size: 14px;
        color: #000;
        font-family: simsun, \5b8b\4f53;
        position: relative;
        top: 40px;
        left: 20px;
      }
      ul {
        margin-top: 50px;
        li {
          width: 240px;
          height: 62px;
          padding: 10px 0 10px 20px;
          .name {
            width: 170px;
            height: 40px;
            color: #000;
            float: right;
            p:last-child {
              line-height: 35px;
              color: #999;
            }
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
            cursor: pointer;
          }
        }
      }
    }
    .feature {
      width: 242px;
      height: auto;
      > h2 {
        font-size: 14px;
        color: #000;
        font-family: simsun, \5b8b\4f53;
        position: relative;
        top: 40px;
        left: 20px;
      }
      ul {
        margin-top: 50px;
        li {
          width: 240px;
          height: 62px;
          padding: 10px 0 10px 20px;
          .name {
            width: 170px;
            height: 40px;
            color: #000;
            float: right;
            p:last-child {
              line-height: 35px;
              color: #999;
            }
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
            cursor: pointer;
          }
        }
      }
    }
  }
  .right {
    width: 740px;
    background-color: white;
    border-left: 1px solid #d3d3d3;
    float: right;
    .topName {
      width: 100%;
      height: 238px;
      padding: 40px;

      .img {
        width: 150px;
        height: 150px;
        position: relative;
        float: left;
        .msk {
          width: 150px;
          height: 150px;
          background-image: url("../../assets/img/topList.png");
          background-repeat: no-repeat;
          background-size: 150px;
          position: absolute;
          left: 0px;
        }
      }
      .rightName {
        width: 475px;
        height: 100%;
        float: right;
        > p {
          line-height: 60px;
          font-size: 20px;
          font-weight: normal;
        }
        .lately {
          width: 100%;
          img {
            margin-bottom: -1px;
            margin-right: 10px;
          }
          span:last-child {
            color: #999;
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
          .z_fa {
            width: 77px;
            height: 31px;
            background-image: url("../../assets/img/z_1.png");
            background-repeat: no-repeat;
            &:hover {
              background-image: url("../../assets/img/z_2.png");
              cursor: pointer;
              .z_fa_bu {
                background-image: url("../../assets/img/btn_bu_2.png");
              }
            }
            .z_fa_bu {
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
          .x_z {
            width: 59px;
            height: 31px;
            background-image: url("../../assets/img/xia_1.png");
            background-repeat: no-repeat;
            &:hover {
              background-image: url("../../assets/img/xia_2.png");
              cursor: pointer;
              .x_z_bu {
                background-image: url("../../assets/img/btn_bu_2.png");
              }
            }
            .x_z_bu {
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
          .xin_x {
            width: 83px;
            height: 31px;
            background-image: url("../../assets/img/x_1.png");
            background-repeat: no-repeat;
            &:hover {
              background-image: url("../../assets/img/x_2.png");
              cursor: pointer;
              .xin_x_bu {
                background-image: url("../../assets/img/btn_bu_2.png");
              }
            }
            .xin_x_bu {
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
      }
    }
    .list {
      width: 100%;
      // padding: 40px;
      padding-left: 40px;
      padding-right: 40px;
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
          background-image: url("../../assets/img/list_bk.png");
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
              width: 174px;
              height: 35px;
              p {
                padding: 8px 10px;
              }
            }
            li:nth-child(2) {
              width: 315px;
              height: 35px;
              border-right: 1px solid #ccc;
              p {
                padding: 8px 10px;
              }
            }
            li:nth-child(3) {
              width: 91px;
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
              height: 70px;
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
                width: 315px;
                padding: 6px 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                img {
                  margin-right: 10px;
                  cursor: pointer;
                }
                .playImg {
                  width: 24px;
                  height: 20px;
                  background-image: url("../../assets/img/soPlay_01.png");
                  background-size: 17px;
                  margin-top: 3px;
                  margin-right: 10px;
                  background-repeat: no-repeat;
                  &:hover {
                    background-image: url("../../assets/img/soPlay_02.png");
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
                    color: #aeaeae;
                  }
                }
                .mv {
                  width: 35px;
                  height: 17px;
                  background-image: url("../../assets/img/mv_1.png");
                  background-repeat: no-repeat;
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
                  // line-height: 65px;
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
            width: 595px;
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
          width: 608px;
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
            background-image: url("../../assets/img/comment_1.png");

            margin-top: 10px;
            margin-left: 10px;
            float: right;
            &:hover {
              cursor: pointer;
              background-image: url("../../assets/img/comment_2.png");
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
                width: 600px;
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
          position: relative;
          .p_con {
            position: absolute;
            left: 97px;
            top: -37px;
          }
        }
      }
    }
  }
}
</style>
