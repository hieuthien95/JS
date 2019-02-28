<template>
    <div width="100%">
        <div class="progress" style="background: #28a74566">
            <div v-if="percentFunc > 0" class="progress-bar bg-success" :style="{width: percentFunc+'%', background: 'red'}">
                {{percentFunc}}%
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    props: ['orderDetail'],
    data: function() {
        return { }
    },
    computed: {
        percentFunc: function() {
            var percentTmp = 0;
            if (this.orderDetail.forWhat != null && this.orderDetail.forWhat != "") {
                percentTmp += 25;
            }
            if (this.orderDetail.teamSelected != null && this.orderDetail.teamSelected != "") {
                percentTmp += 25;
            }
            if (this.orderDetail.productSelected != null && this.orderDetail.productSelected.length != 0) {
                percentTmp += 25;
            }
            if (this.orderDetail.userSelected != null && this.orderDetail.userSelected != "") {
                percentTmp += 25;
            }

            return percentTmp;
        }
    }
}
</script>
