/* Verifico si el archivo se conectó a la vista mediante un mensaje por consola */

console.log("Agregar producto conectado exitosamente.");

/* ACLARACIÓN: la función "$" se importa en los scripts desde la vista ejs, ubicada en el archivo ejs llamado "scripts" */

/* ------------------------------------------- */
/* ------------------------------------------- */
/* ------------------------------------------- */

/* Comienzo de validaciones de los formularios */

const formAddProduct = $("formAddProduct"); /* Encierro en una variable el nombre del ID del formulario */
const elements = formAddProduct.elements; /* Declaro en otra variable el uso de la funcion "elements" del objeto formAddProducts */
let totalCharacters = 500; /* Cantidad total de carácteres para utilizar en la descripción */
let numberCharacters = 500; /* Número disponible de carácteres para usar en la descripción */

/* Funciones para agregar/eliminar textos de error */
const msgError = (element, msg, event) => {
    $(element).style.color = "red";
    $(element).innerHTML = msg;
    event.target.classList.add("errorText");
}

const cleanError = (element, {target}) => {
    target.classList.remove("errorText");
    target.classList.remove("is-valid");
    $(element).innerHTML = null
}

/* Funciones para verificar si los formularios son válidos (predecesor a la asignación de los errores) */

/* "validField" verifica si es un campo válido, en el caso de que así sea, mostrará gráficamente mediante un texto con la clase "is-valid" que el campo justamente es válido. Al mismo tiempo, en el caso de que anterior a esto haya habido un error, elimina la validación del error y agrega la validación con resultado positivo. */
const validField = (element, {target}) => {
    $(element).innerHTML = null;
    target.classList.remove('errorText')
    target.classList.add('is-valid');
};

/* "checkFields" simplemente corrobora que los campos seleccionados dentro del formulario carezcan de la clase "errorText" o en su caso que contengan un valor obligatoriamente, en el caso de que sea uno u otro deshabilitará el botón de envío del formulario y sólo se habilitará cuando estos errores desaparezcan y/o el campo tenga contenido dentro. */
const checkFields = () => {
    let error = false;
    for (let i = 0; i < elements.length - 1; i++) {
        
        if(!elements[i].value || elements[i].classList.contains('errorText')) {
        error = true
        }

        console.log(error)
    }

    if(!error){
        $('btn-submit').disabled = false;
    } else {
        $('btn-submit').disabled = true;
    }
}

/* Validaciones campo por campo */

/* Validación de nombre del producto */
/* Si existe un error, cuando tengas un focus en el campo lo eliminará. */
$("name").addEventListener("focus", function (e) {
    cleanError("nameMsg", e)
})

/* Cuando salgas del campo, se va a ejecutar la función, la cual distingue distintos errores */
$("name").addEventListener("blur", function (e) {
    switch (true) {

        /* En el caso de que no exista valor dentro del campo */
        case !this.value.trim():
            msgError("nameMsg", "El nombre es requerido", e)
            break;

        /* En el caso de que el valor dentro del campo tenga un largo menor a 10 */
        case this.value.trim().length < 10:
            msgError("nameMsg", "El nombre del producto debe tener mín. 10 carácteres", e)
            break;
            
        /* Por defecto va a validar el campo */
        default:
            validField("nameMsg", e)
            break;
    }
    /* Por último, checkea si todos los campos son válidos para habilitar el botón de "enviar" */
    checkFields()
})

/* Validación categoría del producto */
$("category").addEventListener("blur", function (e) {
    switch (true) {
        case !this.value:
        /* Si no se selecciona una categoría */
            msgError("categoryMsg", "Debes elegir una categoría", e)
            break;

        /* Por defecto va a validar el campo */
        default:
            validField("categoryMsg", e)
            break;
    }
    /* Por último, checkea si todos los campos son válidos para habilitar el botón de "enviar" */
    checkFields()
})

/* Validación del precio del producto */
/* Validación de datos ingresados */
$("price").addEventListener("blur", function (e) {
    switch (true) {
        /* En el caso de que no exista el valor */
        case !this.value.trim():
            msgError("priceMsg" , "Debe declarar un precio")
            break;
        /* En el caso de que se ingrese un valor negativo */
        case this.value < 9:
            msgError("priceMsg" , "No puede ingresar un precio inferior a 0")
            break;
        /* Por defecto va a validar el campo */
        default:
            validField("priceMsg", e)
            break;
        }
        
    /* Por último, checkea si todos los campos son válidos para habilitar el botón de "enviar" */
    checkFields()
    })

/* Se muestra en pantalla el precio final del producto, esto puede ser modificado por el descuento en el caso de que contenga */
$("price").addEventListener("keyup", function (e) {
    /* Guarda el valor del campo en la variable "Price" */
    let price = this.value
    /* Guarda el valor del campo "discount" en una variable */
    let discount = $("discount").value; 
    
    /* El valor del campo "finalPrice" va a ser el resultado de restarle al precio la multiplicación del precio por el descuento dividido 100, en simples palabras, el precio con el descuento aplicado */
    $("finalPrice").innerText = `Precio final: ${+price - (+price * +discount / 100)}`
    $("discountApply").innerText = `Descuento aplicado: ${+price * +discount / 100}`
})


/* Validación del descuento */

$("discount").addEventListener("blur", function (e) {
    switch (true) {
        /* Si el valor ingresado es menor a 0 (Lo cual debería ser imposible) o superior a 100 (Lo cual haría que tengamos que pagarle al cliente por el producto, algo ridículo) */
        case this.value < 0 || this.value > 100:
            msgError("discountMsg", "No puedes ingresar esa cantidad de descuento", e)
            break;
        /* Por defecto va a validar el campo */
        default:
            validField("discountMsg", e)
            break;
    }
    /* Por último, checkea si todos los campos son válidos para habilitar el botón de "enviar" */
    checkFields()
})

/* Aplicación del descuento en el precio final */
$("discount").addEventListener("keyup", function (e) {
    /* Guarda el valor del campo "price" en una variable */
    let price = $("price").value
    /* Guarda el valor del campo en la variable "discount" */
    let discount = this.value; 
    
    /* El valor del campo "finalPrice" va a ser el resultado de restarle al precio la multiplicación del precio por el descuento dividido 100, en simples palabras, el precio con el descuento aplicado */
    $("discountApply").innerText = `Descuento aplicado: ${+price * +discount / 100}`
    $("finalPrice").innerText = `Precio final: ${+price - (+price * +discount / 100)}`
})

/* Validación de la descripción */

$("description").addEventListener("focus", function (e) {
    /* Muestra la información de la descripción, o sea, la cantidad de carácteres disponibles para escribir*/
    $("descriptionInfo").hidden = false;
    $("numberCharacters").innerHTML = numberCharacters

    /* Elimina el error si existía anteriormente */
    cleanError("descriptionMsg", e)
})

$("description").addEventListener("blur", function (e) {
    $("descriptionInfo").hidden = true;

    switch (true) {
        /* Si el valor es inexistente, arroja un error */
        case !this.value.trim():
            msgError("descriptionMsg", "Necesitas ingresar una descripción", e)
            break;
        /* Si el valor es inferior a los 20 carácteres */
        case this.value.trim().length < 10:
            msgError("descriptionMsg", "Debe contener mínimo 10 carácteres", e)
            break;
        /* Si el valor supera los 500 carácteres */
        case this.value.trim().length >= 500:
            msgError("descriptionMsg", "Debe contener máximo 500 carácteres", e)
            break;
        /* Por defecto va a validar el campo */
        default:
            validField("descriptionMsg", e)
            break;
    }
    /* Por último, checkea si todos los campos son válidos para habilitar el botón de "enviar" */
    checkFields()
})

$("description").addEventListener("keyup", function (e) {
    /* En una variable guarda el resultado de la resta de los carácteres totales disponibles con la cantidad de carácteres ingresados en el campo. */
    numberCharacters = totalCharacters - +this.value.length

    /* En el campo muestra numéricamente la cantidad de carácteres disponibles */
    $("numberCharacters").innerHTML = numberCharacters;

    if (numberCharacters <= 0) {
        /* Si la cantidad disponible de carácteres es igual o inferior a 0, se oculta los números y se muestra el texto de errorº */
        $("descriptionInfo").hidden = true;
        msgError("descriptionMsg", "No debe superarse los 500 carácteres", e)
    } else {
        /* Por defecto, valida el campo eliminando el anterior error en el caso de que existiese */
        $("descriptionInfo").hidden = false;
        cleanError("descriptionMsg", e)
    }
})