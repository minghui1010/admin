<template>
    <div class="header">
      <div class="header-left">后台管理系统</div>
      <div class="header-right">
        <div class="header-right-img"></div>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="loginOut()"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {

    loginOut() {
      localStorage.removeItem("ms_username");
      this.$router.push("/login");
    },
  },
  computed: {
    username() {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 80px;
  background-color: #242424;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 50px;
}
.header-left {
  font-size: 20px;
  color: #fff;
}
.header-right {
  display: flex;
  align-items: center;
}
.header-right-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url("../assets/img.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  margin-right: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  margin-left: 10px;
}
</style>