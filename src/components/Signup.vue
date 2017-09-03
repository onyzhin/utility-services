<template>
  <div class="content">
    <div class="md-display-1">Реєстрація</div>
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
          <md-input-container>
            <label>Повторіть пароль</label>
            <md-input v-model="copyPassword" type="password" required></md-input>
          </md-input-container>          
          <div class="form-footer">
            <div class="form-footer-item">
              <md-button class="md-raised md-primary" 
                :class="[{ 'disable' : !checkPassword }]" 
                type="submit" 
                @click="signUp()">
                Створити аккаунт
              </md-button>
            </div>
            <div class="form-footer-item">        
              <span>Вже є аккаунт? </span> <router-link to="account">Увійти</router-link> 
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
  export default class SignUp extends Vue {
    email = '';
    password = '';
    copyPassword = '';
    message = {};
    signUp() {
      this.$root.auth
        .createUserWithEmailAndPassword(
          this.email, 
          this.password,
        )
        .then((user) => {          
          this.openMessage({
            icon: 'done',
            class: 'success',
            description: 'Успішно зареєстровано!',
          });          
        })
        .catch((error) => {
          this.openMessage({
            icon: 'warning',
            class: 'warning',
            description: error.message,
          });
        });
    }

    get checkPassword() {
      return (this.password === this.copyPassword);
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
        &.disable {
          opacity: 0.4;
          z-index: -1;
        }
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
