window.onload = function () {
    const userId = localStorage.getItem('userId');
    if (userId === null) {
        window.location.href = 'https://localhost:7261/404';
    }
    const btnGetCodeChangeEmail = document.getElementById('btn-get-code-change-email');
    btnGetCodeChangeEmail.addEventListener('click', getCodeChangeEmail);
    const btnSaveChangeEmail = document.getElementById('btn-save-change-email');
    btnSaveChangeEmail.addEventListener('click', ChangeEmail)
    clearInput();
};

function getCodeChangeEmail() {
    console.log('----change-email-----')
    const emailReset = document.getElementById('email-current-change');
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
        url: 'https://localhost:7131/v1/api/users/change-email/' + email,
        type: 'POST',
        async: false,
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            showError("Please check your email and input code to change email");
            $("#btn-get-code-change-email").hide();
            $("#save-email-change").show();
            $("#new-email-change").show();
            $("#email-current-change").prop('disabled', true);
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

    console.log('----change-email-----')
}

function ChangeEmail() {
    const oldEmail = document.getElementById('email-current-change');
    let oldEmailChange = oldEmail.value;

    const newEmail = document.getElementById('email-new-change');
    let newEmailChange = newEmail.value;

    const code = document.getElementById('code-change-email');
    let codeConfirm = code.value;
    
    if(oldEmailChange === newEmailChange){
        showError('Email is the same as old email');
        newEmail.focus();
        return;
    }
    
    if(codeConfirm === ''){
        showError('Code is required');
        code.focus();
        return;
    }
    if(!validateCode(codeConfirm)){
        showError('Code is not valid');
        code.focus();
        return;
    }
    
    if(!validateEmail(newEmailChange)){
        showError('New email is not valid');
        newEmail.focus();
        return;
    }

    $.ajax({
        url: 'https://localhost:7131/v1/api/users/change_email/' + codeConfirm,
        type: 'PUT',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        }, data: JSON.stringify({
            "oldEmail": oldEmailChange,
            "newEmail": newEmailChange
        }),
        contentType: 'application/json',
        success: function (data) {
            showError('Change email success');
            clearInput(oldEmail, newEmail, code);
            changeAgain();
            return;
        },
        error: function (err) {
            if (err.status === 500) {
                showError("Request don't exist");
            } else {
                showError(err.responseText);
            }
            console.error(`Change email ${err.status}`);
            return;
        }
    });
}

function showError(err) {
    $("#notification-change-email").text(err);
    $("#notification-change-email").show();
}

function changeAgain(){
    $("#email-current-change").prop('disabled', false);
    $("#btn-get-code-change-email").show();
    $("#save-email-change").hide();
    $("#new-email-change").hide();
}

function clearInput(oldEmail, newEmail, code){
    oldEmail.value = '';
    newEmail.value = '';
    code.value = '';
}
