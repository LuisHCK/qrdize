<template>
  <div class="about">
    <h1>Made with ❤️ by Luis J. Centeno</h1>
    <div class="social-links">
      <a-button size="large" type="default" shape="circle" icon="github" @click="goto('github')"></a-button>
      <a-button size="large" type="default" shape="circle" icon="instagram" @click="goto('instagram')"></a-button>
      <a-button size="large" type="default" shape="circle" icon="twitter" @click="goto('twitter')"></a-button>
      <a-button size="large" type="default" shape="circle" icon="global" @click="goto('global')"></a-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goto(page) {
      switch (page) {
        case "github":
          this.openInNewTab("https://github.com/luishck");
          break;
        case "twitter":
          this.openInNewTab("https://twitter.com/luishck");
          break;
        case "instagram":
          this.openInNewTab("https://instagram.com/luishck");
          break;
        case "global":
          this.openInNewTab("https://luishck.github.io");
          break;

        default:
          break;
      }
    },

    openInNewTab(url) {
      var win = window.open(url, "_blank");
      win.focus();
    }
  }
};
</script>
<style scoped lang="scss">
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px;
  text-align: center;
  height: 60vh;
  h1 {
    color: rgb(51, 51, 51);
  }
  .social-links {
    padding-top: 60px;
    button {
      margin: 20px !important;
    }
  }
}

</style>
