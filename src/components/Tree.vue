<template>
	<ul class="w-full">
		<li class="px-4 dark:text-white" v-for="(entry, index) in entries">
			<router-link 
				class="flex items-center p-2 rounded-md" 
				v-bind:class="{'bg-white dark:bg-gray-800': index % 2}"
				v-bind:to="`/${this.path}/${entry.name}`"
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
</template>

<script>
import Icon from './Icon.vue'

export default {
	components: {
		Icon
	},
	props: {
		path: String,
		entries: Array
	}
}
</script>