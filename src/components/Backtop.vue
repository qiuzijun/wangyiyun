<template>
  <div class="backTop" v-show="scroll" @click="scrollClick">
    <p><i class="el-icon-caret-top"></i></p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["scroll"],
  methods: {
    scrollClick() {
      document.documentElement.scrollTop = 0;
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.backTop {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
  position: fixed;
  bottom: 100px;
  right: 100px;
  &:hover {
    background-color: #ccc;
    cursor: pointer;
  }
  p {
    margin-top: 10px;
    text-align: center;
    .el-icon-caret-top {
      font-size: 20px;
      color: #c20c0c;
    }
  }
}
</style>
