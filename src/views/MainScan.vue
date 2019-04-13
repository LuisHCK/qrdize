<template>
  <div class="reader-page">
    <scanner ref="scannerComponent" :show-popup="showPopUp" @scan="processCode"/>

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
import Scanner from "@/components/Scanner.vue";

export default {
  name: "scanner-page",

  components: {
    Scanner
  },

  /**
   * Component data
   */
  data() {
    return {
      qrcode: {},
      showPopUp: false,
      description: undefined,
      activePrompt: false
    };
  },

  /**
   * Component methods
   */
  methods: {
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
      // re init reader
      this.$refs.scannerComponent.scanOk()
    },

    saveCode() {
      this.$db.qrcodes.add({
        code: this.qrcode.text,
        description: this.description,
        date: new Date().toISOString()
      });
      this.reader.stopStreams();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
</style>
