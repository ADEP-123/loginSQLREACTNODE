function validation(values) {
    
    let errors = {};

    // Patrones del username
    const userName_pattern_minLenght = /.{8,}/;
    // Patrones del password1
    const password_pattern_4lower = /(.*[a-z]){4,}/;
    const password_pattern_4upper = /(.*[A-Z]){4,}/;
    const password_pattern_minLenght = /.{10,}/;
    const password_pattern_2num = /(.*\d){2,}/;

    // Validación del username
    if (values.userName === "") {
        errors.userName = ["El usuario no debe estar vacío"];
    } else if (!userName_pattern_minLenght.test(values.userName)) {
        errors.userName = ["El usuario debe tener al menos 8 caracteres"];
    }

    // Validación del name
    if (values.name === "") {
        errors.name = ["El nombre no debe estar vacío"];
    }

    // Validación del password1 (acumular errores en un array)
    errors.password1 = []; // Inicializa el array para almacenar los errores

    if (values.password1 === "") {
        errors.password1.push("La contraseña no puede estar vacía");
    }
    if (!password_pattern_4lower.test(values.password1)) {
        errors.password1.push("Debe tener al menos 4 letras minúsculas");
    }
    if (!password_pattern_4upper.test(values.password1)) {
        errors.password1.push("Debe tener al menos 4 letras mayúsculas");
    }
    if (!password_pattern_2num.test(values.password1)) {
        errors.password1.push("Debe tener al menos 2 números");
    }
    if (!password_pattern_minLenght.test(values.password1)) {
        errors.password1.push("Debe tener al menos 10 caracteres");
    }

    // Si no hay errores de contraseña, elimina la clave del objeto de errores
    if (errors.password1.length === 0) {
        delete errors.password1;
    }

    // Validación del password2
    if (values.password2 !== values.password1) {
        errors.password2 = ["Las contraseñas deben ser idénticas"];
    }else{
        delete errors.password2
    }

    return errors;
}

export default validation;
