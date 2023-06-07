window.onload = function () {
    const btnConfirmChangePassword = document.getElementById('confirm-change-password');
    const userId = localStorage.getItem('userId');
    if (userId === null) {
        window.location.href = 'https://localhost:7261/404';
    }
    btnConfirmChangePassword.addEventListener('click', changePassword);
};

function changePassword() {
    console.log('----change-password-----')
    const oldPassword = document.getElementById('old-password');
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-new-password');

    if (oldPassword.value === '' || newPassword.value === '' || confirmPassword.value === '') {
        showError('Please enter old password and new password');
        if (oldPassword.value === '') oldPassword.focus();
        else if (newPassword.value === '') newPassword.focus();
        else confirmPassword.focus();
        return;
    }
    let inputOldPassword = oldPassword.value;
    let inputNewPassword = newPassword.value;
    let inputConfirmPassword = confirmPassword.value;

    if (inputNewPassword !== inputConfirmPassword) {
        showError('Confirm password is not match');
        newPassword.value = '';
        confirmPassword.value = '';
        newPassword.focus();
        return;
    }

    if (inputOldPassword.length < 6 || inputNewPassword.length < 6 || inputConfirmPassword.length < 6) {
        showError('Password  must be at least 6 characters');
        clearInput(oldPassword, newPassword, confirmPassword);
        oldPassword.focus();
        return;
    }

    if (inputOldPassword === inputNewPassword) {
        showError('Old password and new password is same')
        clearInput(oldPassword, newPassword, confirmPassword);
        oldPassword.focus();
        return;
    }

    $.ajax({
        url: 'https://localhost:7131/v1/api/users/change-password',
        type: 'PUT',
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            "oldPassword": inputOldPassword,
            "newPassword": inputNewPassword
        }),
        contentType: 'application/json',
        success: function (data) {
            showError('Change password successfully');
        },
        error: function (err) {
            showError(err.responseText);
            console.error(`Change password ${err.status}`);
            return;
        }
    });
    clearInput(oldPassword, newPassword, confirmPassword);
    console.log('----change-password-----')
}

function showError(err) {
    $("#error-change-password").text(err);
    $("#error-change-password").show();
}

function clearInput(oldPassword, newPassword, confirmPassword) {
    oldPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
}