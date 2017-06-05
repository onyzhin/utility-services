<template>
  <div class="content">
    <div class="md-display-1">Вода</div>
    <counter :previous="custom" :context="context"></counter>
    <rates :unit="unit" :context="context"></rates>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Counter from '@/components/Counter';
  import Rates from '@/components/Rates';

  @Component({
    components: {
      Counter,
      Rates,
    },
  })
  export default class Water extends Vue {
    custom = 2;
    unit = 'м<sup>3</sup>';
    context = 'WaterRates';
  }
</script>

<style lang="scss" scoped="true">
</style>
