<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
  </div>
</template>

<script>
import EventBus from "./event-bus";
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar
  },

  methods: {
    /**
     * Show PWA updated notification
     */
    pwaUpdated() {
      this.$vs.dialog({
        type: "confirm",
        color: "success",
        title: `Reload`,
        text: "New content is available; please refresh.",
        accept: this.refreshApp
      });
    },

    /**
     * Force refresh app
     */
    refreshApp() {
      location.reload(true);
    }
  },

  created() {
    EventBus.$on("pwa-updated", this.pwaUpdated);
  }
};
</script>


<style lang="scss">
body {
  font-family: "Avenir", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app {
  min-height: 100vh;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
