/* eslint-disable no-shadow, no-param-reassign */

import { setUserInfo, getUserInfo } from '../../services/localstorage';

const state = {
  loggedIn: !!Object.keys(getUserInfo()).length,
  profile: getUserInfo(),
};

const getters = {
  isLoggedIn: () => state.loggedIn,
  user: () => state.profile,
};

const mutations = {
  login(state) {
    state.loggedIn = true;
  },
  logout(state) {
    state.profile = {};
    state.loggedIn = false;
  },
  setProfile(state, payload) {
    state.profile = payload;
    console.log(payload);
  },
};

const actions = {
  signIn(context, payload) {
    setUserInfo(payload);
    context.commit('login');
    context.commit('setProfile', payload);
  },
  signUp(context, payload) {
  },
  signOut(context) {
    setUserInfo({});
    context.commit('logout');
  },
  getProfile(context) {
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
