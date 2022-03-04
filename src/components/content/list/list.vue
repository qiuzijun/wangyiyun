<template>
  <div>
    <div class="text">
      <router-link to="">
        <p>榜单</p>
      </router-link>
      <!-- 更多 -->
      <div class="more">
        <router-link :to="{ name: 'rankingList' }">
          <p>更多</p>
        </router-link>
        <img src="@/assets/img/redjian.png" alt="" width="14px" height="14px" />
      </div>
    </div>
    <div class="content">
      <div class="list">
        <div class="bList" v-for="(list, index) in listId" :key="list.id">
          <div class="n">
            <div
              class="soaringList"
              v-if="soaringImg.length > 0 ? true : false"
            >
              <div class="name">
                <p :title="soaringImg[index].name">
                  {{ soaringImg[index].name }}
                </p>
                <img
                  :src="number == index ? imgList[0].twoImg : imgList[0].oneImg"
                  alt=""
                  @mouseover="playOver(index)"
                  @mouseout="playOut"
                  @click="passId(soaringImg[index].id)"
                  title="播放"
                />
                <img
                  :src="num == index ? imgList[2].twoImg : imgList[2].oneImg"
                  alt=""
                  @mouseover="songOver(index)"
                  @mouseout="songOut"
                  title="收藏"
                />
              </div>
              <img
                :src="soaringImg[index].coverImgUrl"
                alt=""
                width="80px"
                height="80px"
                v-if="soaringImg.length > 0 ? true : false"
              />
              <img
                src="../../../assets/img/icon-coverall.png"
                alt=""
                width="80px"
                height="80px"
                :title="soaringImg[index].name"
              />
            </div>

            <ul>
              <li
                v-for="item in list"
                :key="item.Id"
                :title="item.Id + 1 == 11 ? '查看更多' : item.name"
              >
                <span>{{ item.Id + 1 == 11 ? "" : item.Id + 1 }}</span>
                <a @click="soaringRoute(soaringImg[index].id, item.Id)">{{
                  item.Id + 1 == 11 ? "查看更多&gt;" : item.name
                }}</a>
                <div class="img" v-if="item.Id + 1 == 11 ? false : true">
                  <img
                    :src="imgNumber == index ? data.twoImg : data.oneImg"
                    alt=""
                    v-for="(data, Index) in imgList"
                    :key="Index"
                    @mouseover="imgOver(Index)"
                    @click="soaringPlay(item.id)"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { soaring } from "@/api/http.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      number: -1,
      num: -1,
      number_02: -1,
      num_02: -1,
      number_03: -1,
      num_03: -1,
      imgNumber: -1,
      img_01: require("../../../assets/img/soPlay_01.png"),
      img_02: require("../../../assets/img/list_01.png"),
      // 播放图标以及歌单
      imgList: [
        {
          oneImg: require("../../../assets/img/soPlay_01.png"),
          twoImg: require("../../../assets/img/soPlay_02.png"),
        },
        {
          oneImg: require("../../../assets/img/jia_01.png"),
          twoImg: require("../../../assets/img/jia_02.png"),
        },
        {
          oneImg: require("../../../assets/img/list_01.png"),
          twoImg: require("../../../assets/img/list_02.png"),
        },
      ],
      // 飙升榜
      soaringList: [],
      // 新歌
      newSongList: [],
      // 原创
      originalList: [],
      // 榜图
      soaringImg: [],
      // 榜单id
      listId: [],
      // 判断播放歌单列表是否为空
      listIsUndefined: true,
    };
  },
  computed: {
    ...mapState(["songSheetList"]),
  },
  watch: {
    songSheetList: {
      handler(newName) {
        if (newName.length == 0) {
          this.listIsUndefined = true;
        } else {
          this.listIsUndefined = false;
        }
      },
    },
  },
  methods: {
    // 移入播放键
    playOver(index) {
      this.number = index;
    },
    // 移出播放键
    playOut() {
      this.number = -1;
    },
    // 移入收藏键
    songOver(index) {
      this.num = index;
    },
    // 移出收藏键
    songOut() {
      this.num = -1;
    },

    // 列表图标 播放、收藏、转发
    imgOver(index) {
      // console.log(index);
      this.imgNumber = index;
    },
    // 榜单播放
    soaringPlay(id) {
      // 传递id值
      this.$store.dispatch("playId", id);
    },
    // 传递榜单id
    passId(id) {
      // console.log(id);
      this.$store.dispatch("listId", id);
    },
    // 获取榜单信息
    async getListInformation() {
      let res;
      try {
        res = await soaring({});
      } catch (error) {
        console.log(error);
        return;
      }
      // 获取前三榜单
      for (let i = 0; i < 3; i++) {
        this.soaringImg.push(res.data.list[i]);
      }
    },
    // 获取飙升榜
    async getSoaring() {
      let res = await axios.get("/api/playlist/detail?id=19723756");
      // 获取前10歌曲
      this.soaringList = res.data.playlist.tracks.slice(0, 11);
      this.soaringList.forEach((data, index) => {
        data.Id = index;
      });
      this.listId.push(this.soaringList);
      this.getNewSong();
    },
    // 获取新歌
    async getNewSong() {
      let res = await axios.get("/api/playlist/detail?id=3779629");
      // 获取前10歌曲
      this.newSongList = res.data.playlist.tracks.slice(0, 11);
      this.newSongList.forEach((data, index) => {
        data.Id = index;
      });
      this.listId.push(this.newSongList);
      this.getOriginal();
    },
    // 获取原创
    async getOriginal() {
      let res = await axios.get("/api/playlist/detail?id=2884035");
      // 获取前10歌曲
      this.originalList = res.data.playlist.tracks.slice(0, 11);
      this.originalList.forEach((data, index) => {
        data.Id = index;
      });
      this.listId.push(this.originalList);
    },
    // 跳转到排行榜
    soaringRoute(id, i) {
      if (i + 1 == 11) {
        this.$store.dispatch("rankingId", id);
        this.$router.push({
          name: "rankingList",
          params: { id },
        });
      }
    },
  },
  mounted() {
    this.getListInformation(), this.getSoaring();
  },
};
</script>
<style lang="less" scoped>
.text {
  width: 100%;
  height: 35px;
  border-bottom: 2px solid #c10d0c;
  padding: 0 10px 0 34px;
  background-image: url("../../../assets/img/yuan.png");
  background-repeat: no-repeat;
  background-position: 10px;
  display: flex;
  justify-content: space-between;
  > a {
    color: #333;
    p {
      font-size: 20px;
      font-weight: normal;
      line-height: 35px;
    }
  }
  .more {
    line-height: 35px;
    display: flex;
    justify-content: space-between;
    a {
      color: #333;
      &:hover {
        text-decoration: underline;
      }
    }
    > img {
      margin-top: 10px;
      margin-left: 5px;
    }
  }
}
.content {
  width: 692px;
  height: 472px;
  border: 1px solid #d3d3d3;
  margin: 20px 0 37px;
  .list {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    // border: 1px solid #fff;
    display: flex;
    justify-content: space-between;
    .bList {
      width: 230px;
      height: 100%;
    }

    .bList {
      .n {
        width: 100%;
        height: 100%;
        border-right: 1px solid #fff;
        .soaringList {
          width: 230px;
          height: 120px;
          padding: 20px 0 0 19px;
          position: relative;
          > img:last-child {
            position: absolute;
            left: 19px;
            &:hover {
              cursor: pointer;
            }
          }
          .name {
            width: 116px;
            height: 51px;
            position: absolute;
            right: 0px;
            font-size: 14px;
            font-weight: bold;
            p {
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
            > img {
              margin-top: 10px;
              margin-right: 10px;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        ul > li {
          width: 100%;
          height: 32px;
          font-size: 12px;
          line-height: 32px;
          padding-left: 30px;

          span:first-child {
            font-size: 16px;
            float: left;
          }
          a {
            width: 170px;
            height: 32px;
            color: black;
            display: block;
            float: left;
            margin-left: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover {
              cursor: pointer;

              text-decoration: underline;
            }
          }

          .img {
            width: 70px;
            height: 17px;
            float: right;
            display: none;
            margin-top: 5px;
            img {
              width: 17px;
              height: 17px;
              margin: 0px 5px 0 0;
              &:hover {
                cursor: pointer;
              }
            }
          }
          &:hover {
            a {
              width: 96px;
            }
            .img {
              display: block;
            }
          }
        }
        > ul > li:nth-child(odd) {
          background-color: #e8e8e8;
        }
        > ul > li:nth-child(1) {
          span {
            color: red;
          }
        }
        > ul > li:nth-child(2) {
          span {
            color: red;
          }
        }
        > ul > li:nth-child(3) {
          span {
            color: red;
          }
        }
        > ul > li:nth-child(10) {
          span {
            margin-left: -8px;
          }
        }
        > ul > li:last-child {
          a {
            width: 96px;
            float: right;
          }
        }
      }
    }
  }
}
</style>
