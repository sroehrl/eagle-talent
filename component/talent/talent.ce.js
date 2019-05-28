import neoan from '{{base}}/asset/neoanJs/neoan.js';

neoan.useNeoanDirectives(['provide','for','showHide','click','src']);

neoan.component('neoan-voices',{
    template:`<div class="row" data-for="voices"><neoan-card class="col-4" data-provide="voices.$i"></neoan-card></div>`,
    data:{
        voices:[],
        tick:100
    },
    loaded(){
        let body = {
            gender:this.element.getAttribute('gender'),
            language:this.element.getAttribute('language')
        };
        neoan.services.api.get('voices',body).then((voices)=>{
            this.data.voices = voices;
            neoan.cycle();
        })
    },
    updated(){
        setTimeout(()=>{
            this.data.tick = 501;
        },this.data.tick);
    }
});

neoan.component('neoan-card', {
    template: document.querySelector('#talent').innerHTML,
    data:{
        name:'loading',
        capitalizedName:'',
        location:'',
        loadedAudio:false,
        ready:true
    },
    play(){
        if(!this.data.loadedAudio){
            this.data.loadedAudio = true;
            this.audio = new Audio(this.data._provided.fileLocation);
        }
        if(!this.audio.paused){
            this.data.ready = true;
            this.audio.pause();
        } else {
            this.data.ready = false;
            this.audio.play();
        }
        this.rendering()

    },
    updated(){
        if(!this.data.loadedAudio){
            this.data.loadedAudio = true;
            this.audio = new Audio(this.data._provided.fileLocation);
        }
    }
});
