import Vue from 'vue';
import Router from 'vue-router';
import UtilityServices from '@/components/UtilityServices';
import Water from '@/components/Water';
import Electricity from '@/components/Electricity';
import Account from '@/components/Account';
import SignUp from '@/components/Signup';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'services',
      component: UtilityServices,
      children: [
        {
          path: '/water',
          name: 'water',
          component: Water,
        },
        {
          path: '/electricity',
          name: 'electricity',
          component: Electricity,
        },
        {
          path: '/account',
          name: 'account',
          component: Account,
        },
        {
          path: '/signup',
          name: 'signup',
          component: SignUp,
        },
      ],
    },    
  ],
});
