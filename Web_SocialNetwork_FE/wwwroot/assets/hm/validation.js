function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateName(name) {
    const re = /^[a-zA-Z ]{2,30}$/;
    return re.test(name);
}

function validatePassword(password) {
    const re = /^.{6,}$/;
    return re.test(password);
}

function validateCode(code){
    const re = /^[0-9]{6}$/;
    return re.test(code);
}