<template>
  <section class="container">
      <p class="title">{{ $t('stations.title') }}</p>
      <div class="filters">
        <div class="line" />
        <p class="station-filter">ALL</p>
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
    }

    .station-filter {
        @include header;
        
        text-align: center;
        padding: 15px 35px;
    }
    
    .line {
        height: 4px;
        display: block;
        background-color: $gray01;
        width: 100%;
    }
</style>
