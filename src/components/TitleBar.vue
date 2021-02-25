<template>
	<div class="flex flex-shrink-0 w-full h-8 bg-gray-100 dark:bg-black">
		<div class="w-64 flex-shrink-0 bg-white dark:bg-gray-800 drag"></div>
		<div class="flex-1 drag"></div>
		<div class="flex-shrink-0 flex items-center dark:text-gray-200" v-if="isWindows">
			<button class="w-12 h-8 flex items-center justify-center focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700" v-on:click="minimize">
				<Icon icon="minus" width="16" height="16" />
			</button>
			<button class="w-12 h-8 flex items-center justify-center focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700" v-on:click="maximize">
				<Icon icon="square" width="16" height="16" />
			</button>
			<button class="w-12 h-8 flex items-center justify-center focus:outline-none hover:bg-red-500" v-on:click="close">
				<Icon icon="x" width="16" height="16" />
			</button>
		</div>
	</div>
</template>

<style scoped>
	.drag {
		-webkit-app-region: drag;
	}
</style>

<script>
import Icon from './Icon.vue'

export default {
	components: {
		Icon
	},
	computed: {
		isWindows() {
			return window.electron.platform === 'win32'
		}
	},
	methods: {
		close() {
			window.electron.close()
		},
		minimize() {
			window.electron.minimize()
		},
		maximize() {
			window.electron.maximize()
		}
	}
}
</script>