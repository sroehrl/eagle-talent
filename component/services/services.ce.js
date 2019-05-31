import neoan from '{{base}}/asset/neoanJs/neoan.js';
neoan.service('api',{
    token:false,
    createHeader(){
        let header = {
            'Content-Type': 'application/jason'
        };
        if(this.token){
            header.Authorization = 'Bearer '+this.token
        }
        return new Headers(header);
    },
    post(endpoint,body){
        return fetch('{{base}}api.v1/'+endpoint,{
            method:'POST',
            headers:this.createHeader(),
            body:JSON.stringify(body)
        }).then((header)=>{
            return header.json();
        })
    },
    get(endpoint,body){
        let string = '?';
        if(body){
            Object.keys(body).forEach((key)=>{
                string += key+'='+body[key]+'&'
            });
        }
        endpoint += string.substring(0,string.length-1);
        return fetch('{{base}}api.v1/'+endpoint,{
            headers:this.createHeader()
        }).then((header)=>{
            return header.json();
        })
    },
    delete(endpoint,body){
        return fetch('{{base}}api.v1/'+endpoint,{
            method:'DELETE',
            headers:this.createHeader(),
            body:JSON.stringify(body)
        }).then((header)=>{
            return header.json();
        })
    }
});
