import neoan from '{{base}}/asset/neoanJs/neoan.js';

neoan.useNeoanDirectives(['provide','for','showHide','click','src']);

neoan.component('neoan-talents',{
    // template:`<!--<div class="row voice-iterator" data-for="voices"><neoan-card class="col-4" data-provide="voices.$i"></neoan-card></div>-->`,
    template:`<div class="row card-iterator" ></div>`,
    data:{
        talents:[],
        tick:100,
        allTalents:[],
        chosenAccents: []
    },
    loaded(){
        let body = {
            gender:this.element.getAttribute('gender'),
            language:this.element.getAttribute('language')
        };
        neoan.services.api.get('{{contentType}}',body).then((talents)=>{
            this.data.allTalents = talents;
            this.setTalents();

        })
    },
    setTalents(){
        this.element.childNodes.forEach((child)=>{
            this.element.removeChild(child);
        });
        let cardTemplate = `<div class="row card-iterator">`;
        if(this.data.chosenAccents.length>0){
            this.data.talents = this.data.allTalents.filter((talent)=>{
                return this.data.chosenAccents.filter((chosen)=>{
                    return talent.accents.filter((accent)=>{
                        return accent.name === chosen.name;
                    }).length>0;
                }).length>0
            });
        } else {
            this.data.talents = this.data.allTalents;
        }
        this.data.talents.forEach((talent,i)=>{
            cardTemplate += `<neoan-card class="col-4 mb-4" data-provide="talents.${i}"></neoan-card>`
        });
        cardTemplate += '</div>';
        this.element.innerHTML = cardTemplate;
        neoan.cycle();
        this.rendering();

    },
    updated(){
        if(typeof this.data.formerAccents === 'undefined' || this.data.formerAccents.length !== this.data.chosenAccents.length){
            this.data.formerAccents = [...this.data.chosenAccents];
            this.setTalents();
            this.rendering();
        }
    }
});

neoan.component('neoan-card', {
    template: document.querySelector('#talent').innerHTML,
    data:{
        name:'loading',
        capitalizedName:'',
        location:'',
        loadedAudio:false,
        loadedVideo:false,
        ready:true,
        videoStream:''
    },
    play(){
        if(this.data._provided.type === 'voice'){
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
        } else {
            $('#'+this.data.loadedVideo).modal()
        }


    },
    loaded(){

    },
    updated(){
        if(typeof this.data._provided.type !== 'undefined'){
            if(this.data._provided.type === 'voice' && !this.data.loadedAudio){
                this.data.loadedAudio = true;
                this.audio = new Audio(this.data._provided.fileLocation);
            } else if(this.data._provided.type === 'video' && !this.data.loadedVideo){
                this.data.loadedVideo = Math.random().toString(36).substring(8);
                this.element.querySelector('.modal').setAttribute('id',this.data.loadedVideo);
                let channel = this.data._provided.fileLocation.substring(8,16);
                switch(channel){
                    case 'youtu.be':
                        this.data.videoStream = 'https://www.youtube.com/embed/'+this.data._provided.fileLocation.substring(17);
                        break;
                    case 'vimeo.co':
                        this.data.videoStream = 'https://player.vimeo.com/video/'+this.data._provided.fileLocation.substring(18);
                        break;
                }
            }
        }
    }
});
