import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'
import NewRepo from './pages/NewRepo.vue'
import Repo from './pages/Repo.vue'
import App from './App.vue'
import store from './services/store'
import './index.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
	  { path: '/', component: Home },
	  { path: '/new_repo', component: NewRepo },
	  { path: '/:peer/:name', component: Repo, props: true },
	  { path: '/:peer/:name/:branch', component: Repo, props: true },
	  { path: '/:peer/:name/:branch/:path(.*)', component: Repo, props: true },
	], 
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
