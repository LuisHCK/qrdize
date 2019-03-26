<template>
  <div class="settings-page">
    <ul class="settings-list">
      <li class="setting-item">
        <span>Open scanner on start</span>
        <input type="checkbox" v-model="settings.openScannerOnStart">
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "settings",

  computed: {
    ...mapState(["settings"])
  },

  watch: {
    settings: {
      handler(value) {
        this.updateSettings();
      },
      deep: true
    }
  },

  methods: {
    updateSettings() {
      this.$store.commit("setSettings", this.settings);
    }
  }
};
</script>

<style scoped lang="scss">
.settings-list {
  padding: 20px 20px 20px 20px;
  border-bottom: 1px;
  border-bottom: 1px solid rgb(233, 233, 233);
  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>