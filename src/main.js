// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vuex from 'vuex';
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient, appOptions }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.use(Vuex);

  appOptions.store = new Vuex.Store({
    state: {
      activeCountry: {}
    },
    mutations: {
      setActiveCountry (state, payload) {
        console.log('setting active country', payload);
        state.activeCountry = payload;
      }
    }
  });
}
