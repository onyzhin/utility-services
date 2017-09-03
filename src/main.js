// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue';
import vuefire from 'vuefire';
import firebase from 'firebase';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import App from './App';
import router from './router';
import store from './store'

Vue.use(vuefire);
Vue.use(VueMaterial); 
let firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBtXurtvAjmp390_rnR_B8MWJJrTnEg4_M ',
  authDomain: 'utility-services.firebaseapp.com',
  databaseURL: 'https://utility-services.firebaseio.com',
  projectId: 'utility-services',
});
let auth = firebaseApp.auth();
let db = firebaseApp.database();


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
	data: {
		db,
		auth,
	},
});