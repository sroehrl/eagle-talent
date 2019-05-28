import neoan from '{{base}}/asset/neoanJs/neoan.js';

const template =document.querySelector('#profile').innerHTML;

neoan.component('profile', {
    template: template,
    data: {
        languages: [],
        language: 'english',
        accents:[],
        spokenAccents:[],
        type: 'voice',
        gender: 'female',
        name:'',
        picture:false,
        force:false,
        saved:false
    },
    save(){
        this.profileMatchAccents('up');
        let data = this.data;
        neoan.services.api.post('profile',this.data).then((res)=>{
            data._id = res._id;
            this.data.saved = true;
            setTimeout(()=>{
                this.data.saved = false
            },1500);
            neoan.components.profileList.forEach((entity)=>{
                entity.loaded();
            })
        })
    },
    delete(){
        let data = this.data;
        let really = confirm('are you sure?');
        if(really){
            neoan.services.api.delete('profile',this.data).then((res)=>{
                delete data._id;
                data.name = '';
                data.picture = false;
                neoan.components.profileList.forEach((entity)=>{
                    entity.loaded();
                })
            })
        }

    },
    loaded() {
        // this.rendering();
        neoan.services.api.get('languages').then((data)=>{
            this.data.languages = data;
        });
        this.pictureInput = this.element.querySelector('input[type="file"]');
        this.pictureInput.addEventListener('change',(ev)=>{
            this.updated();
        });


    },
    updated() {

        let picture = this.element.querySelector('input[type="file"]');
        if ('files' in picture && picture.files.length > 0 && this.data.picture === false) {
            if(picture.files[0].size > 126976){
                alert('Max. file size is 124KB')
            } else {
                this.profilePicture(picture.files[0]);
            }
        }
        this.data.languages.forEach((lang)=>{
            if(lang.name === this.data.language){
                this.data.availableAccents = lang.accents;
            }
        });
        this.profileMatchAccents('down');

    },
    matchAccents(direction){
        let accents = this.element.querySelectorAll('.accents');
        let spoken = [];
        accents.forEach((accentNode,i)=>{
            if(direction === 'down'){
                accentNode.checked = this.data.accents.filter((acc)=>{
                    return acc.name === this.data.availableAccents[i].name
                }).length>0
            } else {
                if(accentNode.checked){
                    spoken.push(this.data.availableAccents[i])
                }
            }
        });
        if(direction === 'up'){
            this.data.spokenAccents = spoken;
        }


    },
    forcer(){
         this.data.force = !this.data.force;
    },
    picture(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (function (data) {
            this.data.picture = data.target.result;
            this.rendering()
        }).bind(this);
    }
});
