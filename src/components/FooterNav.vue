<template>
  <a-layout-footer style="textAlign: center">
    <button class="nav-button" :class="{active: activeButton==0}" @click="navigateTo('/', 0)">
      <a-icon type="home" :style="{fontSize: '18pt'}"/>
    </button>
    <button
      class="nav-button"
      :class="{active: activeButton==1}"
      @click="navigateTo('/scanner', 1)"
    >
      <a-icon type="scan" :style="{fontSize: '18pt'}"/>
    </button>
    <button
      class="nav-button"
      :class="{active: activeButton==3}"
      @click="navigateTo('/settings', 3)"
    >
      <a-icon type="setting" :style="{fontSize: '18pt'}"/>
    </button>
    <button class="nav-button" :class="{active: activeButton==2}" @click="navigateTo('/about', 2)">
      <a-icon type="info-circle" :style="{fontSize: '18pt'}"/>
    </button>
  </a-layout-footer>
</template>

<script>
export default {
  name: "footer-nav",
  data() {
    return {
      activeButton: 0
    };
  },

  methods: {
    navigateTo(route, buttonIndex) {
      this.$router.push(route);
      this.activeButton = buttonIndex;
    },

    switchActiveButton(name) {
      switch (name) {
        case "home":
          this.activeButton = 0;
          break;

        case "scanner":
          this.activeButton = 1;
          break;

        case "about":
          this.activeButton = 2;
          break;

        case "settings":
          this.activeButton = 3;
          break;
      }
    }
  },

  watch: {
    $route(value) {
      this.switchActiveButton(value.name);
    }
  }
};
</script>

<style scoped lang="scss">
.ant-layout-footer {
  padding: 0px;
  display: flex;
  background-color: rgb(250, 250, 250);
  justify-content: space-around;
  border-top: 2px solid rgb(235, 235, 235);
  .nav-button {
    border: none;
    background-color: transparent;
    padding: 15px;
    width: 100%;
    transition: 0.3s;
  }
  .nav-button.active {
    background-color: rgb(3, 155, 229);
    color: white;
  }
}
</style>