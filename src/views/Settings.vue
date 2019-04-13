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

      <li class="setting-item">
        <span>Default camera</span>
        <a-select
          style="width: 60%"
          :defaultValue="settings.defaultCamera"
          @change="setDefaultCamera">
          <a-select-option
            v-for="(camera, i) in cameras"
            :key="'camera_select' + i"
            :value="i">
              {{ camera.label }}
           </a-select-option>
        </a-select>
      </li>
      <li class="setting-item">
        <span>Seconds between scans</span>
         <a-input-number
          v-model="settings.scanInterval"
          style="width: 150px"
          placeholder="Time in seconds"
          :min="1"
          @change="setScanInterval"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { BrowserQRCodeReader } from "@zxing/library";

// initialize reader
const Reader = new BrowserQRCodeReader()

export default {
  name: "settings",

  computed: {
    ...mapState(["settings"])
  },

  data() {
    return {
      cameras: [{}]
    }
  },

  methods: {
    updateSettings() {
      this.$store.commit("setSettings", this.settings);
    },

    updateSetting(key, value) {
      this.settings[key] = value;
      this.updateSettings();
    },

    setDefaultCamera(index) {
      this.settings.defaultCamera = index
      this.updateSettings()
    },

    setScanInterval(val) {
      this.settings.scanInterval = val
      this.updateSettings()
    },

    getCameras() {
      Reader.getVideoInputDevices()
        .then(videoInputDevices => {
          this.cameras = videoInputDevices
        })
    }
  },

  mounted() {
    this.getCameras()
  }
};
</script>

<style scoped lang="scss">
.settings-list {
  padding: 0;
  .setting-item {
    border-bottom: 1px;
    padding: 15px 15px 15px 15px;
    border-bottom: 1px solid rgb(233, 233, 233);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
  }
}
</style>
