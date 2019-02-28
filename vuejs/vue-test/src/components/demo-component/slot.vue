<template>
	<div>
		
	  Title in parent 
	  <h4>{{title}}</h4> 
	  <p>{{content}}</p>
	  <hr>

	  <child-component>
		  <h4 slot="title">{{title}}</h4>
		  <p>{{content}}</p>
	  </child-component>

	</div>
</template>

<script>	
	import Vue from 'vue'
	const busEvent = new Vue();

	export default {
		data() {
			return {
				title: "Car",
				content: "This is a content, under Title, using Slot"
			}
		}, 
		components: {
			'child-component': {
				template: `
					<span>
						Title in child

		  				<!-- The slot name -->
						<slot name="title"/>

		  				<!-- The slot default -->
						  <slot name="content">The slot default</slot>
						  
		  				<!-- The default slot -->
						<slot/>
					</span>
					`,
			},
		}
	}
</script>
