 const changeSession = ()=> {
    let data = {
        language:document.querySelector('#lang-select').value,
        gender:document.querySelector('#gender-select').value
    };
    fetch('{{base}}/api.v1/header',{method:'POST',headers:{
        'Content-Type':'application/json'
        },body:JSON.stringify(data)}).then(()=>{
            window.location.reload();
    })
};
