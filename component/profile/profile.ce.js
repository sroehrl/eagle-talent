import neoan from '{{base}}/asset/neoanJs/neoan.js';

const template =`
<div class="card">
        <img data-show="picture" class="card-img-top" data-src="picture" alt="profile picture">
        <div class="card-body">

            <div class="form-group custom-control-inline">
                <input type="file" class="form-control-file" >
                <button class="btn" data-click="forcer"><i class="fas fa-sync"></i></button>
            </div>
            <div class="form-group">
                <label>Name</label>
                <input class="form-control" type="text" data-bind="name">
            </div>
            <div class="form-group">
                <label>Gender</label>
                <select class="form-control" name="type" data-bind="gender">
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
            </div>
            <div class="form-group">
                <label>Type</label>
                <select class="form-control" name="type" data-bind="type">
                    <option value="voice">Voice</option>
                    <option value="video">Video</option>
                </select>
            </div>
            <div class="form-group">
                <label>File location <i class="fas fa-info-circle pointer" onclick="showToast()"></i></label>
                <input type="url" data-bind="fileLocation" class="form-control">
            </div>
            <div class="form-group">
                <label>Language</label>
                <select class="form-control" name="type" data-bind="language" data-for="languages">
                    <option>{{language.name}}</option>
                </select>
            </div>
            <button class="btn btn-success" data-click="save">
                <span data-show="_id">update</span><span data-hide="_id">save new profile</span>
            </button>
            <button class="btn btn-danger" data-show="_id" data-click="delete">delete</button>
        </div>

    </div>

`;

neoan.component('profile', {
    template: template,
    data: {
        languages: [],
        language: 'english',
        type: 'voice',
        gender: 'female',
        name:'',
        picture:false,
        force:false
    },
    save(){
        let data = this.data;
        neoan.services.api.post('profile',this.data).then((res)=>{
            data._id = res._id;
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
        this.rendering();
        neoan.services.api.get('languages').then((data)=>{
            this.data.languages = data;
        });
        this.pictureInput = this.element.querySelector('input[type="file"]');
        this.pictureInput.addEventListener('change',(ev)=>{
            this.updated();
        })
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
