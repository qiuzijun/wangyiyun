<template>
  <div class="user" v-if="userShow">
    <div class="userText">
      <div class="userImg">
        <img :src="profile.avatarUrl" alt="" />
      </div>
      <div class="text">
        <div class="t">
          <span class="name">{{ profile.nickname }}</span>
          <div class="lev">
            <i class="el-icon-medal"></i>
            <span>{{ level }}</span>
          </div>
          <span class="male">
            <i
              :class="profile.gender == 1 ? 'el-icon-male' : 'el-icon-female'"
            ></i>
          </span>
          <span class="edit">
            <el-button type="small" icon="el-icon-edit">
              编辑个人信息
            </el-button>
          </span>
        </div>
        <div class="b">
          <ul>
            <li>
              <p>0</p>
              <p>动态</p>
            </li>
            <li>
              <p>0</p>
              <p>关注</p>
            </li>
            <li>
              <p>0</p>
              <p>粉丝</p>
            </li>
          </ul>
          <p>
            个人介绍：<span>{{ profile.signature }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="musicList">
      <h3>最近播放</h3>
      <div class="r">
        <el-dropdown @command="handleCommand">
          <el-button type="small">
            最近播放数量<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="10">10</el-dropdown-item>
            <el-dropdown-item command="20">20</el-dropdown-item>
            <el-dropdown-item command="30">30</el-dropdown-item>
            <el-dropdown-item command="50">50</el-dropdown-item>
            <el-dropdown-item command="100">100</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <ul>
        <li v-for="(item, index) in list" :key="item.data.id">
          <div class="number">
            <p>
              <span>{{ index + 1 }}</span>
            </p>
          </div>
          <div class="name_img">
            <div class="playImg" @click="play(item.data.id)"></div>
            <p>
              <span>{{ item.data.name }}</span>
            </p>
            <div
              class="mv"
              v-show="item.data.mv == 0 ? false : true"
              @click="routeMv(item.data.mv)"
            ></div>
          </div>
          <div class="time">
            <p>{{ item.data.songTime }}</p>
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
                v-for="data in item.data.ar"
                :key="data.name"
                @click="routeSinger(data.id, data.name, item.al.picUrl)"
                >{{ data.name }}/</span
              >
            </p>
          </div>
          <div class="album">
            <p @click="routeDisc(item.data.al.id)">{{ item.data.al.name }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="list">
      <ul>
        <li v-for="item in userList" :key="item.id + item.name">
          <div class="musicImg">
            <img
              src="../assets/img/icon-coverall.png"
              alt=""
              @click="routeSongList(item.id)"
            />

            <img
              v-lazy="item.coverImgUrl"
              alt=""
              width="140px"
              height="140px"
            />
          </div>
          <div class="heat">
            <img
              src="../assets/img/icon-erji.png"
              alt=""
              width="14px"
              height="11px"
            />
            <p>{{ item.playCount }}</p>
            <img
              @mouseover="playOver(item.id)"
              @mouseout="playOut"
              @click="playClick(item.id)"
              :src="number == item.id ? item.playW : item.playM"
              alt=""
              width="16px"
              height="17px"
            />
          </div>
          <router-link to="" :title="item.name" class="name">
            <p>{{ item.name }}</p>
          </router-link>
          <p>
            <span>dy</span>
            <span>{{ item.creator.nickname }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { userPlaylist, userRecord, getAccount, userLevel } from "@/api/http";
export default {
  data() {
    return {
      list: [],
      limit: 10,
      userId: null,
      userList: [],
      number: -1, //播放按钮图的切换
      userShow: false,
    };
  },
  created() {
    if (localStorage.getItem("userInfo") == null) {
      this.$alert("返回上级，进行登录", "未登录", {
        confirmButtonText: "确定",
        callback: () => {
          this.$router.back(-1);
        },
      });
      console.log(111);
    } else {
      if (this.$route.params.id == undefined) {
        this.userId = localStorage.getItem("userId");
      } else {
        this.userId = this.$route.params.id;
      }
    }
  },
  methods: {
    // 用户歌单
    async userPlaylist() {
      let res;
      try {
        res = await userPlaylist({
          uid: this.userId,
        });
      } catch (error) {
        console.log(error);
        return;
      }

      res.data.playlist.forEach((data) => {
        //   添加播放按钮图片字段
        data.playM = require("../assets/img/icon-play-m.png");
        data.playW = require("../assets/img/icon-play-w.png");
        // 播放次数
        data.playCount =
          data.playCount > 1000
            ? (data.playCount / 1000).toFixed(0)
            : data.playCount;
      });
      this.userList = res.data.playlist;
    },
    // 最近播放
    async userRecord() {
      let res;
      try {
        res = await userRecord({
          limit: this.limit,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      this.list = res.data.data.list;
      //   console.log(this.list);
    },
    // 获取用户信息
    async userAccount() {
      let res;
      try {
        res = await getAccount({});
      } catch (error) {
        console.log(error);
        return;
      }
      this.profile = res.data.profile;
      this.userShow = true;
    },
    // 获取用户等级
    async getUserLevel() {
      let res;
      try {
        res = await userLevel({});
      } catch (error) {
        console.log(error);
        return;
      }
      this.level = res.data.data.level;
    },
    handleCommand(command) {
      this.$message("切换" + command + "条播放记录");
      this.limit = command;
      this.userRecord();
    },
    //   移入播放按钮
    playOver(i) {
      this.number = i;
    },
    // 离开播放按钮
    playOut() {
      this.number = -1;
    },
    // 点击播放键传递id
    playClick(id) {
      this.$store.dispatch("listId", id);
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
    // 跳转歌单信息
    routeSongList(id) {
      this.$router.push({
        name: "songListInformation",
        params: { id },
      });
      localStorage.setItem("songListId", id);
    },
  },
  mounted() {
    if (localStorage.getItem("userInfo") !== null) {
      this.userAccount();
      this.getUserLevel();
      this.userRecord();
      this.userPlaylist();
    }
  },
};
</script>
<style lang="less" scoped>
.user {
  width: 980px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background-color: white;
  margin: 0 auto;
  padding: 40px;
  .userText {
    width: 100%;
    height: 188px;

    .userImg {
      width: 188px;
      height: 188px;
      background-color: black;
      float: left;
      img {
        width: 188px;
        height: 188px;
      }
    }
    .text {
      width: 700px;
      height: 100%;
      float: right;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .t {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ccc;
        .name {
          float: left;
          margin-top: 3px;
          font-size: 22px;
          font-weight: normal;
          line-height: 30px;
          margin-right: 10px;
        }
        .lev {
          color: #c20c0c;
          float: left;
          position: relative;
          margin-right: 10px;
          span {
            font-weight: bold;
            position: absolute;
            top: 10px;
            right: 12px;
          }
          /deep/.el-icon-medal {
            font-size: 30px;
          }
        }
        .male {
          float: left;
          font-size: 22px;
          color: skyblue;
        }
        .edit {
          float: right;
        }
      }
      .b {
        width: 100%;
        height: 130px;
        ul {
          margin-bottom: 10px;
          overflow: hidden;
          li {
            padding: 0 40px 0 20px;
            float: left;
            border-right: 1px solid #ccc;
            p:first-child {
              font-size: 24px;
              font-weight: normal;
              color: #666;
            }
            p:last-child {
              font-weight: normal;
              color: #666;
            }
          }
          li:first-child {
            padding: 0 40px 0 0;
            float: left;
          }
          li:last-child {
            border-right: none;
          }
        }
      }
    }
  }
  .musicList {
    width: 100%;
    position: relative;
    h3 {
      margin-top: 20px;
    }
    .r {
      position: absolute;
      right: 0;
      top: -15px;
    }
    ul {
      border-top: 2px solid #c20c0c;
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
  .list {
    width: 100%;
    margin-top: 40px;
    ul {
      // height: 468px;

      overflow: hidden;
      margin-top: 20px;
      margin-left: -50px;
      li {
        width: 190px;
        height: 228px;
        font-size: 14px;
        padding: 0 0 30px 50px;

        float: left;
        position: relative;
        .musicImg {
          width: 140px;
          > img:first-child {
            position: absolute;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .heat {
          width: 140px;
          height: 27px;
          font-size: 12px;
          color: #ccc;
          background-image: url("../assets/img/yingying.png");
          background-repeat: no-repeat;
          position: absolute;
          top: 113px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img:first-child {
            margin-left: 10px;
          }
          > p {
            margin-left: -30px;
          }
          img:last-child {
            margin-right: 10px;
            &:hover {
              cursor: pointer;
            }
          }
        }
        > p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          span:first-child {
            font-size: 10px;
            color: #999;
            margin-right: 5px;
          }
          span:last-child {
            color: #666;
            &:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
        .name {
          color: black;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .page {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
