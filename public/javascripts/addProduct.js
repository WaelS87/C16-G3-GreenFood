/* Verifico si el archivo se conectó a la vista mediante un mensaje por consola */

console.log("Agregar producto conectado exitosamente.");

/* ACLARACIÓN: la función "$" se importa en los scripts desde la vista ejs, ubicada en el archivo ejs llamado "scripts" */

/* ------------------------------------------- */
/* ------------------------------------------- */
/* ------------------------------------------- */

/* Comienzo de validaciones de los formularios */

const formAddProduct = $("formAddProduct"); /* Encierro en una variable el nombre del ID del formulario */
const elements = formAddProduct.elements; /* Declaro en otra variable el uso de la funcion "elements" del objeto formAddProducts */

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