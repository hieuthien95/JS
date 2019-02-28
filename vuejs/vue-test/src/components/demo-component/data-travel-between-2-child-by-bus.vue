<template>
	<div>
	  <h4>Parent can affect all children</h4> 
	  <input v-model="nameInParent" />
	  <hr>

	  <h4>Child-1, using Bus to call $emit, notify Child-2 to change data</h4> 
	  <child-component-1 :nameToChild="nameInParent"></child-component-1>
	  <hr>

	  <h4>Child-2, using Bus to call $on, to hear notify form Child-1</h4> 
	  <child-component-2 :nameToChild="nameInParent"></child-component-2>
	</div>
</template>

<script>	
	import Vue from 'vue'
	const busEvent = new Vue();

	export default {
		data() {
			return {
				nameInParent: ""
			}
		}, 
		components: {
			'child-component-1': {
				template: `
					<span>
						<input v-model="nameToChild" />
						<button @click="changeNameFunc">
							Hey Neighbor
						</button>
					</span>
					`,
				props: ['nameToChild'],
				methods: {
					changeNameFunc: function() {
						busEvent.$emit('heyNeighborFunc', this.nameToChild)
					}
				}
			},

			'child-component-2': {
				template: `
					<span>
						<input v-model="nameToChild" />
					</span>
					`,
				props: ['nameToChild'],
				created: function() {
					busEvent.$on('heyNeighborFunc', (name) => {
						this.nameToChild = name
					});
				}
			}
		}
	}
</script>
