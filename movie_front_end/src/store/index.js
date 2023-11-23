import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/modules/user";
import app from "@/store/modules/app";
import settings from "@/store/modules/settings";
import tagsView from "@/store/modules/tagsView";
import permission from "@/store/modules/permission";

import getters from "@/store/getters";

Vue.use(Vuex)


const store = new Vuex.Store({
  modules:{
    user,
    app,
    settings,
    tagsView,
    permission
  },
  getters
})

export default store
