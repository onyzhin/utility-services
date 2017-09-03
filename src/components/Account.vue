<template>
  <div class="content">
    <div class="md-display-1">Увійти</div>
    <md-layout md-gutter="16" md-align="center">
      <md-layout lg-flex="40">
        <form novalidate class="form">
          <md-input-container :class="[{ 'md-input-invalid' : false }]">
            <label>Email</label>
            <md-input v-model="email" type="email" required></md-input>
            <span class="md-error" v-if="false">{{}}</span>
          </md-input-container>
          <md-input-container>
            <label>Пароль</label>
            <md-input v-model="password" type="password" required></md-input>
          </md-input-container>          
          <div class="form-footer">
            <div class="form-footer-item">
              <md-button class="md-raised md-primary" type="submit" @click="signIn()">Увійти</md-button>
            </div>
            <div class="form-footer-item">        
              <span>Вперше тут? </span> <router-link to="signup">Зареєструватися</router-link>
            </div>    
          </div>
        </form>
      </md-layout>
    </md-layout>  

    <md-dialog ref="message">
      <md-dialog-title>
        <h4 :class="message.class"><md-icon>{{message.icon}}</md-icon>  {{message.description}}</h4>
      </md-dialog-title>
    </md-dialog>
  </div>
</template> 

<script>
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Account extends Vue {
    email = '';
    password = '';
    message = {};

    signIn() {
      this.$root.auth
        .signInWithEmailAndPassword(
          this.email.trim(),
          this.password,
        )
        .then((user) => {
          let { email, uid, refreshToken } = user;          
          this.$store.dispatch('signIn', { email, uid, refreshToken });
          this.$router.push({ name: 'services' });
        }).catch((error) => {
          this.openMessage({
            icon: 'warning',
            class: 'warning',
            description: error.message,
          });
        });
    }

    openMessage(settings) {
      this.message = settings;
      this.$refs.message.open();
    }

  }
</script>

<style lang="scss" scoped>
  $warning: #ff5722;
  $success: green;

  .form{
    max-width: 300px;
    margin: 0 auto;
    &-footer {
      text-align: left;
      &-item {
        margin-bottom: 1em;
      }
      .md-button {
        margin-left: 0;
      }
      span {
        margin-right: 5px;
      }
    }
  }

  .md-layout {
    form {
      width: 100%; 
    }
  }
  .md-input-container {
    margin-bottom: 20px;
  }

  .md-dialog {
    .md-icon {
      margin-right: 10px;
    }
    .md-title {
      h4 {
        margin: 0;
        font-size: 0.8em;
        text-align: center;
        &.warning {          
          color: $warning;
        }
        &.success {
          color: $success;
        }
      }
    }
  }
</style>
