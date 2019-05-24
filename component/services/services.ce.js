import neoan from '{{base}}/asset/neoanJs/neoan.js';
neoan.service('api',{
    post(endpoint,body){
        return fetch('{{base}}api.v1/'+endpoint,{
            method:'POST',
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
        return fetch('{{base}}api.v1/'+endpoint,).then((header)=>{
            return header.json();
        })
    },
    delete(endpoint,body){
        return fetch('{{base}}api.v1/'+endpoint,{
            method:'DELETE',
            body:JSON.stringify(body)
        }).then((header)=>{
            return header.json();
        })
    }
});
