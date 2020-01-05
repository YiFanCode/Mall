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
      const userResult = await this.axios.get('/user')
      this.$store.dispatch('saveUserName', userResult.username || {})
    },
    async getCartCount() {
      const cartResult = await this.axios.get('/carts/products/sum');
      this.$store.dispatch('saveCartCount', cartResult || 0)
    }
  }
}
</script>

<style lang="scss">
@import '~assets/scss/reset.scss';
@import '~assets/scss/base.scss';
</style>
