<template>
	<div class="flex items-center px-6 h-12">
		<Breadcrumbs 
			v-bind:name="name" 
			v-bind:root="`${repoPath}/${branchPath}`" 
			v-bind:path="path" />

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
	<Tree v-bind:path="filePath" v-bind:entries="file" v-if="isDir" />
	<File v-bind:content="file" v-if="isFile" />
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue'
import Dropdown from '../components/Dropdown.vue'
import File from '../components/File.vue'
import Icon from '../components/Icon.vue'
import Tree from '../components/Tree.vue'
import rpc from '../services/rpc'

export default {
	components: {
		Breadcrumbs,
		Dropdown,
		File,
		Icon,
		Tree
	},
	props: {
		branch: String,
		peer: String,
		name: String,
		path: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			repo: null,
			file: null,
		}
	},
	async created() {
		await this.fetchRepo()
		await this.fetchFile()
	},
	methods: {
		async fetchRepo() {
			this.file = null
			const res = await fetch(`${window.multiverse.httpURL}/${this.repoPath}`)
   			this.repo = await res.json()
		},
		async fetchFile() {
			if (!this.branchPath) return

			const res = await fetch(`${window.multiverse.httpURL}/${this.filePath}?highlight=monokai`)
		    const type = res.headers.get("Content-Type")

		    if (type === "application/json") {
		      this.file = await res.json()
		    } else {
		      this.file = await res.text()
		    }
		}
	},
	computed: {
		branches() {
			return Object.keys(this.repo.branches)
		},
		branchPath() {
			return this.branch || this.repo && this.repo.default_branch
		},
		repoPath() {
			return `${this.peer}/${this.name}`
		},
		filePath() {
			return `${this.peer}/${this.name}/${this.branchPath}/${this.path}`
		},
		isDir() {
			return Array.isArray(this.file)
		},
		isFile() {
			return typeof this.file === 'string'
		}
	},
	watch: {
		repoPath: 'fetchRepo',
		filePath: 'fetchFile'
	}
}
</script>