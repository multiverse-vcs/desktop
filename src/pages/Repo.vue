<template>
	<Code 
		v-bind:peer="peer" 
		v-bind:name="name" 
		v-bind:path="path" 
		v-bind:repo="repo"
		v-bind:branch="branch || repo.default_branch"
		v-if="repo" />
</template>

<script>
import Code from './Code.vue'
import rpc from '../services/rpc'

export default {
	components: {
		Code
	},
	props: {
		peer: String,
		name: String,
		path: {
			type: String,
			default: ''
		},
		branch: String,
	},
	data() {
		return {
			repo: null,
		}
	},
	async created() {
		await this.fetchRepo()
	},
	methods: {
		async fetchRepo() {
			const remote = `${this.peer}/${this.name}`
			const res = await rpc('Repo.Search', [{ remote }])
			this.repo = res.result.repository
		}
	},
	watch: {
		peer: 'fetchRepo',
		name: 'fetchRepo'
	}
}
</script>