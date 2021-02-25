<template>
	<div class="flex-shrink-0 w-full h-12">
		<div class="flex items-center h-full w-full px-6">
			<h1 class="text-lg font-semibold">Create a new repository</h1>
		</div>
	</div>
	<form class="flex flex-col px-6 space-y-4 mt-4" v-on:submit="submit">
	    <div class="space-y-2 max-w-lg">
			<label for="name" class="block text-sm font-medium text-gray-700 dark:text-white">
				Name
			</label>
			<input 
				type="text" 
				v-model="name" 
				v-bind:disabled="loading"
				class="flex-1 block w-full min-w-0 rounded-md border-gray-300">
	    	<span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
	    </div>
	    <div>
		    <Button type="submit" color="green" v-bind:disabled="loading">
			  Create repository
			</Button>
	    </div>
	</form>
</template>

<script>
import Button from '../components/Button.vue'
import rpc from '../services/rpc'

export default {
	components: {
		Button,
	},
	data() {
		return {
			name: '',
			error: null,
			loading: false
		}
	},
	methods: {
		async submit() {
			this.loading = true
			this.error = null

			const res = await rpc('Repo.Create', [{name: this.name}])

			this.loading = false
			this.error = res.error

			if (res.result) {
				this.$store.commit('addRepo', this.name)
				console.log(res.result.remote)
				this.$router.push(`/${res.result.remote}`)
			}
		}
	}
}
</script>