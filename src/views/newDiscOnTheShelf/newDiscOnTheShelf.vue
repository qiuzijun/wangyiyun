<template>
  <div class="newDisc">
    <div class="content">
      <div class="name">
        <p>全部新碟</p>
        <ul>
          <li v-for="item in list" :key="item.id">
            <p>
              <span @click="switchType(item.Code)">{{ item.name }}</span
              ><span v-show="item.id == 4 ? false : true">|</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="list">
        <ul>
          <li v-for="item in discList.albums" :key="item.id">
            <div class="list_img">
              <img
                src="../../assets/img/pian.png"
                alt=""
                class="list_bk"
                @click="routeDisc(item.id)"
              />
              <img
                :src="item.picUrl"
                alt=""
                class="list_img"
                width="130px"
                height="130px"
              />
            </div>
            <div class="play" @click="play(item.id)"></div>
            <p>{{ item.name }}</p>
            <p>
              <span v-for="data in item.artists" :key="data.id">
                <span>{{ data.name }}</span>
                <span v-show="item.artists.length > 1 ? true : false">/</span>
              </span>
            </p>
          </li>
        </ul>
      </div>
      <!-- 分页 -->
      <div class="page">
        <Page
          :total="discList.total"
          :page-size="50"
          @on-change="pageIndexChange"
          @on-page-size-change="pageSizeChange"
          show-total
          show-sizer
          :page-size-opts="[20, 30, 40, 50]"
          class="p_con"
        ></Page>
      </div>
    </div>
  </div>
</template>
<script>
import { disc } from "@/api/http.js";
export default {
  data() {
    return {
      list: [
        { id: 0, name: "全部", Code: "ALL" },
        { id: 1, name: "华语", Code: "ZH" },
        { id: 2, name: "欧美", Code: "EA" },
        { id: 3, name: "韩国", Code: "KR" },
        { id: 4, name: "日本", Code: "JP" },
      ],
      // 新碟类型
      area: "ALL", //默认全部类型
      // 页码
      pageIndex: 1,
      // 页数据
      pageSize: 50,
      // 新碟列表
      discList: [],
    };
  },
  methods: {
    // 获取新碟
    async getNewDisc() {
      let res;
      try {
        res = await disc({
          limit: this.pageSize,
          offset: this.pageIndex,
          area: this.area,
        });
      } catch (error) {
        console.log(error);
      }
      this.discList = res.data;
    },
    // 页码
    pageIndexChange(e) {
      this.pageIndex = e;
      this.getNewDisc();
    },
    // 页数据
    pageSizeChange(e) {
      this.pageSize = e;
      this.getNewDisc();
    },
    // 切换新碟类型
    switchType(code) {
      this.area = code;
      this.getNewDisc();
    },
    // 播放新碟
    play(id) {
      console.log(id);
      this.$store.dispatch("discId", id);
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
    // 新碟上架
    this.getNewDisc();
  },
};
</script>
<style lang="less" scoped>
.newDisc {
  width: 980px;
  background-color: white;
  margin: 0 auto;
  .content {
    width: 100%;

    padding: 40px;
    .name {
      width: 100%;
      height: 40px;
      border-bottom: 2px solid red;
      overflow: hidden;
      > p {
        font-size: 24px;
        float: left;
      }
      ul {
        margin-left: 145px;
        margin-top: 12px;
        li {
          margin-right: 10px;
          float: left;
          p {
            span:first-child {
              color: #666;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
            span:last-child {
              color: #c7c7c7;
              margin-left: 10px;
            }
          }
        }
      }
    }
    .list {
      width: 100%;
      overflow: hidden;
      ul {
        margin-left: -30px;
        margin-top: 20px;
        overflow: hidden;
        li {
          padding: 0 0 30px 33px;
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
          }
          p:first-child {
            font-size: 14px;
            &:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }
          p:last-child {
            color: #666;
            span {
              margin-right: 5px;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
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
    }
    .page {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
