<style scoped src="./style-transation.css">
</style>
<style>
.fade-enter-active {
  transition: opacity 3s;
}
.fade-leave-active {
  transition: opacity 0s;
}
</style>

<template>
<transition name="fade">
	<div>
	  <h1>Lazy Sudoku</h1>

	  <button @click="shuffle">
		Shuffle
	  </button>
	  <transition-group name="cell" tag="div" class="contain">
		<div v-for="cell in cells" :key="cell.id" class="cell">
		  {{ cell.number }}
		</div>
	  </transition-group>
	
	</div>
</transition>
</template>

<script>
	export default {
		data() {
			return {
				cells: Array.apply(null, { length: 81 })
					.map(function (_, index) { 
					return {
						id: index,
						number: index % 9 + 1
					}
				})
			}
		},
		methods: {
			shuffle: function () {
				this.cells = _.shuffle(this.cells)
			}
		}
	}
</script>
