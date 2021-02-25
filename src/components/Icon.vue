<template>
	<svg
		v-bind:width="width"
		v-bind:height="height"
		v-bind:fill="fill"
		v-bind:stroke="stroke"
		v-bind:stroke-width="strokeWidth"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<use v-bind:xlink:href="link" />
	</svg>
</template>

<script>
export default {
	props: {
		icon: String,
		width: {
			type: String,
			default: '24'
		},
		height: {
			type: String,
			default: '24'
		},
		fill: {
			type: String,
			default: 'none'
		},
		stroke: {
			type: String,
			default: 'currentColor'
		},
		strokeWidth: {
			type: Number,
			default: 2
		}
	},
	computed: {
		link() {
			return `/feather-sprite.svg#${this.icon}`
		}
	}
}
</script>