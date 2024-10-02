function validation(values) {
    let errors = {}

    if (values.user === "") {
        errors.user = "El usuario no debe estar vacio"
    }

    if (values.password === "") {
        errors.password = "La contraseña no puede estar vacia"
    } 
    return errors;
}

export default validation