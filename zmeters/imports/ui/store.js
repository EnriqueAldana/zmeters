import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import auth from './modules/authentication';


Vue.use(Vuex);

const vuexLocal = new VuexPersist({
    storage: window.localStorage,
    modules: ['auth']
});

export default new Vuex.Store({
    modules: {
        auth
    },
    plugins:[vuexLocal.plugin]
});