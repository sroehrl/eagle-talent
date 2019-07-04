Vue.component('talentCard', {
    template: document.querySelector('#talentCard').innerHTML,
    data: function () {
        return {
            showModal: false
        }
    },
    props:[
        'profile'
    ],
    computed: {
        currentProfile: function () {
            return this.profile;
        },
    },
    methods: {
        toggleModal(){
            this.showModal = !this.showModal;
        }
    }
});
