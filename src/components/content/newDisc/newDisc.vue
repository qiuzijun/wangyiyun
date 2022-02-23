<template>
  <div>
    <div class="text">
      <router-link to="">
        <p>新碟上架</p>
      </router-link>
      <!-- 更多 -->
      <div class="more">
        <router-link :to="{ name: 'newDiscOnTheShelf' }">
          <p>更多</p>
        </router-link>
        <img src="@/assets/img/redjian.png" alt="" width="14px" height="14px" />
      </div>
    </div>
    <div class="content">
      <div class="disc">
        <div class="discContent">
          <ul ref="disc">
            <li v-for="item in list" :key="item.id">
              <img
                src="../../../assets/img/icon-coverall.png"
                alt=""
                width="100px"
                height="100px"
              />
              <a @click="routeDisc(item.id)">
                <img
                  src="../../../assets/img/pian.png"
                  alt=""
                  width="118px"
                  height="100px"
                  @mouseover="playLiOver(item.id)"
                  @mouseout="playLiOut"
                />
              </a>

              <img
                v-lazy="item.picUrl"
                :alt="item.name"
                :title="item.name"
                width="100px"
                height="100px"
              />
              <router-link :to="item.name" :title="item.name">
                <p>{{ item.name }}</p>
              </router-link>
              <router-link
                :to="{
                  name: 'singerInformation',
                  params: {
                    singer: { id: data.id, name: data.name, src: data.picUrl },
                  },
                }"
                :title="data.name"
                v-for="data in item.artists"
                :key="data.id"
              >
                <span>{{ data.name }}/</span>
              </router-link>
              <img
                v-show="num == item.id ? true : false"
                @mouseover="playOver(item.id)"
                @mouseout="playOut"
                @click="playClick(item.id)"
                :src="number == item.id ? item.playW : item.playM"
                alt=""
                class="img"
              />
            </li>
          </ul>
        </div>
        <i class="el-icon-caret-left" @click="discLeft"></i>
        <i class="el-icon-caret-right" @click="discRight"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { newDisc } from "@/api/http.js";
export default {
  data() {
    return {
      number: -1, //播放按钮切换
      num: -1, //播放按钮隐藏
      list: [],
      index: 0, //滚动初始值
      play: false, //播放按钮显示隐藏
    };
  },
  methods: {
    // 移入li
    playLiOver(index) {
      this.num = index;
    },
    // 移出li
    playLiOut() {
      this.num = -1;
    },
    //   移入播放按钮
    playOver(index) {
      this.number = index;
      this.num = index;
    },
    // 离开播放按钮
    playOut() {
      this.number = -1;
    },
    //左滚动
    discLeft() {
      this.index++;
      if (this.index >= 2) {
        this.index = 0;
        this.$refs.disc.style.left = this.index * -645 + "px";
      } else {
        this.$refs.disc.style.left = this.index * -645 + "px";
      }
    },
    // 右滚动
    discRight() {
      this.index--;
      if (this.index < 0) {
        this.index = 1;
        this.$refs.disc.style.left = this.index * -645 + "px";
      } else {
        this.$refs.disc.style.left = this.index * 645 + "px";
      }
    },
    // 获取新碟上架
    async getNewDisc() {
      let res;
      try {
        res = await newDisc({
          limit: 10,
          offset: 0,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      // console.log(res);
      // 取前10
      if (res.data.monthData.length == 0) {
        this.list = res.data.weekData.slice(0, 10);
      } else {
        this.list = res.data.monthData.slice(0, 10);
      }
      this.list.forEach((data) => {
        data.playW = require("../../../assets/img/play_02.png");
        data.playM = require("../../../assets/img/play_01.png");
      });
    },
    // 点击播放传递id
    playClick(id) {
      // console.log(id);
      this.$store.dispatch("newDiscId", id);
    },
    // 跳转新碟页面
    routeDisc(id) {
      this.$router.push({
        name: "disc",
        params: {
          id,
        },
      });
      localStorage.setItem("discId", id);
    },
  },
  mounted() {
    // 获取新碟上架
    this.getNewDisc();
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
      p {
        &:hover {
          text-decoration: underline;
        }
      }
    }
    > img {
      margin-top: 10px;
      margin-left: 5px;
    }
  }
}
.content {
  width: 687px;
  height: 186px;
  border: 1px solid #d3d3d3;
  margin: 20px 0 37px;
  .disc {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    border: 1px solid #fff;
    position: relative;
    .discContent {
      width: 645px;
      height: 150px;
      margin: 15px auto 0;
      overflow: hidden;
      font-size: 12px;
      position: relative;
      ul {
        width: 10000px;
        position: absolute;
        left: 0px;
        transition: all 0.3s;
        li {
          width: 118px;
          height: 150px;
          float: left;
          margin-left: 11px;
          position: relative;
          top: 5px;
          img:first-child {
            position: absolute;
          }

          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          a {
            display: inline;
            color: black;
            p {
              color: #000;
            }
            span {
              color: #666;
            }
            &:hover {
              text-decoration: underline;
            }
          }
          .img {
            position: absolute;
            top: 70px;
            right: 25px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    .el-icon-caret-left {
      font-size: 25px;
      position: absolute;
      top: 70px;
      left: -5px;
      cursor: pointer;
    }
    .el-icon-caret-right {
      font-size: 25px;
      position: absolute;
      top: 70px;
      right: -5px;
      cursor: pointer;
    }
  }
}
</style>
