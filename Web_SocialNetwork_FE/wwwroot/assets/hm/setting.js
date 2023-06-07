window.onload = function () {
    const userId = localStorage.getItem('userId');
    if (userId === null) {
        window.location.href = 'https://localhost:7261/404';
    }
    const btnLogout = $("#btn-logout");
    btnLogout.click(() => logout());

};

function logout() {
    $.ajax({
        url: 'https://localhost:7131/v1/api/logout',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        contentType: 'application/json',
        success: function (data) {
            console.log(`Logout successfully`);
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
