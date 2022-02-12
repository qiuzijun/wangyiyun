<template>
  <div>
    <Nav />
    <div class="color">
      <div class="content">
        <div class="triangle"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {
    Nav: () => import("../../components/navigationBar/navigationBar.vue"),
  },
};
</script>
<style lang="less" scoped>
.color {
  width: 100%;
  height: 5px;
  background-color: #c20c0c;
  .content {
    width: 1100px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    .triangle {
      position: absolute;
      top: -15px;
      left: 43.3%;
      border-top: 8px solid transparent;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #c20c0c;
    }
  }
}
</style>
