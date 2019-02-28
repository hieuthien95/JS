export const teamInitMixin = {
    data: function() {
        return {
            teamInput: '',
            teamInit: [
                {name: '4.1 - Team anh Quân'},
                {name: '4.2 - Team anh Toàn'},
                {name: '4.3 - Team Dũng'},
                {name: '4.4 - Team anh Phú'},
                {name: '4.5 - Team anh Thiện'},
                {name: '4.6 - team Huy'},
                {name: '4.6 - team anh Trang'}
            ],
        }
    },
    computed: {
        teamInitCpt: function() {
            var vm = this;
            return this.teamInit.filter(function (item) {
                return item.name.match(vm.teamInput);
            });  
        }
    }

}

export const permisMixin = {
    data: function() {
        return {
            permitInit: [
                {name: 'admin'},
                {name: 'content'},
                {name: 'customer'},
            ],
        }
    }
}
