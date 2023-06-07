$(document).ready(function () {
    UsersBlock();
    var x = document.getElementsByClassName('profile');
    for (let i = 0; i < x.length; i++) {
        x[i].addEventListener("click", function () {
            localStorage.setItem("userTargetId", x[i].getAttribute('name'));
        })
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
function UsersBlock() {
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/blocks',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (response) {
            const len = response.length;
            let str = '';
            for (var i = 0; i < len; i++) {
                str += `<div class="col-md-12 col-sm-4 pe-2 ps-2 phong1">
                            <div class="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 phong2">
                                <div class="card-body w-100 ps-3 pe-3 pb-4 phong3">
                                    <figure class="avatar mb-0 position-relative w65 z-index-1 phong4">
                                        <img style="width:65px; height:65px; border-radius:50px;" src="${GetUser(response[i].userTargetIduserId).avatar}" alt="image" class="phong5">
                                    </figure>
                                    <div class="clearfix phong6"></div>
                                    <h4 class="fw-700 font-xsss phong7">${GetUser(response[i].userTargetIduserId).fullName}</h4>
                                    <p class="fw-500 font-xsssss text-grey-500 phong8">${GetUser(response[i].userTargetIduserId).userInfo.email}</p>
                                    <a style="background-color:red" name="${GetUser(response[i].userTargetIduserId).userId}" href="https://localhost:7261/profile" class="profile phong9 mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ls-3 d-inline-block rounded-xl font-xsssss fw-700 ls-lg text-white">View Profile</a>
                                </div>
                            </div>
                        </div>`
                console.log(GetUser(response[i].userId).avatar);
            }
            $('#blockresult').html(str);
        }
    })
}