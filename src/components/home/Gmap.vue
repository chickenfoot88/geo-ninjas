<template>
  <div class="map">
    <div class="google-map" id="map" ref="map"></div>
  </div>
</template>
<script>
export default {
  name: 'Gmap',
  data() {
    return {
      lat: 53,
      lng: -2
    }
  },
  mounted() {
    this.renderMap()
  },
  methods: {
    renderMap() {
      const mapEl = this.$refs.map
      // eslint-disable-next-line no-undef, no-unused-vars
      const map = new google.maps.Map(mapEl, {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      })
    }
  }
}
</script>
<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  right: 0;
  left: 0;
}
</style>
