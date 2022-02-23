<template>
  <div>
    <div class="text">
      <router-link to="">
        <p>热门推荐</p>
      </router-link>

      <ul>
        <li v-for="item in list" :key="item.id">
          <router-link :to="{ name: 'songSheet', params: { name: item.name } }">
            {{ item.name }}</router-link
          >
          <span v-show="item.id == 4 ? false : true">|</span>
        </li>
      </ul>
      <!-- 更多 -->
      <div class="more">
        <router-link :to="{ name: 'songSheet' }">
          <p>更多</p>
        </router-link>
        <img src="@/assets/img/redjian.png" alt="" width="14px" height="14px" />
      </div>
    </div>
    <div class="popularImg">
      <ul>
        <li
          v-for="item in imgList"
          :key="item.id"
          @click="routeSongList(item.id)"
        >
          <div class="musicImg">
            <router-link to="" :title="item.name">
              <img src="../../../assets/img/icon-coverall.png" alt="" />
            </router-link>
            <img v-lazy="item.picUrl" alt="" width="140px" height="140px" />
          </div>
          <div class="heat">
            <img
              src="../../../assets/img/icon-erji.png"
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
          <router-link to="" :title="item.name">
            <p>{{ item.name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { popularRecommendation } from "@/api/http.js";
export default {
  data() {
    return {
      number: -1, //播放按钮图的切换
      list: [
        {
          id: 0,
          name: "华语",
        },
        {
          id: 1,
          name: "流行",
        },
        {
          id: 2,
          name: "摇滚",
        },
        {
          id: 3,
          name: "民谣",
        },
        {
          id: 4,
          name: "电子",
        },
      ],
      imgList: [],
    };
  },
  methods: {
    //   获取热门推荐歌单
    async getPopularRecommendation() {
      let res;
      try {
        res = await popularRecommendation({
          limit: 8,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      //   console.log(res);
      this.imgList = JSON.parse(JSON.stringify(res.data.result));
      this.imgList.forEach((data) => {
        //   添加播放按钮图片字段
        data.playM = require("../../../assets/img/icon-play-m.png");
        data.playW = require("../../../assets/img/icon-play-w.png");
        // 播放次数
        data.playCount =
          data.playCount > 1000
            ? (data.playCount / 1000).toFixed(0)
            : data.playCount;
      });
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
    //获取热门推荐歌单
    this.getPopularRecommendation();
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
  ul {
    margin-left: -250px;
    li {
      line-height: 35px;
      float: left;
      a {
        color: #333;
        &:hover {
          text-decoration: underline;
        }
      }
      span {
        color: #ccc;
        margin: 0 15px;
      }
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
.popularImg {
  ul {
    height: 468px;
    margin-top: 20px;
    li {
      width: 182px;
      height: 234px;
      font-size: 14px;
      padding: 0 0 30px 42px;

      float: left;
      position: relative;
      .musicImg {
        width: 140px;
        > a > img {
          position: absolute;
        }
      }
      .heat {
        width: 140px;
        height: 27px;
        font-size: 12px;
        color: #ccc;
        background-image: url("../../../assets/img/yingying.png");
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
      a:last-child {
        color: black;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  ul > li:first-child {
    margin-left: -42px;
  }
  ul > li:nth-child(5) {
    margin-left: -42px;
  }
}
</style>
