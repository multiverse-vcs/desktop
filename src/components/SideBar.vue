<template>
	<div class="flex flex-shrink-0 flex-col w-64 bg-white dark:bg-gray-800 overflow-hidden">
		<div class="flex flex-1 flex-col pl-6 space-y-6 overflow-hidden">
			<div class="flex items-center space-x-2 mt-3 text-black dark:text-white">
				<h4 class="text-md font-medium">Repositories</h4>
				<router-link to="/new_repo" class="text-md">
					<Icon icon="plus" width="16" height="16" />
				</router-link>
			</div>
			<ul class="space-y-3 overflow-auto">
				<li class="flex items-center space-x-2 text-black dark:text-white" v-for="repo in repositories">
					<Icon icon="book" width="18" height="18" />
					<router-link v-bind:to="repoLink(repo)" class="w-full text-md">
						{{ repo }}
					</router-link>
				</li>
			</ul>
		</div>
		<div class="flex flex-shrink-0 items-center px-6 py-4">
			<Profile v-if="peerID" v-bind:peerID="peerID" />
		</div>
	</div>
</template>

<style scoped>
::-webkit-scrollbar {
	height: 0.5em;
	width: 0.5em;
}
 
::-webkit-scrollbar-track {
	border-radius: 0.375rem;
	background-color: #444;
}
 
::-webkit-scrollbar-thumb {
	border-radius: 0.375rem;
	background-color: #777;
}
</style>

<script>
import { mapState } from 'vuex'
import Icon from './Icon.vue'
import Profile from './Profile.vue'

export default {
	components: {
		Icon,
		Profile,
	},
	computed: mapState({
		peerID: 'peerID',
		repositories: 'repositories',
	}),
	methods: {
		repoLink(name) {
			return `/${this.peerID}/${name}`	
		}
	}
}
</script>