<template>
	<div>
		<h1>{{newTodoText}}</h1>
		<span v-for="(item, index) in items" :key="index">
			<ComponentMetaChildLv1 :valu="item">
			</ComponentMetaChildLv1>
		</span>
	</div>
</template>

<script>
	import ComponentMetaChildLv1 from './meta-child-lv1-component'
	
	export default {
		data() {
			return {
				newTodoText: 'Meta menu',
				items: [
					{id: 1, name: 'ca phe', lit: ['Den', 'Sua']},
					{id: 2, name: 'redbull', lit: ['VN', 'Thai Lan']},
					{id: 3, name: 'tra sua', lit: ['Gongcha', 'Phuc Long']}
				]
			}
		}, 
		components: { ComponentMetaChildLv1 }
	}
</script>
