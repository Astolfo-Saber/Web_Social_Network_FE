window.onload = function () {
    const btnConfirmChangePassword = document.getElementById('confirm-change-password-forReset');
    const userId = localStorage.getItem('userIdReset');
    if (userId === null) {
        window.location.href = 'https://localhost:7261/404';
    }
    btnConfirmChangePassword.addEventListener('click', changePassword);
};

function changePassword() {
    console.log('----change-password-----')
    const newPassword = document.getElementById('new-password-reset');
    const confirmPassword = document.getElementById('confirm-password-reset');

    if (newPassword.value === '' || confirmPassword.value === '') {
        showError('Please enter password and confirm password');
        if (newPassword.value === '') newPassword.focus(); else confirmPassword.focus();
        return;
    }
    let inputNewPassword = newPassword.value;
    let inputConfirmPassword = confirmPassword.value;

    if (inputNewPassword.length < 6 || inputConfirmPassword.length < 6) {
        showError('Password  must be at least 6 characters');
        clearInput(newPassword, confirmPassword);
        newPassword.focus();
        return;
    }

    if (inputNewPassword !== inputConfirmPassword) {
        showError('Confirm password is not match');
        clearInput(newPassword, confirmPassword);
        newPassword.focus();
        return;
    }
    $.ajax({
        url: 'https://localhost:7131/v1/api/reset-password', 
        type: 'PUT', 
        xhrFields: {
            withCredentials: true
        }, data: JSON.stringify(`${inputNewPassword}`),
        contentType: 'application/json', success: function (data) {
            logout();
        }, error: function (err) {
            showError(err.responseText);
            console.error(`Change password ${err.status}`);
            return;
        }
    });
    clearInput(newPassword, confirmPassword);
    console.log('----change-password-----')
}

function showError(err) {
    $("#error-reset-password").text(err);
    $("#error-reset-password").show();
}

function clearInput(newPassword, confirmPassword) {
    newPassword.value = '';
    confirmPassword.value = '';
}

function logout() {
    $.ajax({
        url: 'https://localhost:7131/v1/api/logout',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        contentType: 'application/json',
        success: function (data) {
        },
        error: function (err) {
            alert('Error!')
            console.log(`Logout ${err}`);
            return;
        }
    });
    localStorage.clear();
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    }
    window.location.href = 'https://localhost:7261/login';
}
