<template>
  <div @mousewheel="scroll">
    <!-- 轮播 -->
    <rotation />
    <!-- 热门推荐等内容区 -->
    <Content />
    <!-- 回到顶部 -->
    <Backtop :scroll="backTop"></Backtop>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backTop: false,
    };
  },
  components: {
    rotation: () => import("../../components/roll/rotation.vue"),
    Content: () => import("../../components/content/content.vue"),
    Backtop: () => import("../../components/Backtop.vue"),
  },
  methods: {
    // 滚动条事件
    handleScroll() {
      let top = document.documentElement.scrollTop;
      if (top >= 100) {
        this.backTop = true;
      } else {
        this.backTop = false;
      }
    },
    // 鼠标滚轮事件，控制置顶显示隐藏
    scroll() {
      let top = document.documentElement.scrollTop;
      if (top >= 100) {
        this.backTop = true;
      } else {
        this.backTop = false;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>
