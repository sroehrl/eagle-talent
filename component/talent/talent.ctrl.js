new Vue({
    el: '#talentContainer',
    data: {
        galleryData: [],
    },
    created() {
        this.getGallery();
    },
    methods: {
        getGallery(){
            axios.get('{{base}}/api.v1/videos', {params:{language: 'english', gender: 'female'}})
                .then(res=>{
                    this.galleryData = res.data;
                }).catch((error) => {
                    console.log(error);
                })
        }
    },
});
