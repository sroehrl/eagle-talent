import neoan from '{{base}}/asset/neoanJs/neoan.js';
import '{{base}}/asset/neoanJs/directives/showHide.directive.js';
import '{{base}}/asset/neoanJs/directives/click.directive.js';
import '{{base}}/asset/neoanJs/directives/input.directive.js';

neoan.component('login',{
    data:{
        username:'',
        password:'',
        showError:false
    },
    loaded(){
        let attr = this.element.getAttribute('logged-in');
        this.data.isLoggedIn = attr === '1';
    },
    logout(){
        fetch('{{base}}/api.v1/logout').then((header)=>{
            return header.json();
        }).then(()=>{
            window.location.reload();
        })
    },
    doLogin(){
        if(this.data.username.length<2 ||this.data.password.length <2){
            alert('Please fill out the form');
            return;
        }
        fetch('{{base}}/api.v1/login',{method:'POST',body:JSON.stringify(this.data)}).then((header)=>{
            return header.json();
        }).then((res)=>{
            this.data.showError = res.error;
            if(!res.error){
                console.log('{{base}}');
                window.location.href = '{{base}}admin/';
            }
        })
    }
});
