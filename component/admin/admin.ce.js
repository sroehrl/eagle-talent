import neoan from '{{base}}/asset/neoanJs/neoan.js';
import '{{base}}/asset/neoanJs/directives/for.directive.js';
import '{{base}}/asset/neoanJs/directives/click.directive.js';
import '{{base}}/asset/neoanJs/directives/input.directive.js';
import '{{base}}/asset/neoanJs/directives/showHide.directive.js';
import '{{base}}/asset/neoanJs/directives/src.directive.js';

neoan.component('admin-view',{
    template:document.querySelector('#admin').innerHTML,
    data:{
        profileMode:true
    },
    loaded(){
        console.log('admin view');
        neoan.cycle();
        this.rendering();
    },
    showSettings(){
        this.data.profileMode = false;
    },
    newProfile(){
        this.data.profileMode = true;
        neoan.components.profile.forEach((profile)=>{
            delete profile.data._id;
            profile.data.picture = false;
            profile.data.name = 'New profile';
        })
    }
});
