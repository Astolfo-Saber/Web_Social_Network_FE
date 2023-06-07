$(document).ready(function () {
    $("#avataruser").attr("src", GetUser(localStorage.getItem("userId")).avatar);
    if (localStorage.getItem("userRole") != "ADMIN_ROLE") {
        document.getElementById('homeadmin').style.display = "none";
    }
});
document.getElementById('myprofile').addEventListener("click", function () {
    localStorage.setItem("userTargetId", localStorage.getItem("userId"));
});
document.getElementById('usersblock').addEventListener("click", function () {
    localStorage.setItem("userTargetId", localStorage.getItem("userId"));
})
document.getElementById('avatarprofile').addEventListener("click", function () {
    localStorage.setItem("userTargetId", localStorage.getItem("userId"));
})
document.getElementById('logout').addEventListener("click", function () {
    localStorage.clear();
    window.location.href = 'https://localhost:7261/login';
})
$('#searchuser').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        localStorage.setItem("nameUser", document.getElementById('searchuser').value);
        window.location.replace("https://localhost:7261/search");
    }
});
function GetUser(id) {
    var data;
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/' + id + '/profile',
        method: 'GET',
        contentType: 'json',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        error: function (reponse) {
        },
        success: function (reponse) {
            data = reponse;
        }
    });
    return data;
}