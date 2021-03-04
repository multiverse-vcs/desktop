<template>
	<div class="flex items-center px-6 h-12">
		<!-- breadcrumbs -->
		<ol class="flex flex-1">
			<li>
			 	<router-link 
			 		v-bind:to="`/${peer}/${name}/${branch}`" 
			 		class="text-lg font-semibold dark:text-white"
			 	>
		 			{{ name }}
		 		</router-link>
			</li>
			<li v-for="(crumb, index) in breadcrumbs">
		 		<span class="mx-2 text-gray-400 text-lg">/</span>
			 	<router-link 
			 		v-bind:to="`/${peer}/${name}/${branch}/${breadcrumbs.slice(0, index + 1).join('/')}`" 
			 		class="text-lg font-semibold dark:text-white"
			 	>
		 			{{ crumb }}
		 		</router-link>
			</li>
		</ol>
		<!-- branches -->
		<Dropdown>
			<template v-slot:name>
				<Icon icon="git-branch" width="18" height="18" />
				<span class="text-md">{{ branch }}</span>
			</template>
			<template v-slot:menu>
				<router-link v-bind:to="`/${peer}/${name}/${b}/${path}`" class="block px-4 py-2 text-sm" v-for="b in branches">
					{{ b }}
				</router-link>
			</template>
		</Dropdown>
	</div>
	<!-- tree -->
	<ul class="w-full" v-if="file && file.is_dir">
		<li class="px-4 dark:text-white" v-for="(entry, index) in file.entries">
			<router-link 
				class="flex items-center p-2 rounded-md" 
				v-bind:class="{'bg-white dark:bg-gray-800': index % 2}"
				v-bind:to="treeLink(entry.name)"
			>
				<span class="text-blue-500" v-if="entry.is_dir">
					<Icon icon="folder" fill="currentColor" width="18" height="18" />
				</span>
				<span class="text-gray-400" v-if="!entry.is_dir">
					<Icon icon="file" width="18" height="18" />
				</span>
				<span class="ml-3">{{ entry.name }}</span>
			</router-link>
		</li>
	</ul>
	<!-- file -->
	<div class="code flex-1 overflow-auto rounded-md text-sm" v-if="file && !file.is_dir">
		<Highlight v-bind:code="file.content" />
	</div>
</template>

<style scoped>
.code {
	position: absolute;
	left: 17rem;
	right: 1rem;
	top: 5rem;
	bottom: 1rem;
}
</style>

<script>
import Dropdown from '../components/Dropdown.vue'
import Highlight from '../components/Highlight.vue'
import Icon from '../components/Icon.vue'
import rpc from '../services/rpc'

export default {
	components: {
		Dropdown,
		Highlight,
		Icon
	},
	props: {
		peer: String,
		name: String,
		path: String,
		repo: Object,
		branch: String
	},
	data() {
		return {
			file: null
		}
	},
	async created() {
		await this.fetchFile()
	},
	computed: {
		breadcrumbs() {
			return this.path.split('/')
		},
		branches() {
			return Object.keys(this.repo.branches)
		},
	},
	methods: {
		async fetchFile() {
			const remote = `${this.peer}/${this.name}`
			const branch = this.branch
			const path = this.path
			const res = await rpc('File.Search', [{ remote, branch, path }])
			this.file = res.result
		},
		treeLink(name) {
			const parts = [this.peer, this.name, this.branch, this.path, name]
			return '/' + parts.filter(p => p).join('/')
		}
	},
	watch: {
		peer: 'fetchFile',
		name: 'fetchFile',
		path: 'fetchFile',
		branch: 'fetchFile',
	}
}
</script>