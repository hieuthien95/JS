<template>
	<ol>
		<span :key="index" v-for='(it, index) in valu2'><li>{{it}}</li></span>
	</ol>
</template>

<script>
	export default {
		props: ['valu2'],
	
		data: function() {
			return {};
		},

		computed: {},
		
		methods: {}
	}
</script>
