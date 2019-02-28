<style>
.yesno {
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	height: 500px
}				
</style>

<template>
	<div>
		<button @click="getAnswer">Random</button>
	
		<div class="yesno" v-bind:style="{ backgroundImage: 'url(' + obj.image + ')'} ">
			<h1>{{ obj.answer }}</h1>
		</div>
	
		<br><br>
		{{obj}}
	</div>
</template>

<script>
	export default {
		data() {
			return {
				obj: {
					answer: 'answer null',
					forced: 'forced null',
					image: ''
				}
			}
		},
		methods: {
			getAnswer: _.debounce(
			  function () {
				this.obj.answer = 'Đang suy nghĩ...'
				var vm = this.obj
				axios.get('https://yesno.wtf/api')
				  .then(function (response) {
					vm.answer = response.data.answer
					vm.forced = response.data.forced
					vm.image = response.data.image
				  })
				  .catch(function (error) {
					vm.answer = 'Lỗi! Không thể truy cập API. ' + error
				  })
			  }
			)
		}
	}
</script>
