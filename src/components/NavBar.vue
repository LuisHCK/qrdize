<template>
  <div class="centerx">
    <vs-navbar
      v-model="indexActive"
      :color="colorx"
      text-color="rgba(255,255,255,.6)"
      active-text-color="rgba(255,255,255,1)"
      class="mainNavBar"
    >
      <div slot="title">
        <vs-navbar-title>QrDize</vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <a @click="$router.push('/')">Home</a>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a href="#">My Qr Codes</a>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a href="#">About</a>
      </vs-navbar-item>

      <vs-spacer></vs-spacer>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indexActive: 0,
      colorx: '#039BE5'
    }
  }
};
</script>

<style scoped lang="scss">
.mainNavBar {
  color: rgb(255,255,255)
}
</style>