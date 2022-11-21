console.log('conexion exitosaaaaa!!!!!!')
window.addEventListener('load',function(){
    const $ =(element)=>document.getElementById(element)

  $('email').addEventListener('blur',function(e){
    switch (true) {
        case !this.value.trim():
            $('msgEma').classList.add('is-invalid')
            $('msgEma').innerHTML='el mail es obligatorio'
            break;
        case !/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(this.value):
            $('msgEma').classList.add('is-invalid')
            $('msgEma').innerHTML='"El email tiene un formato inválido"'
            break;
        default:
            $('msgEma').classList.remove('is-invalid')
            $('msgEma').classList.add('is-valid')
            $('msgEma').innerHTML=null
            break;
    }$('email').addEventListener('focus',function(){
        $('msgEma').classList.remove('is-invalid')
        $('msgEma').classList.add('is-valid')
        $('msgEma').innerHTML=null
    })

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
    $('password').addEventListener('focus',function(){
        $('msgPas').classList.remove('is-invalid')
        $('msgPas').classList.add('is-valid')
        $('msgPas').innerHTML=null
  })
  $('form').addEventListener('submit',function(e){
           
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
  })





})

})