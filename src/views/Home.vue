<template>
  <div class="home">
    <div v-if="qrcodes.length">
      <ul class="qr-codes-list">
        <li class="qr-code-item" v-for="qrcode in qrcodes" :key="'qr'+qrcode.id">
          <div class="qr-code" v-html="getQrSvg(qrcode)">
          </div>
          <div class="qr-info">
            <strong v-text="qrcode.code"></strong>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="info">
      <h1>Welcome to QrDize</h1>
      <div>Start adding some Qr Codes</div>
    </div>

      <vs-button
        class="fab-button"
        radius
        size="large"
        color="primary"
        type="filled"
        icon="camera"
        @click="$router.push('/scanner')"
      ></vs-button>
  </div>
</template>

<script>
import { BrowserQRCodeSvgWriter } from "@zxing/library";

export default {
  name: "home",

  data() {
    return {
      qrcodes: []
    };
  },

  /**
   * Components methods
   */
  methods: {
    /**
     * Load qr codes from db
     */
    getQrCodes() {
      this.$db.qrcodes.toArray(qrcodes => {
        this.qrcodes = qrcodes;
      });
    },

    /**
     * Convert text to qr code
     */
    getQrSvg(text) {
      const writer = new BrowserQRCodeSvgWriter();
      return writer.write(text, 120, 120).outerHTML;
    }
  },

  /**
   * Component life cicle
   */
  mounted() {
    this.getQrCodes();
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 3px;
  .info {
    margin-top: 25vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .fab-button {
    position: fixed;
    bottom: 15px;
    right: 15px;
  }

  .qr-code-item {
    display: flex;
    border-bottom: 1px solid rgb(233, 233, 233);
    .qr-info {
      padding-top: 15px;
    }
  }
}
</style>

