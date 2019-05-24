import neoan from '{{base}}/asset/neoanJs/neoan.js';

neoan.component('neoan-voices',{
    template:`<div data-for="voices"><neoan-card data-provide="voices.$i"></neoan-card></div>`,
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
    template: `
                <div class="card-box">
                      <div class="card-title">
                        <h2>{{_provided.name}}</h2>
                        <p><br>
                        You'll find {{_provided.name}}'s audio sample below.&nbsp;Click the microphone icon to listen right now.</p>
                      </div>
                        <div class="card-link" align="center" >
                        <div class="animated bounce" >
                            <div class="animated bounce " style="color:#F5A102" data-click="play">
                                <i class="fas fa-microphone-alt fa-7x" data-show="ready"></i>
                                <i class="fas fa-pause fa-7x" data-hide="ready"></i>
                            </div>
                        </div>
                      </div>
                </div>`,
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
