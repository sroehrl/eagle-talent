import neoan from '{{base}}/asset/neoanJs/neoan.js';
const template = document.querySelector('#neoan-accents').innerHTML;
neoan.component('neoan-accents',{
    template:template,
    data:{
        accents:[],
        chosenAccents:[]
    },
    loaded(){
        neoan.services.api.get('neoanAccents',{language:this.element.getAttribute('language')}).then((res)=>{
            this.data.chosenAccents = res.chosen;
            this.data.accents = res.all;
            this.checkBoxes();
        })
    },
    checkBoxes(){
        this.data.chosenAccents.forEach((chosen)=>{
            this.data.accents.forEach((selectable,i)=>{
                if(selectable.name === chosen.name){
                    this.element.querySelector('#switch'+i).checked = true;
                }
            })
        });
        if(typeof neoan.components.neoanVoices !== 'undefined'){
            neoan.components.neoanVoices.forEach((ele)=>{
                ele.data.chosenAccents = this.data.chosenAccents;
                neoan.cycle();
               /* setTimeout(()=>{
                    ele.setVoices();
                    neoan.cycle();
                },800);*/
            })
        }
    },
    setAccents(){
        let chosen = [];
        this.element.querySelectorAll('.chosen-accent').forEach((ele)=>{
            if(ele.checked){
                chosen.push({name:this.data.accents[ele.id.substring(6)].name});
            }
        });
        this.data.chosenAccents = chosen;
        neoan.services.api.post('header',{'accents':chosen}).then(()=>{
            this.checkBoxes();
            //window.location.reload();
        })
    }
});
