const grande = ("/public/stylesheets/home").querySelector(".carrousel__grande")
const punto =   ("/public/stylesheets/home").querySelectorAll(".carrousel__punto")

punto.forEach(cadaPunto, i => {
    punto[i].addEventListener("click", ()=> {
        let posicion = i
        let operacion = posicion * -50

        grande.style.translate =  `translateX(${ operacion }%)`

        punto[i].classList.remove("activo", ()=> {
            let posicion = i
            let operacion = posicion * -50
        });

        punto[i].classList.add("activo")
})

});