$(document).ready(function () {
    GetFriend(localStorage.getItem("userTargetId"));
    x = document.getElementsByClassName('profile');
    for (let i = 0; i < x.length; i++) {
        console.log(x[i].getAttribute('name'));
        x[i].addEventListener("click", function () {
            localStorage.setItem("userTargetId", x[i].getAttribute('name'));
            console.log(x[i].getAttribute('name'))
        }); 
    }
});
function GetUser(id) {
    var data;
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/'+id+'/profile',
        method: 'GET',
        contentType: 'json',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        error: function (reponse) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (reponse) {
            data = reponse;
        }
    });
    return data;
}
function GetFriend(id) {
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/' + localStorage.getItem("userTargetId")+'/friends',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        error: function (reponse) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (reponse) {
            const len = reponse.length;
            console.log(reponse);
            let table = '';
            for (var i = 0; i < len; ++i) {
                var user = GetUser(reponse[i].userTargetIduserId);
                table += `<div class="col-md-3 col-sm-4 pe-2 ps-2">
                                    <div class="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 mt-0">
                                        <div class="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                                            <figure class="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1"><img style="width:65px; height:65px; border-radius:50px;" src="${user.avatar}" alt="image" class="float-right p-0 bg-white rounded-circle w-100 shadow-xss"></figure>
                                            <div class="clearfix"></div>
                                                <h4 class="fw-700 font-xsss mt-3 mb-1">${user.fullName} </h4>
                                            <p class="fw-500 font-xsssss text-grey-500 mt-0 mb-3">${user.userInfo.email}</p>
                                            <a href="https://localhost:7261/profile" name="${user.userId}" class="profile mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white">Profile</a>
                                        </div>
                                    </div>
                                </div>`;
            }
            document.getElementById('allfriend').innerHTML = table;
            temp = len;
        },
        fail: function (response) {
        }
    });
}
