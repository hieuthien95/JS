<template>
  <div>
	  	<!-- <router-view name="header-layout"> -->
		<header-layout/>

		<div class="container">
			<transition name="slide" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>
	
  </div>
</template>

<script>
	import HeaderLayout from './header.vue'

	export default {
		name: 'app',
		components: {
			'header-layout': HeaderLayout,
		}
	}
</script>

<style scoped>
	.slide-enter {
		opacity: 0;
		transform: translateX(100px)
	}
	.slide-enter-active {
    	transition: opacity .25s;
		animation: slide-innn .25s ease-out;
	}

	.slide-leave {
		opacity: 1;
		transform: translateX(0)
	}
	.slide-leave-active {
		opacity: 0;
		transition: opacity .25s ease-out;
		animation: slide-outtt .25s ease-out;
	}

	@keyframes slide-innn {
		0% {
			transform: translateX(-100px);
		}		
		100% {
			transform: translateX(0px);
		}
	}

	@keyframes slide-outtt {
		0% {
			transform: translateX(0px);
		}
		100% {
			transform: translateX(100px);
		}
	}
</style>
