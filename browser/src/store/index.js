import Vue from 'vue'
import Vuex from 'vuex'
import menu_store from './menu_store'
import search_store from './search_store'
import user_store from './user_store'
Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        menu_store,
        search_store,
        user_store
    }
})
export default store;