<template>
  <a-layout id="main-layout">
    <a-layout>
      <a-layout-header class="header">
        <div class="logo">QrDize</div>
      </a-layout-header>
      <a-layout-content id="main-layout-content">
        <router-view/>
        <footer-nav class="main-footer"/>
      </a-layout-content>
    </a-layout>
    <a-modal title="App updates" v-model="updates" @ok="this.refreshApp">
      <p>New content is available, refresh to update</p>
    </a-modal>
  </a-layout>
</template>

<script>
import EventBus from "./event-bus";
import FooterNav from "@/components/FooterNav.vue";
import { mapState } from "vuex";

export default {
  components: {
    FooterNav
  },

  data() {
    return {
      updates: false
    };
  },

  computed: {
    ...mapState(["settings"])
  },

  methods: {
    /**
     * Show PWA updated notification
     */
    pwaUpdated() {
      this.updates = true;
    },

    /**
     * Force refresh app
     */
    refreshApp() {
      location.reload(true);
    },
  },

  created() {
    EventBus.$on("pwa-updated", this.pwaUpdated);
    // Load settings
    if (this.settings.openScannerOnStart == true) {
      this.$router.push("/scanner");
    }
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
#main-layout {
  min-height: 100vh;
  .main-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  #main-layout-content {
    margin-bottom: 64px;
  }
}

.header {
  background-color: rgb(3, 155, 229) !important;
  .logo {
    color: white;
    font-size: 16pt;
    font-weight: bold;
  }
}
</style>
