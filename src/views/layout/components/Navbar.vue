<template>
  <el-menu class="navbar" mode="horizontal" style="background-color:#1D6CA7">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <div class="loginout" @click="loginout">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKqADAAQAAAABAAAAKgAAAAD30ocxAAADA0lEQVRYCdWYO2gVQRSGcxONEcQHQS19xPgADQGxUgtRFBR8gZ1JKYi2NhY2QrAIaQRT2IkWFhYSLCLEB2qlop2FERGCz4QkojFI9Pqdyc7ew925m9yb3ZnrgT9z5szc8/8zOzO7k4aG/8QKLp3FYrGR+Dqw2NWeQ+xroVCYmHdeBLaBATAFfNt7CM8C5+TFg6DDVvADhLbrsSjlxOpR95T4btX2Bn9K1fN0N5F8hSLYz1J4oOqzLiKXgT9qKg8lOuUYgLcFPFb8V8rpZNOItQPrTzCaQRP19Ae+aajuKrrNyjeuFWdLCc6Ud/JU17xaj6FPBDyJqpqmnoR+UOq1b8KLVGNo9x4CLoI1oNcpht22U+24b85OgYP19OhTpyKYUJ5gVcsuiFBEHmT6Rijfgr2pUxk1BhEKtwhdC+TVeR+xxynnNjp63UzwrQavgLUZnDNzKqWTV6EiCM7lYAhou5Qqlp7ehUZim+G+rZXi9wP3kqQhiNBIbCP8V4G2O1SW6Nmt6ojQP3T5JG8iLl9i8Xeuq58jdo3YSnA6ajtJOUi+Y3xZTUYxs14WPKMkbQWfQZb2jGRm0O61EA+hKmcjveXIydK2kMxcMDN79Dyi54y+m8R7QC0TsJ7fHQDWxnGOkve3DchRseBHHyerwYG/E3wC1j7i7EikIhhMKNz7wCSwNoyzISFSAjQEEQrvKTANrL3GqbzOafQuFM5zQN98n1DXV+bkpPoWCl8X0DZAZWlSWSlSy+4s/bp2T14K1m7inGB3/7IBV5nZ8eRKnhLroW0MyD/GbiCymNK31MS0e1+jJfZZDw1N4Dy4DOSClzQa6kHoYXRY6ytXGWqNluuQepsKat+E60mo0pl0rdC/qkk+1UKY5tV6jBYr9B01u/NWsVDmdTPMajTwicgjKt+w8o1rjieOh+90fkFkV9ThEfWX+D+jet7FNgj0q3OoIiHCOoB+71INYrcqirQNyNoOHgK5vvq2UQgvAOdLyHm3oXML4uU112wHkXP5heU3kjOHn/T/ADKso/C9/qJxAAAAAElFTkSuQmCC"
        alt
      />
      <span>退出登录</span>
    </div>
    <!-- <breadcrumb class="breadcrumb-container"></breadcrumb> -->

    <!-- <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar" v-if="avatar!==''">
          <span class="user-avatar circle">
            <svg-icon class="svgIcon" icon-class="user" />
          </span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="logout">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>-->
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import LangSelect from "@/components/LangSelect";
import ThemePicker from "@/components/ThemePicker";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"])
  },
  methods: {
    loginout() {
      localStorage.removeItem("token");
      this.$router.push({ path: "/login" });
    },
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    }
  }
};
</script>

<style lang="less" scoped>
.loginout {
  float: right;
  cursor: pointer;
  color: #fff;
  margin-right: 20px;
  img {
    width: 32px;
    height: 32px;
    display: inline-block;
    vertical-align: middle;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .circle {
        display: inline-block;
        border: 1px solid #e6e6e6;
        .svgIcon {
          vertical-align: inherit;
        }
      }
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        text-align: center;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 28px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
