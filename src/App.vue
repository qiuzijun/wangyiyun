<template>
  <div>
    <router-view />
    <!-- 播放器 -->
    <Music />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    Music: () => import("./components/music/music.vue"),
  },
};
</script>
