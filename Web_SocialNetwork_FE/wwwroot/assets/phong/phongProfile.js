$(document).ready(function () {
    GetDetailUser(localStorage.getItem("userTargetId"));
    GetAllImages(localStorage.getItem("userTargetId"));
    CheckMyProfile();
    CheckFriend();
    CheckBlock();
    CheckFollow();
    CheckRequest();
    CheckWaiting();
});
function CheckMyProfile() {
    if (localStorage.getItem("userTargetId") === localStorage.getItem("userId")) {
        document.getElementById('addfriend').style.display = "none";
        document.getElementById('block').style.display = "none";
        document.getElementById('follow').style.display = "none";
        document.getElementById('message').style.display = "none";
    }
    else
        document.getElementById('postprofile').style.display = "none";
}
function GetDetailUser(id) {
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/' + id + '/profile',
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
            console.log(response.fullName);
            var header = document.getElementById("nameuser");
            var headerText = header.innerHTML;
            headerText = headerText.replace("", response.fullName);
            header.innerHTML = headerText;
            $('#aboutme').html(response.userInfo.aboutMe);
            $('#usermail').html(response.userInfo.email);
            document.getElementById("avatar").src = response.avatar;
            document.getElementById("avatar1").src = response.avatar;
            if (response.coverImage == null) {
                document.getElementById("coverImage").src = "images/u-bg.jpg";
            }
            else {
                document.getElementById("coverImage").src = response.coverImage;
            }
        }
    })
}
function GetAllImages(id) {
    $.ajax({
        url: 'https://localhost:7131/vi/api/Image/' + id + '/Images',
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
            const len = response.length;
            let str = '';
            for (var i = 0; i < len; i++) {
                str += `<div class="col-6 mb-2 pe-1">
                                    <a href="${response[i].url}" data-lightbox="roadtrip">
                                        <img src="${response[i].url}" class="img-fluid rounded-3 w-100">
                                    </a>
                                </div>`
            }
            $('#allimages').html(str);
        }
    })
}
function CheckWaiting() {
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
                if (response[i].userTargetIduserId === localStorage.getItem("userTargetId")) {
                    document.getElementById('addfriend').innerHTML = "Response";
                    document.getElementById('addfriend').style.backgroundColor = "blue";
                }
            }
        }
    })
}
function CheckRequest() {
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
                if (response[i].userTargetIduserId === localStorage.getItem("userTargetId")) {
                    $('#addfriend').html("Waiting");
                    document.getElementById('addfriend').style.backgroundColor = "yellow";
                }
            }
        }
    })
}
function CheckFollow() {
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/follows',
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
                if (response[i].userTargetIduserId === localStorage.getItem("userTargetId")) {
                    $('#follow').html("UnFollow");
                }
            }
        }
    })
}
function CheckBlock() {
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/blocks',
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
                if (response[i].userTargetIduserId === localStorage.getItem("userTargetId")) {
                    $('#block').html("UnBlock");
                    document.getElementById('block').style.backgroundColor = "red";
                    document.getElementById('addfriend').style.display = "none";
                    document.getElementById('follow').style.display = "none";
                }
            }
        }
    })
}
function CheckFriend() {
    $.ajax({
        url: 'https://localhost:7131/v1/api/users/' + localStorage.getItem("userId") + '/friends',
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
                if (response[i].userTargetIduserId === localStorage.getItem("userTargetId")) {
                    $('#addfriend').html("Unfriend");
                }
            }
        }
    })
}
function SendFriendRequest(id) {
    $.ajax({
        url: "https://localhost:7131/v1/api/users/friend-request/" + id,
        method: "POST",
        contentType: "json",
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (response) {
            console.log(response)
            $('#addfriend').html("Waiting");
            document.getElementById('addfriend').style.backgroundColor = "yellow";
            $('#follow').html("UnFollow");
        }
    })
}
function AcceptFriendRequest(id) {
    $.ajax({
        url: "https://localhost:7131/v1/api/users/friend-request/" + id + "/accept",
        method: "PUT",
        contentType: "json",
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (response) {
            console.log(response)
            $('#addfriend').html("Unfriend");
            document.getElementById('addfriend').style.backgroundColor = "green";
            $('#follow').html("UnFollow");
        }
    })
}
function RejectFriendRequest(id) {
    $.ajax({
        url: "https://localhost:7131/v1/api/users/friend-requests/" + id + "/reject",
        method: "DELETE",
        contentType: "json",
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (response) {
            console.log(response)
            $('#addfriend').html("Add Friend");
            document.getElementById('addfriend').style.backgroundColor = "green";
            $('#follow').html("Follow");
        }
    })
}
function CancleFriendRequest(id) {
    $.ajax({
        url: "https://localhost:7131/v1/api/users/friend-requests/" + id + "/cancle",
        method: "DELETE",
        contentType: "json",
        async: false,
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (response) {
            console.log(response)
            $('#addfriend').html("Add Friend");
            document.getElementById('addfriend').style.backgroundColor = "green";
            $('#follow').html("Follow");
        }
    })
}
function Unfriend(id) {
    $.ajax({
        url: "https://localhost:7131/v1/api/users/friends/" + id,
        method: "DELETE",
        contentType: "json",
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (response) {
            console.log(response)
            $('#addfriend').html("Add Friend");
            $('#follow').html("Follow");
        }
    })
}
function Block(id) {
    $.ajax({
        url: "https://localhost:7131/v1/api/users/block/" + id,
        method: "POST",
        contentType: "json",
        async: false,
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (response) {
            console.log(response)
            $('#block').html("UnBlock");
            document.getElementById('block').style.backgroundColor = "red";
            document.getElementById('addfriend').style.display = "none";
            document.getElementById('follow').style.display = "none";
        }
    })
}
function Unblock(id) {
    $.ajax({
        url: "https://localhost:7131/v1/api/users/block/" + id,
        method: "DELETE",
        contentType: "json",
        async: false,
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (response) {
            console.log(response);
            $('#block').html("Block");
            $('#addfriend').html("Add Friend");
            $('#follow').html("Follow");
            document.getElementById('block').style.backgroundColor = "green";
            document.getElementById('addfriend').style.backgroundColor = "green";
            document.getElementById('follow').style.backgroundColor = "green";
            document.getElementById('addfriend').style.display = "block";
            document.getElementById('follow').style.display = "block";
        }
    })
}
function Follow(id) {
    $.ajax({
        url: "https://localhost:7131/v1/api/users/follow/" + id,
        method: "POST",
        contentType: "json",
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (response) {
            console.log(response)
            $('#follow').html("UnFollow");
        }
    })
}
function Unfollow(id) {
    $.ajax({
        url: "https://localhost:7131/v1/api/users/follow/" + id,
        method: "DELETE",
        contentType: "json",
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
            window.location.href = 'https://localhost:7261/404';
        },
        success: function (response) {
            console.log(response);
            $('#follow').html("Follow");
        }
    })
}

document.getElementById('follow').addEventListener("click", function () {
    if (document.getElementById('follow').innerHTML === "UnFollow") {
        Unfollow(localStorage.getItem("userTargetId"));
    }
    else if (document.getElementById('follow').innerHTML === "Follow") {
        Follow(localStorage.getItem("userTargetId"));
    }
})
// Xử lý modal cho block
var modalBlock = document.getElementById("ModalBlock");
document.getElementById("block").onclick = function () {
    if (document.getElementById("block").innerHTML === "Block") {
        $('#notifyBlock').html('Do you want block');
    }
    else {
        $('#notifyBlock').html('Do you want unblock');
    }
    modalBlock.style.display = "block";
}
document.getElementById('confirmBlock').addEventListener("click", function () {
    if (document.getElementById("block").innerHTML === "Block") {
        Block(localStorage.getItem("userTargetId"));
        modalBlock.style.display = "none";
    }
    else if (document.getElementById("block").innerHTML === "UnBlock") {
        Unblock(localStorage.getItem("userTargetId"));
        modalBlock.style.display = "none";
    }
})
document.getElementById('cancleBlock').addEventListener("click", function () {
    modalBlock.style.display = "none";
})
// Xử lý modal cho add friend,cancle,accept,reject friend request và unfriend
var modalFriend = document.getElementById("ModalFriend");
var modalResponseFriend = document.getElementById("ModalResponseFriend");
document.getElementById("addfriend").onclick = function () {
    if (document.getElementById('addfriend').innerHTML === "Add Friend") {
        SendFriendRequest(localStorage.getItem("userTargetId"));
    }
    else if (document.getElementById("addfriend").innerHTML === "Waiting") {
        $('#notifyFriend').html('Do you want cancle friend request');
        modalFriend.style.display = "block";
    }
    else if (document.getElementById("addfriend").innerHTML === "Unfriend") {
        $('#notifyFriend').html('Do you want unfriend');
        modalFriend.style.display = "block";
    }
    else if (document.getElementById("addfriend").innerHTML === "Response") {
        modalResponseFriend.style.display = "block";
    }
}
document.getElementById('confirmFriend').addEventListener("click", function () {
    if (document.getElementById("addfriend").innerHTML === "Waiting") {
        CancleFriendRequest(localStorage.getItem("userTargetId"));
        modalFriend.style.display = "none";
    }
    else if (document.getElementById("addfriend").innerHTML === "Unfriend") {
        Unfriend(localStorage.getItem("userTargetId"));
        modalFriend.style.display = "none";
    }
})
document.getElementById('cancleFriend').addEventListener("click", function () {
    modalFriend.style.display = "none";
})
document.getElementById('acceptrequest').addEventListener("click", function () {
    AcceptFriendRequest(localStorage.getItem("userTargetId"));
    modalResponseFriend.style.display = "none";
})
document.getElementById('rejectrequest').addEventListener("click", function () {
    RejectFriendRequest(localStorage.getItem("userTargetId"));
    modalResponseFriend.style.display = "none";
})
window.onclick = function (event) {
    if (event.target == modalFriend) {
        modalFriend.style.display = "none";
    }
    else if (event.target == modalBlock) {
        modalBlock.style.display = "none";
    }
    else if (event.target == modalResponseFriend) {
        modalResponseFriend.style.display = "none";
    }
}