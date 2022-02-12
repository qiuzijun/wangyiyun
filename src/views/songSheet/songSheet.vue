<template>
  <div class="songSheet">
    <div class="content">
      <!-- 全部、选择分类、热门 -->
      <div class="classification">
        <p>{{ cat }}</p>
        <div class="sel_class" @click="dropdownShow = !dropdownShow">
          <p>选择分类</p>
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="hot">
          <p>热门</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <li v-for="item in dataList.playlists" :key="item.id + item.name">
            <div class="musicImg">
              <img
                src="../../assets/img/icon-coverall.png"
                alt=""
                @click="routeSongList(item.id)"
              />

              <img
                :src="item.coverImgUrl"
                alt=""
                width="140px"
                height="140px"
              />
            </div>
            <div class="heat">
              <img
                src="../../assets/img/icon-erji.png"
                alt=""
                width="14px"
                height="11px"
              />
              <p>{{ item.playCount }}万</p>
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
        <!-- 分页 -->
        <div class="page">
          <Page
            :total="dataList.total"
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

    <!-- 分类下拉框 -->
    <div class="dropdown" v-show="dropdownShow">
      <div class="drop_top">
        <div class="whole">
          <p @click="allList">全部风格</p>
        </div>
        <div class="drop_list">
          <ul>
            <li v-for="item in catList" :key="item.id">
              <div class="icon">
                <i :class="item.class"></i>
                <p>{{ item.name }}</p>
              </div>
              <div class="list_name">
                <ul>
                  <li v-for="(data, index) in item.list" :key="index">
                    <span @click="dropIndex(data.name)"> {{ data.name }}</span
                    >&nbsp;&nbsp;&nbsp;&nbsp;<span>|</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="s_j"></div>
    </div>
  </div>
</template>
<script>
import { catlist, playList } from "@/api/http.js";
export default {
  data() {
    return {
      // 分类下拉框显示隐藏
      dropdownShow: false,
      // 歌单分类
      catList: [
        { id: 0, name: "语种", list: [], class: "el-icon-basketball" },
        { id: 1, name: "风格", list: [], class: "el-icon-s-opportunity" },
        { id: 2, name: "场景", list: [], class: "el-icon-coffee-cup" },
        { id: 3, name: "感情", list: [], class: "el-icon-sunny" },
        { id: 4, name: "主题", list: [], class: "el-icon-headset" },
      ],
      // 歌单种类
      cat: "全部",
      // 页码
      pageIndex: 1,
      // 页数据条数
      pageSize: 50,
      // 歌单列表
      dataList: [],
      number: -1, //播放按钮图的切换
    };
  },
  methods: {
    // 获取歌单分类
    async getCatList() {
      let res;
      try {
        res = await catlist({});
      } catch (error) {
        console.log(error);
        return;
      }
      // console.log(res.data.sub);
      // 数据分类
      res.data.sub.forEach((data) => {
        switch (data.category) {
          case 0:
            this.catList[0].list.push(data);
            break;
          case 1:
            this.catList[1].list.push(data);
            break;
          case 2:
            this.catList[2].list.push(data);
            break;
          case 3:
            this.catList[3].list.push(data);
            break;
          case 4:
            this.catList[4].list.push(data);
            break;

          default:
            break;
        }
      });
    },
    // 获取歌单
    async getPlaylist() {
      let res;
      try {
        res = await playList({
          order: "hot",
          cat: this.cat,
          limit: this.pageSize,
          offset: this.pageIndex,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      let map = new Map();
      let dataList = [];
      res.data.playlists.forEach((data) => {
        //   添加播放按钮图片字段
        data.playM = require("../../assets/img/icon-play-m.png");
        data.playW = require("../../assets/img/icon-play-w.png");
        // 播放次数
        data.playCount =
          data.playCount > 1000
            ? (data.playCount / 1000).toFixed(0)
            : data.playCount;

        if (!map.has(data.id)) {
          map.set(data.id, data);
        }
      });
      map.forEach((data) => {
        dataList.push(data);
      });
      res.data.playlists = dataList;
      this.dataList = res.data;
    },
    // 歌单分类
    dropIndex(name) {
      this.cat = name;
      this.getPlaylist();
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
    // 全部风格
    allList() {
      this.cat = "全部";
      this.getPlaylist();
    },
    // 页码分页
    pageIndexChange(e) {
      // console.log(e);
      this.pageIndex = e;
      this.getPlaylist();
    },
    // 数据条数
    pageSizeChange(e) {
      // console.log(e);
      this.pageSize = e;
      this.getPlaylist();
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
  created() {
    if (this.$route.params.name !== undefined) {
      this.cat = this.$route.params.name;
    }
  },
  mounted() {
    // 歌单分类
    this.getCatList();
    // 默认歌单
    this.getPlaylist();
  },
};
</script>
<style lang="less" scoped>
.songSheet {
  width: 982px;
  margin: 0 auto;
  background-color: white;
  border: 1px solid #d3d3d3;
  position: relative;
  overflow: hidden;
  .content {
    width: 100%;
    padding: 40px;
    .classification {
      width: 100%;
      height: 42px;
      user-select: none;
      border-bottom: 2px solid red;
      > p {
        float: left;
        font-size: 24px;
        font-weight: normal;
        margin-top: 4px;
      }
      .sel_class {
        width: 91px;
        height: 31px;
        color: #0c73c2;
        background-image: url("../../assets/img/song_01.png");
        background-repeat: no-repeat;
        margin-top: 6px;
        margin-left: 20px;
        float: left;
        display: flex;
        justify-content: space-between;
        &:hover {
          cursor: pointer;
          background-image: url("../../assets/img/song_02.png");
        }
        > p {
          margin-top: 6px;
          margin-left: 5px;
        }
        .el-icon-arrow-down {
          margin-right: 21px;
          margin-top: 9px;
          font-size: 14px;
        }
      }
      .hot {
        width: 46px;
        height: 29px;
        float: right;
        background-image: url("../../assets/img/hot_1.png");
        background-repeat: no-repeat;
        margin-top: 10px;
        &:hover {
          cursor: pointer;
          background-image: url("../../assets/img/hot_2.png");
        }
        p {
          color: white;
          line-height: 25px;
          text-align: center;
          &:hover {
            text-decoration: underline;
          }
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
            background-image: url("../../assets/img/yingying.png");
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
  .dropdown {
    width: 720px;
    height: 415px;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: -3px 14px 23px 3px #afafaf;
    border-radius: 5px;
    position: absolute;
    top: 100px;
    left: 20px;
    .drop_top {
      width: 100%;
      height: 70px;
      border-bottom: 1px solid #ccc;
      position: relative;
      .whole {
        width: 84px;
        height: 30px;
        background-image: url("../../assets/img/song_01.png");
        background-repeat: no-repeat;
        position: absolute;
        top: 22px;
        left: 25px;
        p {
          text-align: center;
          line-height: 30px;
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
      .drop_list {
        width: 100%;
        position: absolute;
        left: 0px;
        top: 70px;
        > ul {
          > li {
            width: 100%;
            padding-left: 15px;
            padding-right: 15px;
            overflow: hidden;
            .icon {
              width: 71px;
              height: 65px;
              font-weight: bold;
              float: left;
              p {
                float: right;
                margin-top: 15px;
              }
              i {
                font-size: 16px;
                margin-left: 10px;
                margin-top: 15px;
              }
            }
            .list_name {
              width: 604px;
              min-height: 65px;
              border-left: 1px solid #ccc;
              float: right;
              ul {
                margin-top: 15px;
                margin-left: 15px;
                li {
                  color: #333;
                  float: left;
                  margin-right: 10px;
                  margin-bottom: 5px;
                  span:first-child {
                    &:hover {
                      text-decoration: underline;
                      cursor: pointer;
                    }
                  }
                  span:last-child {
                    color: #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    .s_j {
      width: 25px;
      height: 25px;
      background-color: white;
      transform: rotateZ(45deg);
      position: absolute;
      top: -13px;
      left: 116px;
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
    }
  }
}
</style>
