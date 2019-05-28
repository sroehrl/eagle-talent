import neoan from '{{base}}/asset/neoanJs/neoan.js';

neoan.component('admin-settings',{
    template:document.querySelector('#admin-settings').innerHTML,
    data:{
        availableLanguages:[],
        newLanguage:''
    },
    loaded(){
        neoan.services.api.get('languages').then((data)=>{
            this.data.availableLanguages = data;
        })
    },
    updated(){
        this.iterator = document.querySelectorAll('.collapse');
        this.rendering();
    },
    postLanguage(body){
        neoan.services.api.post('languages',body).then((data)=>{
            this.data.newLanguage = '';
            this.data.availableLanguages = data;
            neoan.components.profile.forEach((entity)=>{
                entity.loaded();
            })
        })
    },
    saveNewLanguage(){
        this.adminSettingsPostLanguage({name:this.data.newLanguage});
    },
    saveNewAccent(){
        this.adminSettingsPostLanguage({
            languageId:this.data.availableLanguages[this.args]._id,
            name:this.data.newAccent
        });
    },
    deleteAccent(){
        let body = this.args;
        body.type = 'accent';
        neoan.services.api.delete('languages',body).then((data)=>{
            this.data.availableLanguages = data;
            neoan.components.profile.forEach((entity)=>{
                entity.loaded();
            })
        });
    },
    open(){
        $(this.iterator[this.args]).collapse('toggle');
        this.element.querySelectorAll('.has-accents').forEach((el)=>{
            let hasChild = el.querySelector('ul');
            if(hasChild){
                el.removeChild(hasChild);
            }
            let list = document.createElement('ul');
            this.data.availableLanguages[this.args].accents.forEach((accent,i)=>{
                let li = document.createElement('li');
                let deleteBtn = ` <button class="btn" 
                        data-click="deleteAccent({accent:${i},_id:${this.data.availableLanguages[this.args]._id}})">
                        <i  class="fas fa-times pointer"></i></button> `;
                li.innerHTML = accent.name + deleteBtn;
                list.append(li);
            });
            el.append(list);
            this.rendering()
        });
    }
});
