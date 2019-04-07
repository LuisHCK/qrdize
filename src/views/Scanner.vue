<template>
  <div class="reader-page">
    <video id="video" width="100%" height="100%"></video>

    <!-- Toggle btn -->
    <div class="toggle-container">
      <a-button @click="toggleCamera" type="primary" shape="circle" icon="swap"></a-button>
    </div>

    <!-- Poppup -->
    <a-modal
      title="Code content"
      cancelText="Close"
      okText="Save Code"
      centered
      v-model="showPopUp"
      @ok="() => saveCode()"
      @cancel="closePopUp"
      width="550"
    >
      <span class="code" v-html="getText(qrcode.text)"></span>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { BrowserQRCodeReader } from "@zxing/library";

export default {
  name: "scanner",

  /** Computed Vuex state */
  computed: {
    ...mapState(["settings"])
  },

  /**
   * Component data
   */
  data() {
    return {
      reader: new BrowserQRCodeReader(),
      videoInputDevices: [],
      qrcode: {},
      showPopUp: false,
      description: undefined,
      // Propmt
      val: "",
      activePrompt: false,
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
        .then(result => this.processCode(result))
        .catch(err => console.error(err));
    },

    /**
     * Process the scanned code
     */
    processCode(result) {
      this.qrcode = result;
      this.showPopUp = true;
      // Reload Reader
      this.initReader();
    },

    /**
     * Pare the scanned text
     */
    getText(text) {
      const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      if (regexp.test(text)) {
        return `<a href="${text}" target="_blank">${text}</a>`;
      } else {
        return text;
      }
    },

    /**
     * On qr result close popup
     */
    closePopUp() {
      this.showPopUp = false;
    },

    saveCode() {
      this.$db.qrcodes.add({
        code: this.qrcode.text,
        description: this.description,
        date: new Date().toISOString()
      });
      this.reader.stopStreams();
      this.$router.push("/");
    },

    close() {},

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
.toggle-container {
  position: fixed;
  bottom: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
