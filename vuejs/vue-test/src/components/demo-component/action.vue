<template>
	<div>
		Hay input va Enter: 
		<input v-model="newTodoText" @keyup.enter="clickFunc" /> - <span>{{newTodoText}}</span>

		<br>
		
		<h1>List Nomal</h1>
		<li v-for="(item, index) in items" :key="'A'+index">
			<button @click="removeIt(index)">x</button> {{item.name}}
		</li>
		
		<h1>List Component</h1>
		
		<ComponentActionChild
		  v-for="(item, index) in items"
		  v-bind:key="'B'+index"
		  v-bind:name="item.name"
		  v-on:remove="items.splice(index, 1)">
		</ComponentActionChild>
		
	</div>
</template>

<script>
	import ComponentActionChild from './action-component'
	
	export default {
		data() {
			return {
				newTodoText: 'show input here',
				items: [
					{id: 1, name: 'ca phe'},
					{id: 2, name: 'redbull'},
					{id: 3, name: 'tra sua'}
				]
			}
		},
		methods: {
			clickFunc: function(name) {
				this.items.push({
					id: 'x',
					name: this.newTodoText
				});
			},
			removeIt: function(index) {
				this.items.splice(index, 1);
			}
		},
		components: { ComponentActionChild },
		/*components: {
			'my-component': {
				template: '<li><button @click="$emit(\'remove\')">x</button> {{ name }}</li>',
				props: ['name']
			}
		}*/
	}
</script>
