console.log('conexiooon extiosaaaa!!!!')

window.addEventListener('load', function(e){
    const $ =(element)=>document.getElementById(element)
    const msgError = (element, msg, event) => {
        $(element).style.color = "red";
        $(element).innerHTML = msg;
        event.target.classList.add("is-invalid");
    };
    const cleanField = (element, target) => {
        $(element).innerText = '';
        target.classList.remove('is-invalid', 'is-valid')
    };
    const validField = (element,{target}) => {
        cleanField(element, target)
        target.classList.add('is-valid');
        
    };
    /******************************verificar si esta el mail resistrado********* */
    const verifyEmail = async (email) => {
        //llamado a la API
        try {
            const data = JSON.stringify({
                email : email
            });
    
            let response = await fetch('/api/users/verify-email',{
                method : 'POST',
                body : data,
                headers : {
                    'Content-Type': 'application/json' 
                }
        });
    
            let result = await response.json();
    
            console.log(result.data)
    
            return result.data
            
        } catch (error) {
            console.error
        }
    }


    const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
    const exRegPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,12}/
    let errores = {};
/**********************************validaciones js del nombre*********************/

/*$('name').addEventListener('focus',function(){
    $('msgNom').classList.remove('is-invalid','is-valid')
    $('msgNom').innerHTML=null
})

/****************************************************************************** */
/*$('name').addEventListener('blur',function(e){
    switch (true) {
        case !this.value.trim():
            $('msgNom').classList.add('is-invalid')
            $('msgNom').innerHTML='el nombre es obligatorio'
            break;
        case this.value.trim().length < 3 :
            $('msgNom').classList.add('is-invalid')
            $('msgNom').innerHTML='debes escribir minimo 3 caracteres'
            break;
        case !/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(this.value):
            $('msgNom').classList.add('is-invalid')
            $('msgNom').innerHTML='debes escribir solo caracteres'
            break;
        default:
            $('msgNom').classList.remove('is-invalid')
            $('msgNom').classList.add('is-valid')
            $('msgNom').innerHTML=null
            break;
    }
})*/
$("name").addEventListener('blur', (e) => {
    switch (true) {
        case !$("name").value.trim():
            errores.name = msgError("msgNom", "El nombre es requerido.", e)
            break;
        case $("name").value.length < 3:
            errores.name = msgError("msgNom", "El nombre debe tener como mínimo 3 caracteres.", e)
            break;
        case $("name").value.length >= 60:
            errores.name = msgError("msgNom", "El nombre no puede superar los 60 caracteres.", e)
            break;
        default:
            $("msgNom").innerHTML = null;
            e.target.classList.remove('is-invalid')
            e.target.classList.add('is-valid');
            delete errores.name
            break;
    }
    console.log(errores);
})
$('name').addEventListener('focus', function({target}){
    cleanField('msgNom', target)
});
/********************************validaciones sur name****************************************** */
/*$('surname').addEventListener('focus',function(){
    $('msgSur').classList.remove('is-invalid','is-valid')
    $('msgSur').innerHTML=null
})
$('surname').addEventListener('blur',function(e){
    switch (true) {
        case !this.value.trim():
            $('msgSur').classList.add('is-invalid')
            $('msgSur').innerHTML='apellido es obligatorio'
            break;
        case this.value.trim().length < 3 :
            $('msgSur').classList.add('is-invalid')
            $('msgSur').innerHTML='debes escribir minimo 3 caracteres'
            break;
        case !/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(this.value):
            $('msgSur').classList.add('is-invalid')
            $('msgSur').innerHTML='debes escribir solo caracteres'
            break;
        default:
            $('msgSur').classList.remove('is-invalid')
            $('msgSur').classList.add('is-valid')
            $('msgSur').innerHTML=null
            break;
    }
})*/
 $("surname").addEventListener('blur', (e) => {
        switch (true) {
            case !$("surname").value.trim():
                errores.surname = msgError("msgSur", "El apellido es requerido.", e)
                break;
            case $("surname").value.length < 3:
                errores.surname = msgError("msgSur", "El apellido debe tener como mínimo 3 caracteres.", e)
                break;
            case $("surname").value.length >= 60:
                errores.surname = msgError("msgSur", "El apellido no puede superar los 60 caracteres.", e)
                break;
            default:
                $("msgSur").innerHTML = null;
                e.target.classList.remove('is-invalid');
                e.target.classList.add('is-valid');
                delete errores.surname
                break;
            }
            console.log(errores);
    })
    $('surname').addEventListener('focus', function({target}){
        cleanField('msgSur', target)
    });
/***************************************validciones js user name***************** 
$('username').addEventListener('focus',function(){
    $('msgUsr').classList.remove('is-invalid','is-valid')
    $('msgUsr').innerHTML=null
})
$('username').addEventListener('blur',function(e){
    switch (true) {
        case !this.value.trim():
            $('msgUsr').classList.add('is-invalid')
            $('msgUsr').innerHTML='el nombre de usuario es obligatorio'
            break;
        case this.value.trim().length < 3 :
            $('msgUsr').classList.add('is-invalid')
            $('msgUsr').innerHTML='debes escribir minimo 3 caracteres'
            break;
        default:
            $('msgUsr').classList.remove('is-invalid')
            $('msgUsr').classList.add('is-valid')
            $('msgUsr').innerHTML=null
            break;
    }
})*/
$("username").addEventListener('blur', (e) => {
    switch (true) {
        case !$("username").value.trim():
            errores.username = msgError("msgUsr", "El nombre es requerido.", e)
            break;
        case $("username").value.length < 3:
            errores.username = msgError("msgUsr", "El nombre debe tener como mínimo 3 caracteres.", e)
            break;
        case $("username").value.length >= 60:
            errores.username = msgError("msgUsr", "El nombre no puede superar los 60 caracteres.", e)
            break;
        default:
            $("msgUsr").innerHTML = null;
            e.target.classList.remove('is-invalid')
            e.target.classList.add('is-valid');
            delete errores.username
            break;
    }
    console.log(errores);
})
$('username').addEventListener('focus', function({target}){
    cleanField('msgUsr', target)
});
/***************************validaciones de email********************** 
$('email').addEventListener('focus',function(){
    $('msgEma').classList.remove('is-invalid','is-valid')
    $('msgEma').innerHTML=null
})
$('email').addEventListener('blur',async function(e){
    switch (true) {
        case !this.value.trim():
            $('msgEma').classList.add('is-invalid')
            $('msgEma').innerHTML='el mail es obligatorio'
            break;
        case !/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(this.value):
            $('msgEma').classList.add('is-invalid')
            $('msgEma').innerHTML='"El email tiene un formato inválido"'
            break;
        case await verifyEmail(this.value):
            $('msgEma').classList.add('is-invalid')
            $('msgEma').innerHTML="El email esta registrado"
            break;
        default:
            $('msgEma').classList.remove('is-invalid')
            $('msgEma').classList.add('is-valid')
            $('msgEma').innerHTML=null
            break;
    }
})*/
$('email').addEventListener('blur', async function(e){
    switch (true) {
        case !this.value.trim():
            errores.email = msgError('msgEma',"El email es obligatorio", e);
            break;
        case !exRegEmail.test(this.value):
            errores.email = msgError('msgEma',"El email tiene un formato inválido", e);
            break
        case await verifyEmail(this.value):
            errores.email = msgError('msgEma',"El email ya se encuentra registrado", e);
            break 
        default:
            validField('msgEma',e)
            delete errores.email
            break;
        }
        console.log(errores);
});

$('email').addEventListener('focus', function({target}){
    cleanField('msgEma', target)
});
/*************************************validciones js contraseña******************************* */
/*para mostrar y escondi la contraseña*****/
$('pass-toggle').onclick=function(e){
    e.preventDefault()
    if(this.textContent =='show'){
        this.textContent='hide'
        $('password').setAttribute('type','text')

    }else{
        this.textContent = 'show'
        $('password').setAttribute('type','password')
    }
}
/*$('password').addEventListener('focus',function(){
    $('msgPas').classList.remove('is-invalid','is-valid')
    $('msgPas').innerHTML=null
})
$('password').addEventListener('blur',function(e){
    switch (true) {
        case !this.value.trim():
            $('msgPas').classList.add('is-invalid')
            $('msgPas').innerHTML='conraseña es obligatoria'
            break;
        case this.value.trim().length < 6 :
            $('msgPas').classList.add('is-invalid')
            $('msgPas').innerHTML='debes escribir minimo 6 caracteres'
            break;
        case !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,12}/.test(this.value):
            $('msgPas').classList.add('is-invalid')
            $('msgPas').innerHTML="La contraseña debe tener entre 6 y 12 caracteres, un número, una mayúscula y un caracter especial"
            break;
        default:
            $('msgPas').classList.remove('is-invalid')
            $('msgPas').classList.add('is-valid')
            $('msgPas').innerHTML=null
            break;
    }
})*/
$('password').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            errores.password = msgError('msgPas',"La contraseña es obligatoria", e);
            break;
        case !exRegPass.test(this.value):
            errores.password = msgError('msgPas',"La contraseña debe tener entre 6 y 12 caracteres, un número, una mayúscula y un caracter especial", e);
            break
        default:
            validField('msgPas',e);
            delete errores.password
            break;
        }
        console.log(errores);
});

$('password').addEventListener('focus', function({target}){
    cleanField('msgPas', target)
});
/***********************confirmar la contraseña****************************************** 
$('password2').addEventListener('focus',function(){
    $('msgPas2').classList.remove('is-invalid')
    $('msgPas2').classList.add('is-valid')
    $('msgPas2').innerHTML=null
})
$('password2').addEventListener('blur',function(e){
    switch (true) {
        case !this.value:
            $('msgPas2').classList.add('is-invalid')
            $('msgPas2').innerHTML="Debes confirmar tu contraseña"
            break;
        case this.value !== $('password').value:
            $('msgPas2').classList.add('is-invalid')
            $('msgPas2').innerHTML="Las contraseñas no coinciden"
            break;
        default:
            $('msgPas2').classList.remove('is-invalid')
            $('msgPas2').classList.add('is-valid')
            $('msgPas2').innerHTML=null
            break;
    }
})*/
$('password2').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            errores.password2 = msgError('msgPas2',"Debes confirmar tu contraseña", e);
            break;
        case this.value !== $('password').value:
            errores.password2 = msgError('msgPas2',"Las contraseñas no coinciden", e);
            break
        default:
            validField('msgPas2',e);
            delete errores.password2
            break;
        }
        console.log(errores);
});


$('password2').addEventListener('focus', function({target}){
    cleanField('msgPas2', target)
});
/*
$('form').addEventListener('keydown',function(e){
    if(e.key==Enter){
        e.preventDefault()
    }
})
$('form').addEventListener('submit',function(e){
    e.preventDefault()
    let error = false;
    const elements = $('form').elements
    if(!$("terminos").checked){
        error = true
        $('msgTer').classList.add('is-invalid')
        $('msgTer').innerHTML='Debe accpetar los terminos por favor'
    }
    for(let i = 0 ; i < elements.length-3 ; i++){
        if(!elements[i].value || elements[i].classList.contains('is-invalid')){
            
            error = true
            elements[i].classList.add('is-invalid')
            $('msgReg').innerText='hay error en alguno o todo los campos'
        }
    }
    !error &&  $('form').submit()
})

})*/
$('terminos').addEventListener('click', (e) => {
    $('msgTer').innerText = null
});

 
$('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = [surname,email,password,password2,terminos];
  

    for (let i = 0; i < inputs.length ; i++) {
      
      if(inputs[i].value.length == 0  || Object.keys(errores).length >= 1){
        console.log(inputs[i].value.length);
        inputs[i].classList.contains('is-valid') || inputs[i].classList.add("is-invalid");
        $('msgReg').innerText = "Debes completar bien los campos requeridos.";
        $('msgReg').style.color = "red"
        } else {
            $('form').submit()
        }   
  }
})


})
