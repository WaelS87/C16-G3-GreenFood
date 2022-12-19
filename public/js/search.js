console.log('la conexion fue exitosaaaa!!!!!')

window.addEventListener('load', function(e){
    const $ =(element)=>document.getElementById(element)

    $('allProducts__main__section').addEventListener('keydown',function(e){
        if(e.key==Enter){
            e.preventDefault()
            alert('porfavor escribe que estas buscando')
        }
    })
})