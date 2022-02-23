<template>
  <div id="nav">
    <div class="navContent">
      <ul>
        <li
          v-for="item in list"
          :key="item.id"
          @click="goRouter(item.id)"
          :style="{
            backgroundColor: routeName == item.name ? '#9b0909' : '',
          }"
        >
          <p>{{ item.name }}</p>
        </li>
      </ul>
      <i class="icon-triangle"></i>
    </div>
  </div>
</template>
<script>
import router from "../../router/index";
export default {
  data() {
    return {
      list: [
        {
          id: 0,
          name: "推荐",
        },
        {
          id: 1,
          name: "排行榜",
        },
        {
          id: 2,
          name: "歌单",
        },
        {
          id: 3,
          name: "主播电台",
        },
        {
          id: 4,
          name: "歌手",
        },
        {
          id: 5,
          name: "新碟上架",
        },
        {
          id: 6,
          name: "全部MV",
        },
      ],
      //当前路由
      routeName: "推荐",
    };
  },
  watch: {
    $route: {
      handler: function (newName) {
        if (newName) {
          if (newName.meta.title == "网易云音乐") {
            this.routeName = "推荐";
            sessionStorage.setItem("setName", this.routeName);
          } else {
            this.routeName = newName.meta.title;
            sessionStorage.setItem("setName", this.routeName);
          }
        }
      },
    },
  },
  created() {
    if (sessionStorage.getItem("setName")) {
      this.routeName = sessionStorage.getItem("setName");
    }
  },
  methods: {
    // 路由跳转
    goRouter(index = 0) {
      this.$router.push({
        path:
          "/discoverMusic" +
          "/" +
          router.options.routes[3].children[index + 1].path,
      });
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
#nav {
  width: 100%;
  height: 35px;
  box-sizing: border-box;
  background-color: #c20c0c;
  border-bottom: 1px solid #a40011;
  .navContent {
    width: 1100px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    ul {
      padding-left: 200px;
      li {
        float: left;
        font-size: 12px;
        color: white;
        padding: 0 13px;
        border-radius: 20px;

        margin: 7px 17px 0;
        &:hover {
          cursor: pointer;
          background-color: #9b0909;
        }
      }
      // li:first-child {
      //   background-color: #9b0909;
      // }
    }
    .icon-triangle {
      position: absolute;
      top: -15px;
      left: 235px;
      border-top: 8px solid transparent;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #c20c0c;
    }
  }
}
</style>
