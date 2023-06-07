window.onload = function () {
    const btnResetPassword = document.getElementById('confirm-reset-password');
    btnResetPassword.addEventListener('click', resetPassword);
    const btnConfirmResetPassword = document.getElementById('confirm-code-reset-password');
    btnConfirmResetPassword.addEventListener('click', confirmResetPassword)
};

function resetPassword() {
    console.log('----reset-password-----')
    const emailReset = document.getElementById('query-email-reset-password');
    let email = emailReset.value;
    if (email === '') {
        showError('Email is required');
        email.focus();
        return;
    }
    if (!validateEmail(email)) {
        showError('Email is not valid');
        email.focus();
        return;
    }
    $.ajax({
        url: 'https://localhost:7131/v1/api/forgot-password/' + email,
        type: 'POST',
        async: false,
        contentType: 'application/json',
        success: function (data) {
            showError('Please check your email and input code to reset password');
            $("#query-email-reset-password").hide();
            $("#input-code-reset-password").show();
            $("#confirm-reset-password").hide();
            $("#confirm-code-reset-password").show();
            return;
        },
        error: function (err) {
            if (err.status === 500) {
                showError("Request don't exist");
            } else {
                showError(err.responseText);
            }
            console.error(`Reset password ${err.status}`);
            return;
        }
    });
    console.log('----reset-password-----')
}

function confirmResetPassword() {
    const emailReset = document.getElementById('query-email-reset-password');
    let email = emailReset.value;
    let confirmCode = document.getElementById('input-code-reset-password');
    let code = confirmCode.value;
    if (code === '') {
        showError('Code is required');
        confirmCode.focus();
        return;
    }
    if(code.length !== 6 || !/^[0-9]+$/.test(code)) {
        showError('Code is not valid');
        confirmCode.value = '';
        confirmCode.focus();
        return;
    }

    $.ajax({
        url: 'https://localhost:7131/v1/api/forgot-password/confirm-code?code=' + confirmCode.value,
        type: 'POST',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        contentType: 'application/json',
        data: JSON.stringify(`${email}`),
        success: function (data) {
            const cookie = document.cookie;
            localStorage.setItem('cookie', cookie);
            localStorage.setItem('userIdReset', data.userId);
            window.location.href = 'https://localhost:7261/update-password';
            emailReset.values = '';
            confirmCode.value = '';
        },
        error: function (err) {
            if (err.status === 500) {
                showError("Request don't exist");
            } else {
                showError(err.responseText);
            }
            console.error(`Reset password ${err.status}`);
            return;
        }
    });
}

function showError(err) {
    $("#error-reset-password").text(err);
    $("#error-reset-password").show();
}
