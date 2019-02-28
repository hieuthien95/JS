import {http} from '../util/my-common.js';

export var data = {
    userInfo: {
        username: '',
        name: '',
        permis: '',
    },

    // MIXIN
    // teamInit: [
    //     {name: '4.1'},
    //     {name: '4.2'},
    //     {name: '4.3'},
    //     {name: '4.4'},
    //     {name: '4.5'},
    //     {name: '4.6'}
    // ],

    listUserInit: [],
    yourUserInput: '',

    listProductInit: [],
    ProductInput: '',

    formOrderDetail: {
        forWhat: '',
        teamSelected: '',
        productSelected: [],
        userSelected: '',
        message: '',
    },

    formUser: {
        id: '',
        name: '',
        username: '',
        team: ''
    },

    formProduct: {
        id: '',
        name: '',
        price: ''
    }
}

export var computed = {
    computedListProduct: function () {
        var vm = this
        return this.listProductInit.filter(function (item) {
            return item.name.toLowerCase().indexOf(vm.ProductInput.toLowerCase()) !== -1
        })
    },
    computedListUser: function () {
        var vm = this
        return this.listUserInit.filter(function (item) {
            return item.name.match(vm.yourUserInput)
        })
    }
}

export var methods = {
    insertProductFunc: function() {
        http.post('product', {"name": this.formProduct.name, "price": this.formProduct.price})
            .then(response => {
                http.get('product').then(response => (this.listProductInit = response.data));
            }).catch((err) => {
                console.log(err)
            })
    },
    editProductFunc: function(id) {
        http.get('product/' + id)
            .then(response => 
                {
                    this.formProduct = response.data;
                }
            );
    },
    updateProductFunc: function(id) {
        http.put('product/' + id, JSON.stringify(this.formProduct))
            .then(response => {
                http.get('product').then(response => (this.listProductInit = response.data));
            }).catch((err) => {
                console.log(err)
            })
    },
    deleteProductFunc: function(obj, id) {
        // this.listProductInit.splice(obj, 1)
        http.delete('product/' + id)
            .then(response => {
                http.get('product').then(response => (this.listProductInit = response.data));
            }).catch((err) => {
                console.log(err)
            })
    },
    

    insertUserFunc: function() {
        http.post('user', {"name": this.formUser.name, "username": this.formUser.username, "team": this.formUser.team})
            .then(response => {
                http.get('user').then(response => (this.listUserInit = response.data));
            }).catch((err) => {
                console.log(err)
            })
    },
    editUserFunc: function(id) {
        http.get('user/' + id)
            .then(response => 
                {
                    this.formUser = response.data;
                }
            );
    },
    updateUserFunc: function(id) {
        http.put('user/' + id, JSON.stringify(this.formUser))
            .then(response => {
                http.get('user').then(response => (this.listUserInit = response.data));
            }).catch((err) => {
                console.log(err)
            })
    },
    deleteUserFunc: function(obj, id) {
        // this.listUserInit.splice(obj, 1)
        http.delete('user/' + id)
            .then(response => {
                http.get('user').then(response => (this.listUserInit = response.data));
            }).catch((err) => {
                console.log(err)
            })
    },


    insertOrderFunc: function() {
        var thiss= this;
        http.post('order', {
                "forwhat": this.formOrderDetail.forWhat, 
                "team": this.formOrderDetail.teamSelected,
                "username": this.formOrderDetail.userSelected, 
                "productname": JSON.stringify(this.formOrderDetail.productSelected)
            })
            .then(response => {
                thiss.formOrderDetail.message = "Thành công";
            })
            .catch((err) => {
                console.log(err)
            })
    },
    removeOrderProductFunc: function(obj) {
        this.formOrderDetail.productSelected.splice(obj, 1)
    },


    enterProductFunc: function(name) {
        this.formOrderDetail.productSelected.push(this.ProductInput);
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
}

export var mounted = function () {
    var thiss = this;
    axios.all([
        http.get('user'),
        http.get('product'),
        http.get('user/info-by-token') 

        ])        
        .then(axios.spread(function (userResponse, productResponse, userInfoResponse) {
            thiss.listUserInit = userResponse.data;
            thiss.listProductInit = productResponse.data;
            thiss.userInfo = userInfoResponse.data
        }));

            
    // axios.get('http://localhost:3000/product')
    //   .then(response => (this.listProductInit = response.data));
}
