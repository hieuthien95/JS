<template>
	<li><button @click="$emit('remove')">x</button> {{ name }}</li>
</template>

<script>
	export default {
		props: ['name'],
		
		data: function() {
			return {};
		},
		computed: {},
		methods: {}
	}
</script>
