<template>
    <div>
        <div class="station-indiv">
            <p :class="`title ${station.line}`">{{ station.name }}</p>
            <div class="timetable">
                <div>
                    <p class="timetable-header"> Inbound</p>
                    <ul>
                        <li v-for="schedule in station.schedules.filter(s => s.directionId == 0)" class="schedule">
                            {{ schedule.departureTime }}
                        </li>
                    </ul>
                </div>

                <div>
                    <p class="timetable-header"> Outbound</p>
                    <ul>
                        <li v-for="schedule in station.schedules.filter(s => s.directionId == 1)" class="schedule">
                            {{ schedule.departureTime }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <stations />
    </div>
</template>
<script>
import { mapState } from "vuex";
import Stations from '~/components/Stations.vue';

export default {
    name: "Station",

    data() {
        return {
            activeId: 1
        }
    },

    components: {
        Stations
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



<style lang="scss" scoped>

.station-indiv {
    min-height: 275px;
    border-bottom: 2px solid #f4f4f4;
}
.container {
  background-color: $white;
  border-radius: 15px 15px 0px 0px;
  width: 100%;
  margin-top: 15px;

  @media screen and (min-width: $sm) {
    display: flex;
    flex-wrap: wrap;
  }
}

.title {
  @include header;

  text-align: center;
  padding: 15px;
  text-decoration: underline;

   &.Orange {
     text-decoration-color: orange;
    }

 

  &.Red {
    text-decoration-color:  Red;
  }


  &.Blue {
    text-decoration-color: Blue;
  }

}

.timetable {
    display: flex;
    justify-content: space-around;
}

.timetable-header {
    @include header-3;
}

.schedule {
    @include header-4;
    padding: 10px 0;
}
    
</style>