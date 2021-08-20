<template>
  <div class="index">
    <v-head></v-head>
    <v-sildebar></v-sildebar>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSildebar from "./Sildebar.vue";
export default {
  name: "",
  data() {
    return {
      tagsList: [],
      collapse: false,
    };
  },
  components: {
    vHead,
    vSildebar,
  },
};
</script>

<style scoped>
.index {
  height: 100%;
}
.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 80px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
}
.content {
  width: auto;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
