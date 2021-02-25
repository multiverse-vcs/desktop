<template>
	<button 
		v-bind:class="colors[color]"
		class="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md shadow-sm focus:outline-none">
		<slot></slot>
	</button>
</template>

<script>
export default {
	data() {
		return {
			colors: {
				'white': 'bg-white hover:bg-gray-200 text-black dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800',
				'green': 'bg-green-600 hover:bg-green-700 text-white'
			}
		}
	},
	props: {
		color: {
			type: String,
			default: 'white'
		}
	}
}
</script>