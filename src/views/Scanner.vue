<template>
  <div class="reader-page">
    <video id="video" width="100%" height="100%"></video>
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
      activePrompt: false
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
          this.setDefaultInputDevise();
        })
        .catch(err => console.error(err));
    },

    /**
     * Set devise 0 as default
     */
    setDefaultInputDevise() {
      const firstDeviceId = this.videoInputDevices[0].deviceId;

      this.reader
        .decodeFromInputVideoDevice(firstDeviceId, "video")
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
      setTimeout(() => {
        this.$router.push("/");
      }, 300);
    },

    saveCode() {
      this.$db.qrcodes.add({
        code: this.qrcode.text,
        description: this.description,
        date: new Date().toISOString()
      });
      this.closePopUp();
    },

    close() {}
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
</style>