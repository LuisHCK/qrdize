<template>
  <div class="home">
    <div v-if="qrcodes.length">
      <ul class="qr-codes-list">
        <li class="qr-code-item" v-for="qrcode in qrcodes" :key="'qr'+qrcode.id">
          <div class="qr-code" v-html="getQrSvg(qrcode.code)"></div>
          <div class="qr-info">
            <strong v-html="getCodeText(qrcode.code)"></strong>
          </div>
          <div class="qr-actions">
            <a-popconfirm
              placement="topRight"
              okText="Yes"
              cancelText="No"
              @confirm="deleteQrCode(qrcode.id)"
            >
              <template slot="title">
                <p>Do you whant to delete this Code?</p>
              </template>
              <a-button type="danger" shape="circle" icon="delete"></a-button>
            </a-popconfirm>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="info">
      <h1>Welcome to QrDize</h1>
      <div>Start adding some Qr Codes</div>
    </div>
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
      this.$db.qrcodes.reverse().toArray(qrcodes => {
        this.qrcodes = qrcodes;
      });
    },

    /**
     * Convert text to qr code
     */
    getQrSvg(text) {
      const writer = new BrowserQRCodeSvgWriter();
      return writer.write(text, 120, 120).outerHTML;
    },

    /**
     * Pare the scanned text
     */
    getCodeText(text) {
      const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      if (regexp.test(text)) {
        return `<a href="${text}" target="_blank">${text}</a>`;
      } else {
        return text;
      }
    },

    /**
     * Delete a QR code from db
     */
    deleteQrCode(qrCodeId) {
      this.$db.qrcodes
        .where("id")
        .equals(qrCodeId)
        .delete()
        .then(res => {
          // Reload qr codes
          this.getQrCodes();
        })
        .catch(err => {
          console.log(err);
        });
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

  .qr-codes-list {
    padding: 0;
    .qr-code-item {
      display: flex;
      border-bottom: 1px solid rgb(233, 233, 233);
      background-color: rgb(250, 250, 250);
      .qr-info {
        width: 100%;
        word-break: break-word;
        padding-top: 15px;
      }
      .qr-actions {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }
    }
  }
}
</style>

