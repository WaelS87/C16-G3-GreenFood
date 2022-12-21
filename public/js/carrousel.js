console.log("Carrousel loaded!.");

const grande = document.querySelector(".carrousel__grande")
const punto =   document.querySelectorAll(".carrousel__punto")

punto.forEach((cadaPunto, i) => {
    punto[i].addEventListener("click", ()=> {
        let posicion = i
        let operacion = posicion * -37

        grande.style.transform =  `translateX(${ operacion }%)`

        punto.forEach( (cadaPunto, i) => {
            punto[i].classList.remove("activo")
        })

        punto[i].classList.add("activo")
})

});