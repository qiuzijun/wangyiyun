<template>
  <div
    id="rotation"
    :style="{
      backgroundImage: `url(${imgList[num].imageUrl}?imageView&blur=40x20)`,
      backgroundSize: '6000px',
      backgroundPosition: 'center,center',
    }"
    v-if="imgIf"
  >
    <div class="roll">
      <!-- 轮播图 -->
      <div class="rollImg" @mouseover="rotationOver" @mouseout="rotationOut">
        <!-- <transition-group name="banner">
          <div v-for="item in imgList" :key="item.id" v-show="num == item.id">
            <img :src="item.imageUrl" alt="" width="728.5px" height="285px" />
          </div>
        </transition-group> -->
        <ul ref="banner" class="banner">
          <li v-for="item in imgList" :key="item.id">
            <img :src="item.imageUrl" alt="" width="728.5px" height="285px" />
          </li>
        </ul>
        <ul>
          <li v-for="item in imgList" :key="item.id">
            <div
              class="spot"
              @mouseover="imgOver(item.id)"
              @click="imgClick(item.id)"
              :style="{
                backgroundColor: number == item.id ? 'red' : 'white',
              }"
            ></div>
          </li>
        </ul>
      </div>
      <!-- 下载 -->
      <div class="download">
        <div
          class="downloadImg2"
          v-if="downloadImg"
          @mouseover="downloadImg = false"
          @click="download"
        ></div>
        <router-link to="/download" v-else>
          <div class="downloadImg1" @mouseout="downloadImg = true"></div>
        </router-link>
        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        <div class="toggleArrow">
          <i
            class="el-icon-arrow-left"
            @click="leftClick"
            @mouseover="rotationOver"
            @mouseout="rotationOut"
          ></i>
          <i
            class="el-icon-arrow-right"
            @click="rightClick"
            @mouseover="rotationOver"
            @mouseout="rotationOut"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { banner } from "@/api/http.js";
export default {
  data() {
    return {
      downloadImg: true, //下载图片切换
      num: 0, //轮播初始位置
      number: 0,
      imgIf: false,
      imgList: [], //轮播图
      // length:0
    };
  },

  methods: {
    // 跳转下载页面
    download() {
      this.$router.push({
        path: "/download",
      });
    },
    // 获取轮播图
    async getBanner() {
      let res;
      try {
        res = await banner({
          type: 0,
        });
      } catch (error) {
        console.log(error);
      }
      // console.log(res);
      this.imgList = JSON.parse(JSON.stringify(res.data.banners));
      this.imgList.forEach((data, index) => {
        data.id = index;
      });
      this.imgIf = true;
    },
    // 轮播
    rotation() {
      this.setInt = setInterval(() => {
        this.num++;

        if (this.num == this.imgList.length) {
          this.num = 0;
          // console.log(this.num);
          document.querySelector(".banner").style.left =
            this.num * -728.5 + "px";
        } else {
          // console.log(this.num);
          document.querySelector(".banner").style.left =
            this.num * -728.5 + "px";
        }
        this.number = this.num;
      }, 3000);
    },
    //鼠标经过图片
    rotationOver() {
      clearInterval(this.setInt);
    },
    //鼠标离开图片
    rotationOut() {
      this.setInt = setInterval(() => {
        this.num++;

        if (this.num == this.imgList.length) {
          this.num = 0;
          // console.log(this.num);
          document.querySelector(".banner").style.left =
            this.num * -728.5 + "px";
        } else {
          // console.log(this.num);
          document.querySelector(".banner").style.left =
            this.num * -728.5 + "px";
        }
        this.number = this.num;
      }, 3000);
    },
    // 经过轮播点
    imgOver(i) {
      this.number = i;
    },

    imgClick(i) {
      this.number = i;
      this.num = i;
      document.querySelector(".banner").style.left = this.num * -728.5 + "px";
    },
    // 右切换图片
    rightClick() {
      this.num = this.num + 1;

      if (this.num == this.imgList.length) {
        // console.log(this.num);
        this.num = 0;
        this.number = this.num;
        document.querySelector(".banner").style.left = this.num * -728.5 + "px";
      } else {
        // console.log(this.num);
        this.number = this.num;
        document.querySelector(".banner").style.left = this.num * -728.5 + "px";
      }
    },
    // 左切换图片
    leftClick() {
      this.num = this.num - 1;
      if (this.num < 0) {
        this.num = this.imgList.length - 1;
        // console.log(this.num);
        this.number = this.num;
        document.querySelector(".banner").style.left = this.num * -728.5 + "px";
      } else {
        this.number = this.num;
        // console.log(this.num);
        document.querySelector(".banner").style.left = this.num * -728.5 + "px";
      }
    },
    // 跳转到歌词界面、以及播放音乐
    // routeLyric(id) {
    //   this.$store.dispatch("playId", id);
    //   this.$router.push({
    //     name: "lyric",
    //     params: {
    //       id,
    //     },
    //   });
    //   localStorage.setItem("lyricId", id);
    // },
  },
  mounted() {
    // 轮播定时器
    this.rotation();
    // 获取轮播图
    this.getBanner();
  },
  destroyed() {
    clearInterval(this.setInt);
  },
  beforeUnmount() {
    clearInterval(this.setInt);
  },
};
</script>
<style lang="less" scoped>
#rotation {
  width: 100%;
  height: 285px;
  transition: all 1s ease-in-out;
  .roll {
    width: 982px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .rollImg {
      width: 730px;
      height: 100%;
      overflow: hidden;
      position: relative;
      z-index: 1;
      cursor: pointer;

      ul:first-child {
        width: 40000px;
        height: 100%;
        position: absolute;
        left: 0px;
        li {
          float: left;
        }
      }
      ul:last-child {
        position: absolute;
        top: 270px;
        left: 250px;
        li {
          margin-right: 20px;
          float: left;
          .spot {
            width: 6px;
            height: 6px;
            background-color: white;
            border-radius: 50%;

            &:hover {
              background-color: red;
              cursor: pointer;
            }
          }
        }
      }
    }
    .download {
      width: 254px;
      height: 100%;
      position: relative;
      background: url("../../assets/img/download2.png") no-repeat;
      .toggleArrow {
        .el-icon-arrow-left {
          height: 63px;
          line-height: 63px;
          position: absolute;
          left: -828px;
          top: 115px;
          z-index: 1000;
          font-size: 50px;
          &:hover {
            background-color: rgba(0, 0, 0, 0.3);
            cursor: pointer;
          }
        }
        .el-icon-arrow-right {
          height: 63px;
          line-height: 63px;
          position: absolute;
          right: -100px;
          top: 115px;
          font-size: 50px;
          &:hover {
            background-color: rgba(0, 0, 0, 0.3);
            cursor: pointer;
          }
        }
      }
      .downloadImg1 {
        width: 215px;
        height: 56px;
        background: url("../../assets/img/download1.png") no-repeat;
        margin-top: 185px;
        margin-left: 19px;
        cursor: pointer;
      }
      .downloadImg2 {
        width: 215px;
        height: 56px;
        background: url("../../assets/img/download3.png") no-repeat;
        margin-top: 185px;
        margin-left: 19px;
        cursor: pointer;
      }
      p {
        font-size: 12px;
        margin: 10px auto;
        text-align: center;
        color: #8d8d8d;
      }
    }
  }
}
</style>
