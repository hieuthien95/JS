<template>
    <div>
        <h1>VUEX</h1>
        count: {{ countByState }} <br>
        <button @click="countState">Increate</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    methods: {
        countState: function() {
            this.$store.state.count++;
        },
        // ...mapState([
        //     // map this.count to store.state.count
        //     'count'
        // ])
    },
    computed: {
        countByState: function() {
            return this.$store.state.count
        }
    }
    
}
</script>

<style>

</style>
