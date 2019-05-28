import neoan from '{{base}}/asset/neoanJs/neoan.js';

neoan.useNeoanDirectives(['provide','for','showHide','click','src']);

neoan.component('neoan-voices',{
    // template:`<!--<div class="row voice-iterator" data-for="voices"><neoan-card class="col-4" data-provide="voices.$i"></neoan-card></div>-->`,
    template:`<div class="row voice-iterator" ></div>`,
    data:{
        voices:[],
        tick:100,
        allVoices:[],
        chosenAccents: []
    },
    loaded(){
        let body = {
            gender:this.element.getAttribute('gender'),
            language:this.element.getAttribute('language')
        };
        neoan.services.api.get('voices',body).then((voices)=>{
            this.data.allVoices = voices;
            this.setVoices();

        })
    },
    setVoices(){
        this.element.childNodes.forEach((child)=>{
            this.element.removeChild(child);
        });
        let cardTemplate = `<div class="row voice-iterator">`;
        if(this.data.chosenAccents.length>0){
            this.data.voices = this.data.allVoices.filter((voice)=>{
                return this.data.chosenAccents.filter((chosen)=>{
                    return voice.accents.filter((accent)=>{
                        return accent.name === chosen.name;
                    }).length>0;
                }).length>0
            });
            console.log(this.data.voices);
        } else {
            this.data.voices = this.data.allVoices;
        }
        this.data.voices.forEach((voice,i)=>{
            cardTemplate += `<neoan-card class="col-4 mb-4" data-provide="voices.${i}"></neoan-card>`
        });
        cardTemplate += '</div>';
        this.element.innerHTML = cardTemplate;
        neoan.cycle();
        this.rendering();
        console.log(this.data.chosenAccents);

    },
    updated(){
        if(typeof this.data.formerAccents === 'undefined' || this.data.formerAccents.length !== this.data.chosenAccents.length){
            this.data.formerAccents = [...this.data.chosenAccents];
            this.setVoices();
            this.rendering();
        }
        setTimeout(()=>{
            neoan.directives.forEach((dir)=>{
                if(dir.name === 'for'){
                    // dir.run();
                }
            });
            // neoan.cycle();
        },500)

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
    loaded(){
    },
    updated(){
        if(!this.data.loadedAudio){
            this.data.loadedAudio = true;
            this.audio = new Audio(this.data._provided.fileLocation);
        }
    }
});
