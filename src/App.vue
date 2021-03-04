<template>
	<TitleBar />
	<div class="flex flex-1 overflow-hidden">
		<SideBar />
		<div class="flex-1 bg-gray-100 dark:bg-black overflow-hidden">
  			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import SideBar from './components/SideBar.vue'
import TitleBar from './components/TitleBar.vue'

export default {
	components: {
		SideBar,
		TitleBar
	},
	methods: mapActions([
		'fetchSelf',
	]),
	created: async function() {
		await this.fetchSelf()
  	}
};
</script>