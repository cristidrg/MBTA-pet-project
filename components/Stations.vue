<script>
import SelectComponent from "vue-select"
import 'vue-select/dist/vue-select.css';

export default {
    components: {
        SelectComponent
    }
}

</script>

<template>
  <section class="container">
      <p class="title">{{ $t('stations.title') }}</p>
      <div class="filters">
        <div class="line" />
        <select-component
            @input="e => e" 
            class="filters__station"
            value="ALL"
            :clearable="false"
            :searchable="false"
         />
        <div class="line" />
      </div>
  </section>
</template>
<style lang="scss" scoped>
    .container {
        background-color: $white;
        border-radius: 15px 15px 0px 0px;
        width: 100%;
        margin-top: 15px;
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

        .vs__selected-options > .vs__search[aria-expanded=true] {
            position: static;
        }

        .vs__actions {
            padding-right: 20px;
        }
    }
</style>