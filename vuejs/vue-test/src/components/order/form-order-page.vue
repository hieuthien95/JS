<style>
/* .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all 8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
} */

ul, li {
	list-style: none;
	padding-left: 0
}
.container {
	padding-bottom: 30px
}
</style>

<template >
	<div class="container">
		<div class="row" style="padding: 0px 5px">
			<div  class="col-lg-9 col-md-9 col-sm-12 col-xs-12" ></div>
			<div  class="col-lg-3 col-md-3 col-sm-12 col-xs-12" style="padding: 30px; margin-bottom: 5px; background: #f9f9f9; border-radius: 5px">
				Name: {{userInfo.name | toUppercaseFilter }} <br>
				Username: {{userInfo.username | toUppercaseFilter }} <br>
				Permission: {{userInfo.permis | toUppercaseFilter }} <br>
				<button class="btn btn-success" @click="editUserFunc(userInfo.id)">Change info</button>
			</div>
		</div>

		<div class="row">
			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 30px; background: #f9f9f9; border-radius: 5px">
				<h1>Menu</h1>	
				<hr/>

				<h4>For what?</h4> 
				<textarea class="form-control" rows="3" v-model="formOrderDetail.forWhat"></textarea>
				<hr/>


				<h4>Team:</h4>
				<select class="form-control" v-model="formOrderDetail.teamSelected">
					<option v-for="(option, index) in teamInit" v-bind:value="option.name" :key="index">
						{{ option.name }}
					</option>
				</select>
				<hr/>


				<h4>List Name</h4>
				<input class="form-control" v-model="yourUserInput">
				<transition-group
					v-bind:css="true"
					v-on:before-enter="beforeEnter"
					v-on:enter="enter"
					v-on:leave="leave" >

					<li style="margin-top: 17px"
						v-for="(item, index) in computedListUser"
						v-bind:key="index">
						<input type="radio" v-model="formOrderDetail.userSelected" v-bind:value="item.username" /> 
						<component-2-btn
							v-bind:valItem="item"
							v-bind:valUser="userInfo"
							@remove="deleteUserFunc(index, item.id)"
							v-on:edit="editUserFunc(item.id)" >
						</component-2-btn>
					</li>
				</transition-group>
				<hr/>


				<h4>Food/Drink</h4>
				<input class="form-control" v-model="ProductInput" @keyup.enter="enterProductFunc">
				<transition-group
					v-bind:css="true"
					v-on:before-enter="beforeEnter"
					v-on:enter="enter"
					v-on:leave="leave" >

					<li style="margin-top: 17px"
						v-for="(item, index) in computedListProduct"
						v-bind:key="'PRODUCT' + index">
						<input type="checkbox" v-model="formOrderDetail.productSelected" v-bind:value="item.name"> 
						<component-2-btn
							v-bind:valItem="item"
							v-bind:valUser="userInfo"
							@remove="deleteProductFunc(index, item.id)"
							v-on:edit="editProductFunc(item.id)" >
						</component-2-btn>
					</li>
				</transition-group>
			</div>



			<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0px 5px">
				<form style="background: #e6e6e6; padding: 30px; margin-bottom: 5px; border-radius: 5px">
					<h1>Order detail</h1>	

					<b>It for:</b>
					<p style="white-space: pre">{{ formOrderDetail.forWhat }}</p>

					<b>Team:</b><br>
					{{ formOrderDetail.teamSelected }}
					<br>	
					
					<b>Member order:</b><br> 
					{{ formOrderDetail.userSelected }}
					<br>

					<b>Food:</b><br>
					<transition-group
						v-bind:css="true"
						v-on:before-enter="beforeEnter"
						v-on:enter="enter"
						v-on:leave="leave" >
					
						<li style="margin-top: 15px"
							v-for="(item, index) in formOrderDetail.productSelected"
							v-bind:key="'ORDER_PRODUCT' + index">
							
							<component-1-btn
								v-bind:valItem="item"
								v-on:remove="removeOrderProductFunc(index)">
							</component-1-btn>
						</li>
					</transition-group>
					<br/>
					
					<component-process-bar :orderDetail="formOrderDetail"></component-process-bar>

					
					<br>
					<input type="button" value="Submit" class="btn btn-success" @click="insertOrderFunc">
					<span style="color: red">{{formOrderDetail.message}}</span>
				</form>


				<form v-if="userInfo.permis == 'admin'" style="background: #e6e6e6; padding: 30px; margin-bottom: 5px; border-radius: 5px">
					<h1>User detail</h1>	

					<input class="form-control" type="text" v-model="formUser.name" placeholder="Name" />
					<br>
					<input class="form-control" type="text" v-model="formUser.username" placeholder="Username"  />
					<br/>
					<select class="form-control" v-model="formUser.team">
						<option v-for="(option, index) in teamInit" 
								v-bind:value="option.name" 
								:key="index">
							{{ option.name }}
						</option>
					</select>
					<br/>
					
					<input type="button" value="Insert" class="btn btn-success" @click="insertUserFunc">
					<input type="button" value="Update" class="btn btn-success" @click="updateUserFunc(formUser.id)">
				</form>


				<form v-if="userInfo.permis == 'admin'" style="background: #e6e6e6; padding: 30px; border-radius: 5px">
					<h1>Food detail</h1>

					<input class="form-control" type="text" v-model="formProduct.name" placeholder="Name" />
					<br>
					<input class="form-control" type="number" v-model="formProduct.price" placeholder="Price" />
					<br/>
					
					<input type="button" value="Insert" class="btn btn-success" @click="insertProductFunc">
					<input type="button" value="Update" class="btn btn-success" @click="updateProductFunc(formProduct.id)">
				</form>
			</div>
		</div>

	</div>
</template>

<script>
	// import * as mylib from './g-script';
	// export default {
	// 	data() {
	// 		return mylib.data
	// 	},
	// 	computed: mylib.computed,
	// 	methods: mylib.methods,
	// 	mounted: mylib.mounted,
	// 	components: {
	//		'component-1-btn': Component1Btn,
	//		'component-2-btn': Component2Btn,
	// 	},
	// }

	import {
		data as dt, computed as cptd, methods as mths, mounted as mtd
	} from './order-script';
	
	import Component1Btn from './component-btn-remove';
	import Component2Btn from './component-btn-remove-edit';

	import ComponentProcessBar from './component-process-bar';

	// MIXIN
	import { teamInitMixin } from '../util/storeMixin.js';

	export default {
		// MIXIN
		mixins: [ teamInitMixin ],
	
		data() {
			return dt
		},
		computed: cptd,
		methods: mths,
		mounted: mtd,
		components: {
			'component-1-btn': Component1Btn,
			'component-2-btn': Component2Btn,
			'component-process-bar' : ComponentProcessBar,
		},
	}

/* 
import GComponent1 from './g-item-order-component-1.vue';
import GComponent2 from './g-item-order-component-2.vue';

export default {
	data() {
		return {

			teamInit: [
				{name: '4.1'},
				{name: '4.2'},
				{name: '4.3'},
				{name: '4.4'},
				{name: '4.5'},
				{name: '4.6'}
			],

			listUserInit: [],
			yourUserInput: '',

			listProductInit: [],
			ProductInput: '',

			formOrderDetail: {
				forWhat: '',
				teamSelected: '',
				productSelected: [],
				userSelected: '',
			},

			formUser: {
				id: '',
				name: '',
				username: ''
			},

			formProduct: {
				id: '',
				name: ''
			}
		}
	},  
	components: {
	    'g-component-1': GComponent1,
	    'g-component-2': GComponent2,

	},
	computed: {
		computedListProduct: function () {
			var vm = this
			return this.listProductInit.filter(function (item) {
				return item.name.toLowerCase().indexOf(vm.ProductInput.toLowerCase()) !== -1
			})
		},
		computedListUser: function () {
			var vm = this
			return this.listUserInit.filter(function (item) {
				return item.name.toLowerCase().indexOf(vm.yourUserInput.toLowerCase()) !== -1
			})
		}
	},
	methods: {
		insertProductFunc: function() {
			axios.post('http://localhost:3000/product', {"name": this.formProduct.name})
				.then(response => {
					axios.get('http://localhost:3000/product').then(response => (this.listProductInit = response.data));
				}).catch((err) => {
					console.log(err)
				})
		},
		editProductFunc: function(id) {
	    	axios.get('http://localhost:3000/product/' + id)
				.then(response => 
					{
						this.formProduct = response.data;
					}
				);
		},
		updateProductFunc: function(id) {
			axios.put('http://localhost:3000/product/' + id, {"name": this.formProduct.name})
				.then(response => {
					axios.get('http://localhost:3000/product').then(response => (this.listProductInit = response.data));
				}).catch((err) => {
					console.log(err)
				})
		},
		deleteProductFunc: function(obj, id) {
			// this.listProductInit.splice(obj, 1)
			axios.delete('http://localhost:3000/product/' + id)
				.then(response => {
					axios.get('http://localhost:3000/product').then(response => (this.listProductInit = response.data));
				}).catch((err) => {
					console.log(err)
				})
		},
        

		insertUserFunc: function() {
			axios.post('http://localhost:3000/user', {"name": this.formUser.name, "username": this.formUser.username})
				.then(response => {
					axios.get('http://localhost:3000/user').then(response => (this.listUserInit = response.data));
				}).catch((err) => {
					console.log(err)
				})
		},
		editUserFunc: function(id) {
	    	axios.get('http://localhost:3000/user/' + id)
				.then(response => 
					{
						this.formUser = response.data;
					}
				);
		},
		updateUserFunc: function(id) {
			axios.put('http://localhost:3000/user/' + id, {"name": this.formUser.name, "username": this.formUser.username})
				.then(response => {
					axios.get('http://localhost:3000/user').then(response => (this.listUserInit = response.data));
				}).catch((err) => {
					console.log(err)
				})
		},
		deleteUserFunc: function(obj, id) {
			// this.listUserInit.splice(obj, 1)
			axios.delete('http://localhost:3000/user/' + id)
				.then(response => {
					axios.get('http://localhost:3000/user').then(response => (this.listUserInit = response.data));
				}).catch((err) => {
					console.log(err)
				})
		},


		insertOrderFunc: function() {
			axios.post('http://localhost:3000/order', {
					"forwhat": this.formOrderDetail.forWhat, 
					"username": this.formOrderDetail.userSelected, 
					"team": this.formOrderDetail.teamSelected,
					"productname": this.formOrderDetail.productSelected
				})
				.then(response => {})
				.catch((err) => {
					console.log(err)
				})
		},


		enterProductFunc: function(name) {
			this.formOrderDetail.productSelected.push(this.ProductInput);
		},
		removeOrderProductFunc: function(obj) {
			this.formOrderDetail.productSelected.splice(obj, 1)
		},


		randomIndex: function () {
			return Math.floor(Math.random() * this.items.length)
		},
		add: function () {
			this.items.splice(this.randomIndex(), 0, this.nextNum++)
		},
		remove: function () {
			this.items.splice(this.randomIndex(), 1)
		},
		beforeEnter: function (el) {
			el.style.opacity = 0
			el.style.height = 0
		},
		enter: function (el, done) {
			var delay = el.dataset.index * 150
			setTimeout(function () {
				Velocity(
					el,
					{ opacity: 1, height: '1.6em' },
					{ complete: done }
				)
			}, delay)
		},
		leave: function (el, done) {
			var delay = el.dataset.index * 150
			setTimeout(function () {
				Velocity(
					el,
					{ opacity: 0, height: 0 },
					{ complete: done }
				)
			}, delay)
		}
	},
	mounted () {
		var thiss = this;
		axios.all([
				axios.get('http://localhost:3000/user'),
				axios.get('http://localhost:3000/product'),
			])
			.then(axios.spread(function (userResponse, productResponse) {
				thiss.listUserInit = userResponse.data;
				thiss.listProductInit = productResponse.data;
			}));

	    // axios.get('http://localhost:3000/user')
		// 		.then(response => (this.listUserInit = response.data));
                
	    // axios.get('http://localhost:3000/product')
	    //   .then(response => (this.listProductInit = response.data));
	}
} 
*/
</script>

