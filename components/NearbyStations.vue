<template>

</template>

<script>
export default {
    mounted() {
        navigator.geolocation.getCurrentPosition(this.setPosition, err => console.log(err), {enableHighAccuracy: true, timeout: 5000, maximumAge: 0});
    },
    methods: {
        setPosition(pos) {
            this.$store.commit('setUserPosition', {long: pos.longtitude, lat: pos.latitude});
        }
    }
}
</script>