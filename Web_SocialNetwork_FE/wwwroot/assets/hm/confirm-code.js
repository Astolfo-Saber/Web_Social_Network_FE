window.onload = function () {
    let userCurrent = localStorage.getItem("account");
    runTimeCode();
    if (userCurrent === null) {
        window.location.href = 'https://localhost:7261/404';
        return;
    }
    userCurrent = JSON.parse(userCurrent);
    $("#email-current").text(userCurrent._email);
    const btnConfirmCode = document.getElementsByClassName('choose-confirm-code');
    const btnReSendCode = $("#send-code-register");
    btnConfirmCode[0].onclick = () => confirmCode(userCurrent);
    btnReSendCode.click(() => reSendCode(userCurrent));
};

function runTimeCode() {
    $("#send-code-register").hide();
    $("#time-send-code").show();
    let time = 60;
    let interval = setInterval(() => {
        if (time < 0) {
            clearInterval(interval);
            $("#send-code-register").show();
            $("#time-send-code").hide();
            return;
        }
        if (time < 10) {
            $("#time-code").text('0' + time);
        } else
            $("#time-code").text(time);
        time--;
    }, 1000);
}

function confirmCode(userCurrent) {
    console.log('----confirm-code----')
    const inputCode = document.getElementById('input-confirm-code');
    if (inputCode.value === '') {
        showError("Confirm code is empty");
        inputCode.focus();
        return;
    }
    if (!/^[0-9]+$/.test(inputCode.value)) {
        showError("Confirm code must be number");
        inputCode.value = '';
        inputCode.focus();
        return;
    }
    if (inputCode.value.length !== 6) {
        showError("Confirm code must be 6 characters");
        inputCode.value = '';
        inputCode.focus();
        return;
    }
    let emailCurrent = userCurrent._email;
    let passwordCurrent = userCurrent._password;
    let code = inputCode.value;
    $.ajax({
        url: 'https://localhost:7131/v1/api/register/confirm-code?code=' + code,
        type: 'POST',
        data: JSON.stringify({
            "email": emailCurrent,
            "password": passwordCurrent
        }),
        contentType: 'application/json',
        success: function (data) {
            $("#error-confirm-code").hide();
            localStorage.removeItem("account");
            window.location.href = 'https://localhost:7261/login';
        },
        error: function (err) {
            showError(err.responseText);
            console.error(`Confirm code failed ${err.status}`);
            console.error(`Cause ${err.responseText}`);
            inputCode.value = '';
            inputCode.focus();
            return;
        }
    });
    console.log('----confirm-code----')
}

function reSendCode(userCurrent) {
    let emailCurrent = userCurrent._email;
    let passwordCurrent = userCurrent._password;
    $.ajax({
        url: "https://localhost:7131/v1/api/codes/refresh",
        type: "POST",
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            "email": emailCurrent,
            "password": passwordCurrent
        }),
        contentType: "application/json",
        success: function (data) {
        }, error: (err) => {
            console.error(`Send code failed ${err.status}`);
            console.error(`Cause ${err.responseText}`);
            return;
        }
    });
}

function showError(err) {
    $("#error-confirm-code").text(err);
    $("#error-confirm-code").show();
}