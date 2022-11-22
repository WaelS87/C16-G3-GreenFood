const exRegAlfa = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/
const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
const exRegPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,12}/
const $ = (element)=> document.getElementById(element)


const msgError = (element, msg, {target}) => {
    $(element).innerText = msg;
    target.classList.add('errorText');
};

const cleanField = (element, target) => {
    $(element).innerText = null;
    target.classList.remove('errorText', 'is-valid')
};

const validField = (element,{target}) => {
    cleanField(element, target)
    target.classList.add('is-valid');
    
};

window.addEventListener("load",function(){



/* const verifyEmail = async (email) => {
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
} */


$('name').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('msgErrorName',"El nombre es obligatorio", e);
            break;
        case this.value.trim().length < 2 :
            msgError('msgErrorName',"El nombre debe tener como mínimo dos caracteres", e);
            break
        case !exRegAlfa.test(this.value):
            msgError('msgErrorName',"Solo se permiten caracteres alfabéticos", e);
            break
        default:
            validField('msgErrorName',e)
            break;
    }
});

$('name').addEventListener('focus', function({target}){
    cleanField('errorNombre', target)
});


$('surname').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('msgErrorSurname',"El apellido es obligatorio", e);
            break;
        case this.value.trim().length < 2 :
            msgError('msgErrorSurname',"El apellido debe tener como mínimo dos caracteres", e);
            break
        case !exRegAlfa.test(this.value):
            msgError('msgErrorSurname',"Solo se permiten caracteres alfabéticos", e);
            break
        default:
            validField('msgErrorSurname',e)
            break;
    }
});

$('surname').addEventListener('focus', function({target}){
    cleanField('msgErrorSurname', target)
});

$('user').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('msgErrorUsername',"El usuario es obligatorio", e);
            break;
        case this.value.trim().length < 2 :
            msgError('msgErrorUsername',"El usuario debe tener como mínimo dos caracteres", e);
            break
        default:
            validField('msgErrorUsername',e)
            break;
    }
});

$('user').addEventListener('focus', function({target}){
    cleanField('msgErrorSurname', target)
});


$('email').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('msgErrorEmail',"El email es obligatorio", e);
            break;
        case !exRegEmail.test(this.value):
            msgError('msgErrorEmail',"El email tiene un formato inválido", e);
            break
        /* case await verifyEmail(this.value):
            msgError('errorEmail',"El email ya se encuentra registrado", e);
            break */
        default:
            validField('msgErrorEmail',e)
            break;}
});

$('email').addEventListener('focus', function({target}){
    cleanField('msgErrorEmail', target)
});

$('password').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('msgErrorPass',"La contraseña es obligatoria", e);
            break;
        case !exRegPass.test(this.value):
            msgError('msgErrorPass',"La contraseña debe tener entre 6 y 12 caracteres, un número, una mayúscula y un caracter especial", e);
            break
        default:
            validField('msgErrorPass',e)
            break;
    }
});

$('password').addEventListener('focus', function({target}){
    cleanField('msgErrorPass', target)
});

/* $('avatar').addEventListener('change', (e) => {
        var fileInput = document.getElementById('avatar');
        var filePath = fileInput.value;
        var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

        if(!allowedExtensions.exec(filePath)){
            alert('Solo se admiten extensiones .jpeg/.jpg/.png/.gif');
            fileInput.value = '';
            return false;
        }else{
            //Image preview
            if (fileInput.files && fileInput.files[0]) {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = function(e) {
                    $('image1Prev').src = reader.result
                };
                
}; */

 
$("avatar").addEventListener('change', function (e) {
            var filePath = this.value;
            var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
            if(!allowedExtensions.exec(filePath)){
                msgError('msgErrorAvatar',"Extensión no permitida. Podés utilizar: .jpeg/.jpg/.png/.gif.", e);
                fileInput.value = '';
                return false;
            }else{
                msgError('msgErrorAvatar',"Archivo correcto", e);
                return true;
            }
        
    });



$('profile__form').addEventListener('keydown', (e) => {
    if(e.key === "Enter" ){
        e.preventDefault()
    }
});

$('profile__form').addEventListener('submit', (e) => {
    e.preventDefault();
    let error = false;
    const elements = $('profile__form').elements;

    for (let i = 0; i < elements.length - 2; i++) {
        
        if(!elements[i].value || elements[i].classList.contains('errorText')){
            error = true;
            elements[i].classList.add('errorText')
            $('msgError').innerText = "Algunos tienen errores y/o están vacíos."
        }
    }

    !error &&  $('profile__form').submit()
})

});