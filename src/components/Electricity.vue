<template>
  <div class="content">
    <div class="md-display-1">Електрика</div>
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
  export default class Electricity extends Vue {
    custom = 10;
    unit = 'кВт/год';
    context = 'ElectricityRates';
  }
</script>

<style lang="scss">
</style>
