<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style lang="scss">
  @import "~styles/base.scss";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .header-title {
    text-align: left;
  }

  .md-display-1 {
    margin-bottom: 30px;
  }

  ul {
    li {
      display: block;
    }
  }

  a {
    cursor: pointer;
  }
</style>
