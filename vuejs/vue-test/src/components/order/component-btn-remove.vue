<template>
	<div>
		<input style="margin-top: 3px" class="btn btn-danger" type="button" @click="$emit('remove')" value="x" /> 
		{{valItem}}
	</div>
</template>

<script>	
	export default {
		props: ['valItem']
	}
</script>
