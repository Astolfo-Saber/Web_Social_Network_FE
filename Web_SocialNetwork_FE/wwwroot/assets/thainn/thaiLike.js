userId = localStorage.getItem("userId");

function addLike(postId) {
    var currentdate = new Date();
    var datetime = currentdate.toISOString();
    $.ajax({
        url: 'https://localhost:7131/v1/api/Like/posts/' + postId,
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            userId: userId,
            postId: postId,
            likeAt: datetime,
            commentId: 2
        }),
        error: function (response) {
            console.log(response);
        },
        success: function (response) {
            console.log(response);
            LikePostCount(postId);
        },
    });
}

function deleteLike(postId) {
    $.ajax({
        url: 'https://localhost:7131/v1/api/Like/posts/' + postId + '?userId=' + userId,
        method: 'DELETE',
        dataType: 'json',
        async:false,
        contentType: 'application/json; charset=utf-8',
        xhrFields: {
            withCredentials: true
        },
        error: function (response) {
            console.log(response);
        },
        success: function (response) {
            console.log(response);
            console.log(LikePostCount(postId));
        },
    });
}

function likePost(postId) {
    const likeButton = $(`#like-button-post-${postId}`);
    if (likeButton.hasClass("liked")) {
        deleteLike(postId);
        likeButton.removeClass("liked");
    } else {
        likeButton.toggleClass("liked");
        addLike(postId);
        $(`.like-button-post:not(#like-button-post-${postId})`).removeClass("liked");
    }
}

function GetAllPostLike(postId, callback) {
    $.ajax({
        url: 'https://localhost:7131/v1/api/Posts/' + postId + '/likes/users',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },

        success: function (respone) {
            let postLikeCount = respone.length;
            callback(postLikeCount);
        },
        error: function (respone) {
            let likeButton = document.getElementById(`like-button-post-${postId}`);
            likeButton.textContent = `Like`;
        }
    })
};

function LikePostCount(postId) {
   GetAllPostLike(postId, function (postLikeCount) {
        let likeButton = document.getElementById(`like-button-post-${postId}`);
        likeButton.textContent = `Like ${postLikeCount}`;
    });
};
