<style scoped>
	.fade-enter {
		opacity: 0;
	}
	.fade-enter-active {
		transition: opacity 1s;
	}

	.fade-leave {
		opacity: 1
	}
	.fade-leave-active {
		transition: opacity 1s;
		opacity: 0
	}


	.slide-enter {
		opacity: 0
	}
	.slide-enter-active {
        transition: opacity .25s;
        animation: slide-innn .25s ease-out forwards;
	}

	.slide-leave {
	}
	.slide-leave-active {
        opacity: 0;
        transition: opacity .25s;
		animation: slide-outtt .25s ease-out forwards;
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
			transform: translateX(-100px);
		}
	}
</style>

<template>
<div class="container">
    <div class="row">
        <div class="col-lg-8" >
            <div class="alert alert-success animated" :class="typeAnimation">Animation Css</div>
            <div class="alert alert-success animated" :class="typeAnimation">Animation Css</div>
        </div>

        <select v-model="typeAnimation" class="form-control col-lg-4">
            <option 
                v-for="(item, index) in animationClasses" 
                :value="item"
                :key="index">
                    {{item}}
                </option>
        </select>
    </div>

    <div class="row mt-5">
        <div class="col-lg-4">
            <transition enter-class=""
                        enter-active-class="animated zoomIn"
                        leave-class=""
                        leave-active-class="animated zoomOut"  >
                <div    v-show="isShow" 
                        appear
                        class="alert alert-success">Animation Css</div>
            </transition>
        </div>
        <div class="col-lg-4">
            <transition :name="typeNameTransation" >
                <div    v-show="isShow" 
                        appear
                        class="alert alert-success">Transation Vue</div>
            </transition>
        </div>

        <div class="col-lg-4">
            <select v-model="typeNameTransation" class="form-control mb-3">
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
            </select>
            <button @click="isShow = !isShow" class="btn btn-success">Show / Hide</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data: function() {
        return {
            typeAnimation: 'zoomIn',
            animationClasses: ["bounce", "flash", "pulse", "rubberBand", "shake", "headShake", "swing", "tada"
                                , "wobble", "jello", "bounceIn", "bounceInDown"
                                , "bounceInLeft", "bounceInRight", "bounceInUp", "bounceOut"
                                , "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp"
                                , "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft"
                                , "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp"
                                , "fadeInUpBig", "fadeOut", "fadeOutDown", "fadeOutDownBig"
                                , "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig"
                                , "fadeOutUp", "fadeOutUpBig", "flipInX", "flipInY"
                                , "flipOutX", "flipOutY", "lightSpeedIn", "lightSpeedOut"
                                , "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft"
                                , "rotateInUpRight", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight"
                                , "rotateOutUpLeft", "rotateOutUpRight", "hinge", "jackInTheBox"
                                , "rollIn", "rollOut", "zoomIn", "zoomInDown"
                                , "zoomInLeft", "zoomInRight", "zoomInUp", "zoomOut"
                                , "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp"
                                , "slideInDown", "slideInLeft", "slideInRight", "slideInUp"
                                , "slideOutDown", "slideOutLeft", "slideOutRight", "slideOutUp"],

            typeNameTransation: 'fade',
            isShow: true
        }
    }
}
</script>

