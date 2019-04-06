<template>
  <div class="settings-page">
    <ul class="settings-list">
      <li class="setting-item">
        <span>Open scanner on start</span>
        <a-checkbox
          :checked="settings.openScannerOnStart"
          @change="updateSetting('openScannerOnStart', $event.target.checked)"
        ></a-checkbox>
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

  methods: {
    updateSettings() {
      this.$store.commit("setSettings", this.settings);
    },

    updateSetting(key, value) {
      this.settings[key] = value;
      this.updateSettings();
    }
  }
};
</script>

<style scoped lang="scss">
.settings-list {
  padding: 20px 20px 20px 20px;
  border-bottom: 1px;
  border-bottom: 1px solid rgb(233, 233, 233);
  background-color: rgb(250, 250, 250);
  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>