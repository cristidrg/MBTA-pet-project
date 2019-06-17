<template>
  <section class="container">
    <stations />
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Stations from '~/components/Stations.vue'

export default {
  components: {
    Logo,
    Stations
  }
}
</script>

<style>
body {
  background-color: #f4f4f4;
}
</style>
