$(document).ready(function () {
    FindUser(localStorage.getItem("nameUser"));
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
function FindUser(name) {
    const url = 'https://localhost:7131/v1/api/users/search?q=' + name;
    const urlencode = encodeURI(url);
    $.ajax({
        url: urlencode,
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
                if (CheckBlock(GetUser(response[i].userId).userId) === true) {
                    continue;
                }
                if (CheckUserBlockMe(GetUser(response[i].userId).userId) === true) {
                    continue;
                }
                str +=`<div class="col-md-12 col-sm-4 pe-2 ps-2 phong1">
                            <div class="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 phong2">
                                <div class="card-body w-100 ps-3 pe-3 pb-4 phong3">
                                    <figure class="avatar mb-0 position-relative w65 z-index-1 phong4">
                                        <img style="width:65px; height:65px; border-radius:50px;" src="${GetUser(response[i].userId).avatar}" alt="image" class="phong5">
                                    </figure>
                                    <div class="clearfix phong6"></div>
                                    <h4 class="fw-700 font-xsss phong7">${GetUser(response[i].userId).fullName}</h4>
                                    <p class="fw-500 font-xsssss text-grey-500 phong8">${GetUser(response[i].userId).userInfo.email}</p>
                                    <a style="background-color:green" name="${GetUser(response[i].userId).userId}" href="https://localhost:7261/profile" class="profile phong9 mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ls-3 d-inline-block rounded-xl font-xsssss fw-700 ls-lg text-white">View Profile</a>
                                </div>
                            </div>
                        </div>`
                CheckRequest(GetUser(response[i].userId).userId);
                CheckWaiting(GetUser(response[i].userId).userId);
            }
            $('#searchresult').html(str);
        }
    })
}
function CheckUserBlockMe(id) {
    var check;
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/users-blocks-me',
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
            console.log(response);
            check = false;
            const len = response.length;
            for (var i = 0; i < len; i++) {
                if (response[i].userId === id) {
                    check = true;
                    break;
                }
            }
            console.log(check);
        }
    })
    return check;
}
function CheckBlock(id) {
    var check;
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
            console.log(response);
            check = false;
            const len = response.length;
            for (var i = 0; i < len; i++) {
                if (response[i].userTargetIduserId === id) {
                    check = true;
                    break;
                }
            }
            console.log(check);
        }
    })
    return check;
}
function CheckRequest(id) {
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/requests-user',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (response) {
            console.log(response);
            const len = response.length;
            for (var i = 0; i < len; i++) {
                if (response[i].userTargetIduserId === id) {
                    document.getElementsByName(id)[0].style.backgroundColor = "yellow";
                }
            }
        }
    })
}
function CheckWaiting(id) {
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/friend-requests',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (response) {
            console.log(response);
            const len = response.length;
            for (var i = 0; i < len; i++) {
                if (response[i].userTargetIduserId === id) {
                    document.getElementsByName(id)[0].style.backgroundColor = "blue";
                }
            }
        }
    })
}