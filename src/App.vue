<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    this.getUser()
    this.getCartCount()
  },
  methods: {
    async getUser() {
      const userResult = await this.axios.get('/user');
      console.log(userResult)
    },
    async getCartCount() {
      const cartResult = await this.axios.get('/carts/products/sum');
      console.log(cartResult)
    }
  }
}
</script>

<style lang="scss">
@import '~assets/scss/reset.scss';
@import '~assets/scss/base.scss';
</style>
