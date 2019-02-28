
<template>
  <div class="container">
    <div class="row">

        <div class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-12 col-xs-12" align="center" 
            style="padding:30px; margin-top: 60px; border: solid 1px #ddd; border-radius: 15px">


            <input class="form-control mb-1" type="text" v-model="user.name" placeholder="Name" /> 
            <input class="form-control mb-1" type="text" v-model="user.username" placeholder="Username" /> 
            <input class="form-control mb-1" type="password" v-model="user.password" placeholder="Password"/>  
            
            <select v-model="user.team" class="form-control mb-1">
                <option v-for="(team, index) in teamInit"
                        :key="index" :value="team.name">
                        {{team.name}}
                </option>
            </select>
            
            <select v-model="user.permis" class="form-control mb-1">
                <option v-for="(permis, index) in permitInit"
                        :key="index" :value="permis.name">
                        {{permis.name}}
                </option>
            </select>

            <br>

            <input type="button" value="Submit" class="btn btn-success" @click="regist">

            <li v-for="(user, index) in users" :key="index">{{user.username}}</li>
        </div>

    </div>
  </div>
</template>

<script>
    import {http} from '../util/my-common.js';
    import * as CONST from '../util/const.js';

    import { teamInitMixin, permisMixin } from '../util/storeMixin.js'
    export default {

        mixins: [ teamInitMixin, permisMixin ],

        data() {
            return {
                user: {
                    username: '',
                    name: '',
                    password: '',
                    permis: '',
                    team: '',
                    token: '',
                    ip: ''
                }, 
                users: []
            }
        },
        methods: {
            regist: function() {
                http.post('user.json', this.user)
                    .then(response => {
                        this.$router.push({ name: 'Form_Regist' });
                        console.log("Success");
                        
                        localStorage.setItem(CONST.HTTP_ACCESS_TOKEN, response.data.token)
                        this.$router.push({ name: 'Form_Order' });
                    }).catch((err) => {
                        console.log(err)
                    })
            
                // http.post('user', {"name": this.user.name, "username": this.user.username, "team": this.user.team})
                // .then(response => {
                //     console.log(response.data)
                // }).catch((err) => {
                //     console.log(err)
                // })
            }
        },
        mounted() { 
            axios.get('https://vue-thien-bh.firebaseio.com/user.json')
              .then(response => (this.users = response.data));
        }
        
    }
</script>
