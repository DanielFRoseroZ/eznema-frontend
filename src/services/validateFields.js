export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const validatePassword = (password) => {
    return password.length >= 8;
}

export const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
}

export const validateName = (name) => {
    const re = /^[a-zA-Z\s]*$/;
    return re.test(name);
}

export const validateLastName = (lastName) => {
    const re = /^[a-zA-Z\s]*$/;
    return re.test(lastName);
}

