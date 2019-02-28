<template>
	<div>
		<h3>Computed</h3>
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
		computed: {
			// bất cứ lúc nào data ben trong ham thay doi, ham se dc chay
			// ten func setQuestion phai duoc goi {{setQuestion}} trong HTML
			setQuestion: function (newQuestion, oldQuestion) {
				this.question;
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
