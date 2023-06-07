window.onload = function () {
    const btnLogin = document.getElementsByClassName('choose-login');
    for (let item of btnLogin) {
        item.onclick = login;
    }
};

function login() {
    console.log('----login-----')
    let email = '';
    let password = '';
    let inputEmail = document.getElementsByClassName('input-email-login');
    let inputPassword = document.getElementsByClassName('input-password-login');
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
    if (email === '' || password === '') {
        $("#login-invalid").text('Email or password is empty');
        $("#login-invalid").show();
        if (email === '') inputEmail[0].focus(); else inputPassword[0].focus();
        return;
    }

    if (!validateEmail(email)) {
        $("#login-invalid").text('Email is not invalid');
        $("#login-invalid").show();
        inputEmail[0].focus();
        return;
    }

    if (password.length < 6) {
        $("#login-invalid").text('Password is not invalid');
        $("#login-invalid").show();
        inputPassword[0].focus();
        return;
    }

    $.ajax({
        url: 'https://localhost:7131/v1/api/login',
        type: 'POST',
        data: JSON.stringify({
            "email": email,
            "password": password
        }),
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data, status, xhr) {
            const cookie = document.cookie;
            localStorage.setItem('cookie', cookie);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userRole", data.userInfo.userRole);
            $("#login-invalid").hide();
            if (data.userInfo.status === "INACTIVE") {
                let user = new User(email, password);
                localStorage.setItem("account", JSON.stringify(user));
                $.ajax({
                    url: "https://localhost:7131/v1/api/codes/refresh",
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    data: JSON.stringify({
                        "email": email,
                        "password": password
                    }),
                    contentType: "application/json",
                    success: function (data) {
                    }, error: (err) => {
                        console.error(`Send code failed ${err.status}`);
                        console.error(`Cause ${err.responseText}`);
                        return;
                    }
                });
                window.location.href = 'https://localhost:7261/confirm-code';
            } else {
                window.location.href = 'https://localhost:7261/';
            }
        },
        error: function (err) {
            if (err.status === 500) {
                $("#login-invalid").text("Email or password is incorrect");
                $("#login-invalid").show();
                console.error(`Login failed ${err.status}`);
                console.error(`Cause ${err.responseText}`);
                return;
            }
            if (err.status == 400) {
                window.location.href = 'https://localhost:7261/look';
                return;
            }
        }
    });


    console.log('----login-----')
}
