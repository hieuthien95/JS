<template>
	<span>
		<span v-if="valUser.permis == 'admin'">
			<button class="btn btn-danger" @click="$emit('remove')">x</button>
			<button class="btn btn-warning" @click="$emit('edit')">e</button>
		</span>
		{{ valItem.name }} 

		<span v-if="valItem.price">
			- {{ valItem.price }} VNĐ
		</span>

	</span>
</template>

<script>	
	export default {
		props: ['valItem', 'valUser']
	}
</script>
