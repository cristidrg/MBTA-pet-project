<template>
    <div>
        <nuxt-link to="/">Back</nuxt-link>

        <p>{{ station.name }}</p>
        <p>{{ station.line }}</p>
        <textarea>{{ station.schedules }} </textarea>
    </div>
</template>
<script>
import { mapState } from "vuex";

export default {
    name: "Station",

    data() {
        return {
            activeId: 1
        }
    },

    computed: {
        station () {
            return this.$store.state.stops[this.$route.params.id]
        }
    },

    // this.$route.params.id
    mounted() {
        console.log('cucu');
    },
    
    // If station id is not present in the store, show 404
    validate ({ params, store }) { 
        return store.state.stops[params.id];
    },

    fetch({ store, params, app}) {
        this.activeId = params.id
        return app.mbta.fetchSchedules({stop: params.id, sort: 'arrival_time', limit: 5})
            .then(response => response.data.map(({ attributes }) => ({
                arrivalTime: new Date(attributes.arrival_time).toLocaleString(),
                departureTime: new Date(attributes.departure_time).toLocaleString(),
                directionId: attributes.direction_id
            })))
            .then(schedules => store.commit('updateSchedules', {id: params.id, schedules}));
    }
}
</script>


