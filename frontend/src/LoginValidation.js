function validation(values) {
    let errors = {}

    if (values.user === "") {
        errors.user = "El usuario no debe estar vacio"
    }

    if (values.pass === "") {
        errors.pass = "La contraseña no puede estar vacia"
    } 
    return errors;
}

export default validation