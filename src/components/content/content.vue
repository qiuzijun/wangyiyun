<template>
  <div class="content">
    <div class="center">
      <div class="centerLeft">
        <!-- 热门推荐 -->
        <Popular />
        <!-- 新碟上架 -->
        <NewDisc />
        <!-- 榜单 -->
        <List />
      </div>
      <div class="centerRight">
        <!-- 用户登录 -->
        <div class="login">
          <p>登录网易云音乐，可以享受无限收藏的</p>
          <p>乐趣，并且无限同步到手机</p>
          <div class="button" @click="loginBtn">
            <p>用户登录</p>
          </div>
        </div>
        <!-- 入驻歌手 -->
        <div class="residentSinger">
          <div class="text">
            <p>热门歌手</p>
            <p>查看更多&gt;</p>
          </div>
          <div class="singerContent">
            <ul>
              <li v-for="item in singerList.slice(0, 5)" :key="item.id">
                <img :src="item.picUrl" alt="" width="62px" height="62px" />
                <div class="text">
                  <p>{{ item.name }}</p>
                  <p>{{ item.alias[0] }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 热门主播 -->
        <div class="popularAnchor">
          <div class="text">
            <p>热门主播</p>
          </div>
          <div class="anchorContent">
            <ul>
              <li v-for="item in anchorList.slice(0, 5)" :key="item.id">
                <img :src="item.avatarUrl" alt="" width="40px" height="40px" />
                <div class="text">
                  <p>{{ item.nickName }}</p>
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
import { hotSinger, hotPopular } from "@/api/http.js";
export default {
  data() {
    return {
      singerList: [],
      anchorList: [],
    };
  },
  components: {
    Popular: () => import("../../components/content/popular/popular.vue"),
    NewDisc: () => import("../../components/content/newDisc/newDisc.vue"),
    List: () => import("../../components/content/list/list.vue"),
  },
  methods: {
    // 用户登录
    loginBtn() {
      this.$store.state.login = !this.$store.state.login;
    },
    // 获取前5热门歌手
    async getHotSinger() {
      let res;
      try {
        res = await hotSinger({
          offset: 0,
          limit: 5,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      this.singerList = res.data.artists;
    },
    // 获取前5热门主播
    async getAnchor() {
      let res;
      try {
        res = await hotPopular({
          limit: 5,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      this.anchorList = res.data.data.list;
    },
  },
  mounted() {
    // 获取前5热门歌手
    this.getHotSinger();
    // 获取前5热门主播
    this.getAnchor();
  },
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  background-color: #f5f5f5;
  .center {
    width: 982px;
    border: 1px solid #ccc;
    border-top: none;
    background-color: white;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .centerLeft {
      width: 740px;
      padding: 20px 20px 40px;
      border-right: 1px solid #ccc;
    }
    .centerRight {
      width: 254px;
      .login {
        width: 100%;
        height: 126px;
        background: url("../../assets/img/loginBk.png") no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .button {
          width: 100px;
          height: 30px;
          margin-top: 20px;
          background-color: #cf1f16;
          border-radius: 5px;
          box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.5);
          cursor: pointer;
          p {
            font-size: 13px;
            color: white;
            text-align: center;
            line-height: 30px;
          }
        }
      }
      .residentSinger {
        width: 210px;
        margin: 0 auto;
        > .text {
          height: 24px;
          margin-top: 25px;
          border-bottom: 1px solid #ccc;
          display: flex;
          justify-content: space-between;
          p:first-child {
            font-size: 12px;
            font-weight: bold;
          }
          &:hover {
            p:last-child {
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
        .singerContent {
          ul {
            margin-top: 20px;
            li {
              width: 100%;
              height: 62px;
              margin-bottom: 15px;
              background-color: #fafafa;
              border: 1px solid #ccc;
              .text {
                width: 128px;
                height: 62px;

                float: right;
                p:first-child {
                  font-size: 14px;
                  font-weight: bold;
                  margin-top: 10px;
                  margin-bottom: 5px;
                }
                p:last-child {
                  font-size: 12px;
                }
              }
              &:hover {
                background-color: #ccc;
                cursor: pointer;
              }
            }
          }
        }
      }
      .popularAnchor {
        width: 210px;
        margin: 0 auto;
        > .text {
          height: 24px;
          margin-top: 25px;
          border-bottom: 1px solid #ccc;

          p {
            font-size: 12px;
            font-weight: bold;
          }
        }
        .anchorContent {
          ul {
            margin-top: 20px;
            li {
              width: 100%;
              height: 40px;
              margin-bottom: 15px;
              .text {
                width: 128px;
                height: 40px;
                margin-right: 20px;
                float: right;
                p {
                  margin-top: 10px;
                  margin-bottom: 5px;
                  &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
