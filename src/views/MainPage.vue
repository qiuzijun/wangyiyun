<template>
  <div>
    <!-- 头部导航 -->
    <Nav />
    <!-- 歌曲导航 -->
    <musicNav />
    <!-- 推荐 -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: "MainPage",
  data() {
    return {};
  },
  components: {
    Nav: () => import("../components/navigationBar/navigationBar.vue"),
    musicNav: () => import("../components/musicNav/musicNav.vue"),
  },
};
</script>
