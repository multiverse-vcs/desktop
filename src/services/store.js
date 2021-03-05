import { createStore, createLogger } from 'vuex'
import rpc from './rpc'

const state = () => ({
  error: null,
  following: [],
  peerID: null,
  repositories: [],
})

const mutations = {
  setPeerID(state, value) {
    state.peerID = value
  },
  setRepositories(state, value) {
    state.repositories = value
  },
  setFollowing(state, value) {
    state.following = value
  },
  setError(state, value) {
    state.error = value
  },
  addRepo(state, value) {
    state.repoList.push(value)
  },
}

const actions = {
  async fetchSelf({ commit }) {
    const res = await rpc('Author.Self', [])
    if (res.error) throw res.error
    commit('setPeerID', res.result.peerID)
    commit('setRepositories', Object.keys(res.result.author.repositories))
    commit('setFollowing', res.result.author.following)  
  },
}

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state,
  mutations, 
  actions
})