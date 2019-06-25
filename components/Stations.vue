<template>
  <section class="container">
    <p class="title">{{ $t('stations.title') }}</p>
    <div class="filters">
      Showing stations from 
      <select-component
        @input="setLineFilter"
        class="filters__station"
        :value="lineFilter"
        :clearable="false"
        :searchable="false"
        :options="[ALL, ...LINES]"
      /> stations 
    </div>
 
    <ul class="list">
      <li v-for="stop in filteredStops" :class="`stop ${stop.line}`" :key="stop.name + stop.line">
        <nuxt-link class="link" :to="`/stations/${stop.id}`">{{ stop.name }}</nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from "vuex";
import SelectComponent from "vue-select";
import "vue-select/dist/vue-select.css";

const ALL = 'All';
const LINES = ['Orange', 'Red', 'Blue']; // TODO: Reuse constant from data

export default {
  name: "Stations",

  data() {
    return {
      lineFilter: ALL,
      LINES,
      ALL
    }
  },

  components: {
    SelectComponent
  },

  computed: {
    filteredStops() {
      if (this.lineFilter == ALL) {
        return Object.values(this.stops).sort((a,b) => a.name.localeCompare(b.name));
      } else {
        return Object.values(this.stops).filter(stop => stop.line == this.lineFilter)
          .sort((a,b) => a.order - b.order);
      }
    },

    ...mapState(['stops'])
  },

  methods: {
    setLineFilter(value) {
      this.lineFilter = value;
    }
  }
};
</script>

<style lang="scss" scoped>

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
}

.filters {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;

  &__station {
    min-width: 35px;
  }

  @media screen and (min-width: $sm) {
    margin-left: auto;
    margin-right: 15px;
    padding: 0;
  }
}

.list {
  padding: 5px 15px;

   @media screen and (min-width: $sm) {
    column-count: 4;
   }
}

.link {
  color: black;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}

.stop {
  @include header-3;
  display: inline-block;
  width: 100%;
  padding: 10px 0 10px 10px;

  &::before {
  }
  
  &.Orange {
    border-left: 5px solid orange;
  }

  &.Orange::before {
    border: 3px solid orange;
  }

  &.Red {
    border-left: 5px solid Red;
  }

  &.Red::before {
    border: 3px solid Red;
  }

  &.Blue {
    border-left: 5px solid Blue;
  }

  &.Blue::before {
    border: 3px solid Blue;
  }
}

</style>

<!-- Overrides for the plugin -->
<style lang="scss">
.filters {
  .vs__dropdown-toggle {
    border: none;
  }

  .vs__selected-options {
    justify-content: center;
    padding-left: 20px;
  }

  .vs__selected-options > .vs__search {
    position: absolute;
  }

  .vs__selected-options > .vs__search[aria-expanded="true"] {
    position: static;
  }

  .vs__actions {
    padding-right: 20px;
  }
}
</style>