<template>
	<div class="code flex-1 overflow-auto rounded-md prose-md" v-html="content">
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

.code >>> div {
	height: 100%;
}

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
export default {
	props: {
		content: String
	}
}
</script>