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
    >
      <span class="code" v-html="getText(qrcode.text)"></span>
    </a-modal>
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
      // Reload Reader
      this.initReader();
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