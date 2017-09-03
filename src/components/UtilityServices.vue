<template>
  <div>
    <md-toolbar class="md-warn">
      <div class="profile">
        <div class="profile-inner">
          <router-link to="account">
            <md-icon>account_circle</md-icon>           
            <p>{{profile.email}}</p>
          </router-link>
        </div>
      </div>

      <h2 class="md-title header-title" style="flex: 1">Utility Services</h2>

      <md-button @click.native="linkTo('water')">Water</md-button>
      <md-button @click.native="linkTo('electricity')">Electricity</md-button>
    </md-toolbar>

    <a @click="signOut()" v-if="isAuthenticated" class="signout"><md-icon>exit_to_app</md-icon>  Вийти</a>
    

    <router-view></router-view>

    <!--<h2>List of resources</h2>-->
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class UtilityServices extends Vue {    

    get isAuthenticated() {
      return this.$store.getters.isLoggedIn;
    }

    get profile() {
      return this.$store.getters.user;
    }

    signOut() {
      this.$store.dispatch('signOut');
      this.$router.push({ name: 'account' });
    }

    linkTo(path) {
      this.$router.push({ name: path });
    }
  }

</script>

<style lang="scss"  scoped="true">
  .signout {
    float: left;
    margin: 20px;
  }

  .profile {
    height: 64px; 
    border-right: 1px solid rgba(255, 255, 255, 0.4);
    margin-right: 20px;
    padding-right: 10px;
    display: flex;
    align-items: center; 

    .md-button {
      height: 30px;
      min-height: 30px;
    }
    p {
      margin: 0;
    }
    a:not(.md-button) {
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
      display: block;
      &:hover {
        color: rgba(255, 255, 255, 0.99);
      }
    }
  }
</style>
