<template>
  <div class="reader">
    <video id="video" width="100%" height="100%"></video>

    <!-- Toggle btn -->
    <div class="toggle-container">
      <a-button @click="toggleCamera" type="primary" shape="circle" icon="swap"></a-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { BrowserMultiFormatReader } from "@zxing/library";

export default {
  name: "scanner",

  /** Computed Vuex state */
  computed: {
    ...mapState(["settings"])
  },

  /** Component props */
  props: {
    showPopup: Boolean
  },

  /**
   * Component data
   */
  data() {
    return {
      reader: new BrowserMultiFormatReader(),
      videoInputDevices: [],
      qrcode: {},
      currentDevice: 0
    };
  },

  /**
   * Component methods
   */
  methods: {
    initReader() {
      this.reader
        .getVideoInputDevices()
        .then(videoInputDevices => {
          this.videoInputDevices = videoInputDevices;
          // Check for defined default camera in settings
          if (this.settings.defaultCamera !== undefined) {
            console.log(this.settings.defaultCamera);
            return this.setDefaultInputDevice(this.settings.defaultCamera);
          }
          // Set input device
          if (this.videoInputDevices.length > 1) {
            this.setDefaultInputDevice(1);
          } else {
            this.setDefaultInputDevice(0);
          }
        })
        .catch(err => console.error(err));
    },

    /**
     * Set device 0 as default
     */
    setDefaultInputDevice(id = 0) {
      const DeviceId = this.videoInputDevices[id].deviceId;
      this.currentDevice = id;

      this.reader
        .decodeFromInputVideoDevice(DeviceId, "video")
        .then(result => this.scanOk(result))
        .catch(err => this.scanFail(err));
    },

    scanOk(result = undefined) {
      // Emit the result
      if (result) this.$emit("scan", result);

      //this.processCode(result)
      let interval = 1000;
      if (this.settings.scanInterval)
        interval = this.settings.scanInterval * interval;

      setTimeout(() => {
        // If a popup is open stop scanning
        if (this.showPopup) return;
        this.reader.decodeOnceWithDelay(this.scanOk, this.scanFail);
      }, interval);
    },

    scanFail(error) {
      console.log(error);
    },

    /**
     * Process the scanned code
     */
    processCode(result) {
      console.log(result);
      this.$emit("scan", result);
    },

    toggleCamera() {
      if (this.currentDevice == 0 && this.videoInputDevices.length > 1) {
        this.setDefaultInputDevice(1);
      } else {
        this.setDefaultInputDevice(0);
      }
    }
  },

  /**
   * Component life cicle
   */
  mounted() {
    this.initReader();
  },

  beforeDestroy() {
    this.reader.stopStreams();
  }
};
</script>

<style scoped lang="scss">
</style>
