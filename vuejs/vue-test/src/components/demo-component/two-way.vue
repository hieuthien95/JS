<template>
	<div>
	  <h4>Parent syncs to all Child, because they is using the same v-model</h4> 
	  <input v-model="nameInParent" />
	  <hr>

	  <h4>Child-1 does not sync to Parent, because it is using 'sync'</h4> 
	  <child-component-1 :nameToChild.sync="nameInParent"></child-component-1>
	  <hr>

	  <h4>Child-2 is affected by Parent's props, Parent is affected by $emit in Child-2 </h4> 
	  <child-component-2 v-model="nameInParent" :nameToChild="nameInParent"></child-component-2>
	  <hr>

	  <h4>Child-3 is affected by Parent, but it is not affected by Child-1</h4> 
	  <child-component-3 :nameToChild="nameInParent"></child-component-3>
	</div>
</template>

<script>
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
							Sync 2 ways
						</button>
					</span>
					`,
				props: ['nameToChild'],
				methods: {
					changeNameFunc: function() {
						this.$emit('update:nameToChild', this.nameToChild)
					}
				}
			},


			'child-component-2': {
				template: `
					<span>
						<input v-model="nameToChild" @input="changeNameFunc" />
					</span>
					`,
				props: ['nameToChild'],
				methods: {
					changeNameFunc: function() {
						this.$emit('input', event.target.value)
					}
				}
			},


			'child-component-3': {
				template: `
					<span>
						<input v-model="nameToChild" />
					</span>
					`,
				props: ['nameToChild']
			}
		}
	}
</script>
