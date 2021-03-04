<template>
	<pre class="h-full"><code class="h-full">{{ code }}</code></pre>
</template>

<style>
::-webkit-scrollbar {
	height: 0.5em;
	width: 0.5em;
}
 
::-webkit-scrollbar-track {
	border-radius: 0 0.375rem 0.375rem 0;
	background-color: #444;
}
 
::-webkit-scrollbar-thumb {
	border-radius: 0.375rem;
	background-color: #777;
}
</style>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export default {
	props: {
		code: String
	},
	mounted() {
		this.highlight()
	},
	methods: {
		highlight() {
			hljs.highlightAll()
		}
	},
	watch: {
		code: 'highlight'
	}
}
</script>