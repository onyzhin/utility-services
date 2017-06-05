<template>
  <div>
    <md-toolbar class="md-warn">
      <md-button class="md-icon-button" @click.native="linkTo('services')">
        <md-icon>home</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">Utility Services</h2>

      <md-button @click.native="linkTo('water')">Water</md-button>
      <md-button @click.native="linkTo('electricity')">Electricity</md-button>
    </md-toolbar>

    <router-view></router-view>

    <!--<h2>List of resources</h2>-->
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import VueMaterial from 'vue-material';
  import 'vue-material/dist/vue-material.css';

  Vue.use(VueMaterial);

  @Component
  export default class UtilityServices extends Vue {
    records = [];

    createRecord(custom) {
      this.records.push(custom);
    }

    getRecords() {
      return this.records;
    }

    linkTo(path) {
      this.$router.push({ name: path });
    }
  }


</script>

<style lang="scss">
  .md-display-1 {
    margin-bottom: 30px;
  }

  ul {
    li {
      display: block;
    }
  }
</style>
