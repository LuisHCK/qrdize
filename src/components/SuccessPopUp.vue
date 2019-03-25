<template>
  <div class="centerx">
    <vs-popup :title="'Code: ' + code" :active.sync="visible">
      <div class="code-container">
        <span class="code" v-html="getText(code.text)"></span>
        <div>
          <br>
          <vs-button color="primary" type="filled">Save QrCode</vs-button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
export default {
  name: "success-popup",

  props: ["code", "show"],

  data() {
    return {
      visible: false
    };
  },

  watch: {
    show(value) {
      this.visible = value;
    },
  },

  methods: {
    close() {
      this.$emit("close", false);
    },

    getText(text) {
      const isUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(text)
       if (isUrl) {
         return `<a href="${text}" target="_blank">${text}</a>`
       } else {
         return text
       }
    }
  }
};
</script>

<style scoped lang="scss">
.code-container {
  text-align: center;
  .code {
    font-size: 16pt;
  }
}
</style>