console.log('conexion exitosaaaaa!!!!!!')



window.addEventListener('load',function(){
const $ =(element)=>document.getElementById(element)
const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
const exRegPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,12}/
let errores = {};
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




    $('email').addEventListener('blur', function(e){
        switch (true) {
            case !this.value.trim():
                errores.email = msgError('msgEma',"El email es obligatorio", e);
                break;
            case !exRegEmail.test(this.value):
                errores.email = msgError('msgEma',"El email tiene un formato inválido", e);
                break
            default:
                validField('msgEma',e)
                delete errores.email
                break;
            }
            console.log(errores);
    });
    
   
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
    
  
  $('form').addEventListener('keydown',function(e){
    if(e.key==Enter){
        e.preventDefault()
    }
})
  
  $('form').addEventListener('submit',function(e){
         e.preventDefault()
           let error = false
           let elements = $('form').elements
        for(let i = 0 ; i < elements.length-1 ; i++){
            if(!elements[i].value || elements[i].classList.contains('is-invalid')){
                e.preventDefault()
                error = true
                elements[i].classList.add('is-invalid')
                $('msgLog').innerText='hay error en el mail o conraseña'
            }
        }
        !error &&  $('form').submit()
       
})
})




