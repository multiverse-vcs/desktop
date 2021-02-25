<template>
	<div class="relative inline-block text-left">
		<div>
			<button v-on:click="toggle" type="button" class="inline-flex space-x-2 items-center w-full rounded-md p-2 font-medium hover:bg-gray-50 focus:outline-none">
				<slot name="name"></slot>
				<Icon icon="chevron-down" width="18" height="18" />
			</button>
		</div>
		<div class="absolute origin-top-right right-0 rounded-md shadow-lg bg-white divide-y divide-gray-100 w-48 z-50" v-if="open">
			<slot name="menu"></slot>
		</div>
	</div>
</template>

<script>
import Icon from './Icon.vue'

export default {
	components: {
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