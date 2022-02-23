<template>
  <div>
    <router-view />
    <!-- 播放器 -->
    <Music />
    <!-- <Player /> -->
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
    // Player: () => import("./components/music/APlayer.vue"),
  },
};
</script>
