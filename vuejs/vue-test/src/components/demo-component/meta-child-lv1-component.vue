<template>
	<li>
		{{valu.name}}
		<ComponentMetaChildLv2 :valu2='valu.lit'></ComponentMetaChildLv2>
	</li>
</template>

<script>
	import ComponentMetaChildLv2 from './meta-child-lv2-component'
	
	export default {
	  props: ['valu'],
	  components: { ComponentMetaChildLv2 },
		
		data: function() {
			return {};
		},
		computed: {},
		methods: {}
	}
</script>
