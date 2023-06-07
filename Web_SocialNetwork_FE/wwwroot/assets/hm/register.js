window.onload = function () {
    const btnRegister = document.getElementsByClassName('choose-register');
    for (let item of btnRegister) {
        item.onclick = register;
    }
};

function register() {
    console.log('----register----')
    let conditionRegister = document.getElementById('check-condition-term');
    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let inputName = document.getElementsByClassName('input-name-register');
    let inputEmail = document.getElementsByClassName('input-email-register');
    let inputPassword = document.getElementsByClassName('input-password-register');
    let inputConfirmPassword = document.getElementsByClassName('input-confirm-password-register');
    for (let item of inputName) {
        if (item.value !== '') {
            name = item.value;
            break;
        }
    }
    for (let item of inputEmail) {
        if (item.value !== '') {
            email = item.value;
            break;
        }
    }
    for (let item of inputPassword) {
        if (item.value !== '') {
            password = item.value;
            break;
        }
    }
    for (let item of inputConfirmPassword) {
        if (item.value !== '') {
            confirmPassword = item.value;
            break;
        }
    }
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
        $("#register-invalid").text('Required is not empty');
        $("#register-invalid").show();
        if (name === '') inputName[0].focus(); else if (email === '') inputEmail[0].focus(); else if (password === '') inputPassword[0].focus(); else inputConfirmPassword[0].focus();
        return;
    }

    if (!validateName(name)) {
        $("#register-invalid").text('Name is not invalid');
        $("#register-invalid").show();
        inputName[0].focus();
        return;
    }

    if (!validateEmail(email)) {
        $("#register-invalid").text('Email is not invalid');
        $("#register-invalid").show();
        inputEmail[0].focus();
        return;
    }

    if (!validatePassword(password)) {
        $("#register-invalid").text('Password must be at least 6 characters');
        $("#register-invalid").show();
        inputPassword[0].focus();
        return;
    }

    if (password !== confirmPassword) {
        $("#register-invalid").text('Password and confirm password not match');
        $("#register-invalid").show();
        inputPassword[0].focus();
        inputPassword[0].value = '';
        inputConfirmPassword[0].value = '';
        return;
    }
    if (conditionRegister.checked !== true) {
        $("#register-invalid").text('Please check condition and term');
        $("#register-invalid").show();
        conditionRegister.focus();
        return;
    }
    $.ajax({
        url: 'https://localhost:7131/v1/api/register',
        type: 'POST',
        data: JSON.stringify({
            "name": name, "email": email, "password": password
        }), contentType: 'application/json',
        success: function (data) {
            $("#register-invalid").hide();
            let user = new User(email, password);
            localStorage.setItem("account", JSON.stringify(user));
            window.location.href = 'https://localhost:7261/confirm-code';
        }, error: function (err) {
            $("#register-invalid").text('Email is already exist');
            $("#register-invalid").show();
            console.error(`Register failed ${err.status}`);
            console.error(`Cause ${err.responseText}`);
            return;
        }
    });
    console.log('----register----')
}