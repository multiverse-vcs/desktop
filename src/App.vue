<template>
	<TitleBar />
	<Loading v-if="loading" />
	<div class="flex flex-1 overflow-hidden">
		<SideBar />
		<div class="flex-1 bg-gray-100 dark:bg-black overflow-hidden">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Loading from './components/Loading.vue'
import SideBar from './components/SideBar.vue'
import TitleBar from './components/TitleBar.vue'

export default {
	components: {
		Loading,
		SideBar,
		TitleBar
	},
	data() {
		return {
			cancel: null,
			loading: true,
		}
	},
	async created() {
		await this.fetchSelf()
  },
  beforeUnmount() {
  	clearTimeout(this.cancel)
  }
	methods: {
		async fetchSelf() {
			try {
				await this.$store.dispatch('fetchSelf')
				this.loading = false
			} catch (err) {
				this.cancel = setTimeout(this.fetchSelf, 10_000)
				this.loading = true
			}
		}
	},
};
</script>