<template>
	<ol class="flex flex-1">
		<li>
			<router-link 
		 		v-bind:to="rootLink()" 
		 		class="text-lg font-semibold dark:text-white"
		 	>
	 			{{ name }}
	 		</router-link>
		</li>
		<li v-for="(part, index) in parts">
	 		<span class="mx-2 text-gray-400 text-lg">/</span>
		 	<router-link 
		 		v-bind:to="partLink(index)" 
		 		class="text-lg font-semibold dark:text-white"
		 	>
	 			{{ part }}
	 		</router-link>
		</li>
	</ol>
</template>

<script>
export default {
	props: {
		name: String,
		root: String,
		path: String
	},
	computed: {
		parts() {
			return this.path.split('/').filter(val => val !== '')
		},
	},
	methods: {
		rootLink() {
			return `/${this.root}`
		},
		partLink(index) {
			return `/${this.root}/${this.parts.slice(0, index + 1).join('/')}`
		}
	}
}
</script>