<template>
  <div class="reader-page">
    <video id="video" width="100%" height="100%"></video>
    <vs-button
      class="toggle-btn"
      size="large"
      radius
      color="primary"
      type="border"
      icon="switch_camera"
      @click="toggleCamera"
    ></vs-button>
    <!-- Poppup -->
    <vs-popup :title="'Code: '" :active.sync="showPopUp" @close="closePopUp">
      <div class="code-container">
        <span class="code" v-html="getText(qrcode.text)"></span>
        <div>
          <br>
          <vs-button @click="saveCode" color="primary" type="filled">Save QrCode</vs-button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { BrowserQRCodeReader } from "@zxing/library";
import SuccessPopUp from "@/components/SuccessPopUp.vue";

export default {
  name: "scanner",

  components: {
    SuccessPopUp
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
      activePrompt: false,
      description: undefined,
      // Propmt
      val: "",
      activePrompt: false,
      currentDevise: 0
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
          // Set input devise
          if (this.videoInputDevices.length > 1) {
            this.setDefaultInputDevise(1);
          } else {
            this.setDefaultInputDevise(0);
          }
        })
        .catch(err => console.error(err));
    },

    /**
     * Set devise 0 as default
     */
    setDefaultInputDevise(id = 0) {
      const DeviceId = this.videoInputDevices[id].deviceId;
      this.currentDevise = id;

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
    },

    /**
     * Pare the scanned text
     */
    getText(text) {
      const isUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(text);
      if (isUrl) {
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
      setTimeout(() => {
        this.$router.push("/")
      }, 300)
    },

    close() {},

    toggleCamera() {
      if (this.currentDevise == 0 && this.videoInputDevices.length > 1) {
        this.setDefaultInputDevise(1);
      } else {
        this.setDefaultInputDevise(0);
      }
    }
  },

  /**
   * Component life cicle
   */
  mounted() {
    this.initReader();
  }
};
</script>

<style scoped lang="scss">
.toggle-btn {
  position: absolute;
  bottom: 15px;
  left: 48%;
}
</style>