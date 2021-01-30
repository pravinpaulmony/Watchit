import Vue from 'vue';
import Vuex from 'vuex';

import { dataService } from '../shared';
import * as tvMazeApi from '../shared/api/tvMazeApi';

import {

  LOAD_TVSHOWS_SUCCESS,
  BEGIN_API_CALL,
  API_CALL_ERROR,

} from './mutation-types';


Vue.use(Vuex);

const state = () => ({
  tvShows: [],
  apiCallsInProgress: 0,
});

const mutations = {

  [LOAD_TVSHOWS_SUCCESS](state, tvShows){
    state.tvShows = tvShows;
  },
  
  [BEGIN_API_CALL](state) {
    state.apiCallsInProgress = state.apiCallsInProgress + 1;
  },
  [API_CALL_ERROR](state) {
    state.apiCallsInProgress = state.apiCallsInProgress - 1;
  },
  
};

const actions = {
  // actions let us get to ({ state, getters, commit, dispatch }) {

  async loadTvshowsAction({ commit }, query = '') {
    const tvShows = await tvMazeApi.getTVShowNames(query);
    let list=[];
    if(query!="")
    {
      tvShows.map(function(value, key) {
        if(value.show.name.toLowerCase().includes(query.toLowerCase()) === true){
          list.push(value);
        }
      });
      commit(LOAD_TVSHOWS_SUCCESS, list);
    }
    else{
      commit(LOAD_TVSHOWS_SUCCESS, tvShows);
    }
    
  },
};

const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
});
