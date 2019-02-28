

<style>
    .do {
        background-color: red;
    }
    .xanh {
        background-color: green;
    }

</style>
<template>
  <div class="container">
    <div class="row">

        <div class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-12 col-xs-12" align="center" 
            style="padding:30px; margin-top: 60px; border: solid 1px #ddd; border-radius: 15px">

            <span style="color: red">{{ errorss.loginFail }}</span>

            <input class="form-control" type="text" v-model="dataLogin.username" placeholder="Username" @keyup.enter="Login" /> 
            <span style="color: red">{{ errorss.username }}</span>

            <br>
            
            <input class="form-control" type="password" v-model="dataLogin.password" placeholder="Password" @keyup.enter="Login" /> 
            <span style="color: red">{{ errorss.password }}</span>

            <br>

            <input type="button" value="Submit" class="btn btn-success" @click="Login">
            
        </div>

    </div>
  </div>
</template>

<script>
import {http} from '../util/my-common.js';
import * as CONST from '../util/const.js';

export default {
    data() {
        return {
            dataLogin: {
                username: '',
                password: ''
            },

            errorss: {
                username: '',
                password: '',
                loginFail: ''
            },
        }
    },

    computed: {
    },

    methods: {
        Login: function() {
            
            var errFlg = false;

            if (!this.dataLogin.username) {
                this.errorss.username = 'Username required.';
                errFlg = true;
            }
            if (!this.dataLogin.password) {
                this.errorss.password = 'Password required.';
                errFlg = true;
            }
            if (errFlg) {
                return;
            } else {
                this.errorss.username = '';
                this.errorss.password = '';
            }

            http.post('user/login', { "username": this.dataLogin.username, 'password': this.dataLogin.password })
                .then(response => {
                    localStorage.setItem(CONST.HTTP_ACCESS_TOKEN, response.data.token)
                    // this.$router.push({ name: 'Form_Order' });
                    this.$router.push(this.$route.query.redirect);
                }).catch((err) => {
                    // console.log(err)
                    this.errorss.loginFail = err.response.data.message
                })
        }
    },
    beforeCreate() {
        if (localStorage.getItem(CONST.HTTP_ACCESS_TOKEN)) {
            this.$router.back();
            // this.$router.back();
        }
    }

}
</script>
