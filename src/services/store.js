import { createStore, createLogger } from 'vuex'
import rpc from './rpc'

const state = () => ({
  peerID: null,
  repoList: [],
  repo: null,
  file: null,
})

const mutations = {
  setPeerID(state, peerID) {
    state.peerID = peerID
  },
  setRepoList(state, list) {
    state.repoList = list
  },
  addRepo(state, name) {
    state.repoList.push(name)
  },
  setRepo(state, repo) {
    state.repo = repo
  },
  setFile(state, file) {
    state.file = file
  }
}

const actions = {
  async fetchSelf({ commit }) {
    const res = await rpc('Author.Self', [])
    commit('setPeerID', res.result.peerID)
  },
  async fetchRepoList({ commit }) {
    const res = await rpc('Repo.List', [])
    commit('setRepoList', res.result.repositories)
  },
  async fetchRepo({ commit }, path) {
    const res = await fetch(`${window.multiverse.httpURL}/${path}`)
    commit('setRepo', await res.json())
  },
  async fetchFile({ commit }, path) {
    const res = await fetch(`${window.multiverse.httpURL}/${path}?highlight=monokai`)
    const type = res.headers.get("Content-Type")

    if (type === "application/json") {
      commit('setFile', await res.json())
    } else {
      commit('setFile', await res.text())
    }
  }
}

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state,
  mutations, 
  actions
})