<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Storage from './storage'
export default {
  name: 'app',
  data() {
    return {
      val: ''
    }
  },
  mounted() {
    this.val = Storage.getItem('b', 'user')
  }
}
</script>

<style>

</style>
