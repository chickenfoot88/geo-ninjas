<template>
  <div id="app">
    <div id="nav">
      <the-navbar />
    </div>
    <router-view />
  </div>
</template>


<script>
import TheNavbar from '@/components/layout/TheNavbar'

export default {
  components: {
    TheNavbar,
  },
  data() {
    return {}
  },
}
</script>
<style>
  body {
    background-color: #f9f9f9;
  }
</style>
