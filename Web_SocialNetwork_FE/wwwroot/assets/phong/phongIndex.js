$(document).ready(function () {
    GetFriendRequest();
    var x = document.getElementsByClassName('namefriendrequest');
    for (let i = 0; i < x.length; i++) { 
        x[i].addEventListener("click", function () {
            localStorage.setItem("userTargetId", x[i].getAttribute('name'));
        })  
    }
});
function GetUser(id) {
    let data;
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/'+id+'/profile',
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
function GetFriendRequest() {
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/friend-requests',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
        },
        success: function (reponse) {
            const len = reponse.length;
            console.log(reponse);
            let table = '';
            for (var i = 0; i < len; ++i) {
                var user = GetUser(reponse[i].userTargetIduserId);
                table += `<div
                    class="card-body d-flex pt-4 ps-4 pe-4 pb-0 border-top-xs bor-0">
                    <figure class="avatar me-3">
                        <img
                            src="${user.avatar}"
                            alt="image"
                            class="shadow-sm rounded-circle w45"/>
                    </figure>
                    <a href="https://localhost:7261/profile"><h4 style="cursor:pointer" name="${user.userId}" class="namefriendrequest fw-700 text-grey-900 font-xssss mt-1">
                                        ${user.fullName}
                        <span
                            class="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                            ${user.userInfo.email}
                        </span
                        >
                    </h4></a>
                </div>
                <div
                    class="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                    <a
                        onclick="AcceptFriendRequest('${user.userId}');"
                        style="cursor:pointer"
                        class="p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">
                        Accept
                    </a
                    >
                    <a
                        onclick="RejectFriendRequest('${user.userId}');"
                        style="cursor:pointer"
                        class="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl">
                        Reject
                    </a>
                </div>`;
            }
            $('#friendrequest').html(table);
        },
        fail: function (response) {
        }
    });
}
function AcceptFriendRequest(id) {
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/friend-request/'+id+'/accept',
        method: 'PUT',
        contentType: 'json',
        xhrFields: {
            withCredentials: true
        },
        error: function (reponse) {
        },
        success: function (reponse) {
            console.log(reponse);
            GetFriendRequest();
        }
    });
}
function RejectFriendRequest(id) {
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/friend-requests/'+id+'/reject',
        method: 'DELETE',
        contentType: 'json',
        xhrFields: {
            withCredentials: true
        },
        error: function (reponse) {
        },
        success: function (reponse) {
            console.log(reponse);
            GetFriendRequest();
        }
    })
}
