<template>
	<div class="relative inline-block text-left">
		<div>
			<Button v-on:click="toggle" class="space-x-2">
				<slot name="name"></slot>
				<Icon icon="chevron-down" width="18" height="18" />
			</Button>
		</div>
		<div class="absolute origin-top-right right-0 mt-2 shadow-lg z-50" v-if="open">
			<div class="bg-white divide-y divide-gray-100 rounded-md w-48 dark:bg-gray-700 dark:text-white">
				<slot name="menu"></slot>
			</div>
		</div>
	</div>
</template>

<script>
import Button from './Button.vue'
import Icon from './Icon.vue'

export default {
	components: {
		Button,
		Icon,
	},
	data() {
		return {
			open: false
		}
	},
	methods: {
		toggle() {
			this.open = !this.open
		}
	}
}
</script>