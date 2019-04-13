<template>
  <a-layout id="batch-scan-page">
    <a-layout-sider
      breakpoint="lg"
      collapsedWidth="0"
      width="300"
      style="background: #ffffff"
    >
      <a-menu mode="inline">
        <a-menu-item class="scanned-item" v-for="(code, i) in codes" :key="'code_'+i">
          <span class="counter" v-text="i + 1 + '. '"></span>
          <span class="nav-text" v-text="code"/>
        </a-menu-item>
        <a-menu-item v-if="!codes.length">
          <a-icon type="qrcode"/>
          <span class="nav-text">No codes scanned</span>
        </a-menu-item>
      </a-menu>
      <a-button
        v-if="codes.length"
        type="primary"
        icon="save"
        class="save-button"
      >Save scanned codes</a-button>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <video id="video"></video>
        <div class="toggle-container">
          <a-button @click="toggleCamera" type="primary" shape="circle" icon="swap"></a-button>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { BrowserMultiFormatReader } from "@zxing/library";
import { mapState } from "vuex";

export default {
  /** Computed Vuex state */
  computed: {
    ...mapState(["settings"])
  },

  data() {
    return {
      codes: []
    };
  },

  methods: {
    toggleCamera() {},
  }
};
</script>

<style lang="scss">
#batch-scan-page {
  height: 86vh;
  .scanned-item {
    border-bottom: 1px solid rgb(247, 247, 247);
    .counter {
      color: rgb(168, 168, 168);
    }
  }
  .save-button {
    border-radius: 0;
    height: 47px;
  }

  #video {
    width: auto;
    height: 100%;
  }
}
.ant-layout-sider-children {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.ant-layout-sider-zero-width-trigger {
  z-index: 10;
}
</style>