<template>
	<div>
		<h3>Watcher</h3>
	  <p>
		Hãy hỏi một câu hỏi yes/no:
		<input v-model="question">
	  </p>
	  <h1>{{ answer }}</h1>
	  <img :src="image" width="100%" alt="hinh" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				question: '',
				answer: 'Không thể trả lời nếu bạn chưa đặt câu hỏi!',
				image: ''
			}
		},
		watch: {
			// bất cứ lúc nào data 'question' thay đổi, hàm 'question' bên dưới sẽ chạy
			// ten func 'question' phai trung voi ten data 'question'
			question: function (newQuestion, oldQuestion) {
			  this.answer = 'Đang chờ bạn đặt xong câu hỏi...';
				console.log('Đang chờ bạn đặt xong câu hỏi...');
			  this.getAnswer()
			}
		},
		methods: {
			// _.debounce là một hàm do Lodash cung cấp
			// Để tìm hiểu rõ hơn cách hoạt động của hàm này,
			// bạn có thể truy cập: https://lodash.com/docs#debounce 
			getAnswer: _.debounce(
			  function () {
				if (this.question.indexOf('?') === -1) {
				  this.answer = 'Câu hỏi thì thường chứa một dấu "?"'
					console.log('Câu hỏi thì thường chứa một dấu "?"');
				  return
				}
				this.answer = 'Đang suy nghĩ...'
					console.log('Đang suy nghĩ...');
				var vm = this
				axios.get('https://yesno.wtf/api')
				  .then(function (response) {
					vm.answer = _.capitalize(response.data.answer)
					vm.image = response.data.image
				  })
				  .catch(function (error) {
					vm.answer = 'Lỗi! Không thể truy cập API. ' + error
				  })
			  },
			  // Đây là thời gian (đơn vị mili giây) chúng ta đợi người dùng dừng gõ.
			  500
			)
		}
	}
</script>
