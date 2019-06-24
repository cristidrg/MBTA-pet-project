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

<template>
  <section class="container">
    <p class="title">{{ $t('stations.title') }}</p>
    <div class="filters">
      <div class="line"/>

      <select-component
        @input="setLineFilter"
        class="filters__station"
        :value="lineFilter"
        :clearable="false"
        :searchable="false"
        :options="[ALL, ...LINES]"
      />
      <div class="line"/>
    </div>
 
    <ul>
      <li v-for="stop in filteredStops" :class="`stop ${stop.line}`" :key="stop.name + stop.line">
        <nuxt-link class="link" :to="`stations/${stop.id}`">{{ stop.name }}</nuxt-link>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>

.container {
  background-color: $white;
  border-radius: 15px 15px 0px 0px;
  width: 100%;
  margin-top: 15px;

  max-width: 500px; //TODO: Delete this line
}

.title {
  @include header;

  text-transform: uppercase;
  text-align: center;
  padding: 15px;
}

.filters {
  display: flex;
  align-items: center;

  &__station {
    @include header-2;
    min-width: 300px;
  }
}

.line {
  height: 4px;
  display: block;
  background-color: $gray01;
  width: 100%;
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

  display: flex;
  align-items: center;
  padding: 20px 25px 20px 35px;
  margin-left: 15px;

  &::before {
    content: '';
    background-color: white;
    display: block;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    position: absolute;
    left: 5px;
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