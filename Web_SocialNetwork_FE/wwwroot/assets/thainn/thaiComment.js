window.onload = function () {
    //GetAllComments();
    const closeBtn = document.querySelector(".close");
    // Add an event listener to the close button to hide the modal
    closeBtn.addEventListener("click", () => {
        const modal = document.querySelector("#commentModal");
        modal.style.display = "none";
    });
    window.onclick = function (event) {
        const modal = document.querySelector("#commentModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    GetAllOnReady();
    
};
userId = localStorage.getItem("userId");

function GetAllComments(postId) {
    const modalOpenBtns = document.querySelectorAll(".open-modal");
    const modal = document.querySelector("#commentModal");

    modalOpenBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            modal.style.display = "block";
        });
    });
    $.ajax({
        url: 'https://localhost:7131/v1/api/Comment/posts/' + postId,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (reponse) {
            let cmt = "";
            let username = "";
            let avatar = "";
            // postId=reponse.postId;
            const commentCount = reponse.length;
            for (let i = 0; i < commentCount; ++i) {
                $.ajax({
                    url: 'https://localhost:7131/v1/api/users/' + reponse[i].userId,
                    method: 'GET',
                    contentType: 'json',
                    dataType: 'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    async: false,
                    success: function (user) {
                        username = user.fullName;
                        avatar = user.avatar;
                        console.log(username);
                    }
                });
                cmt += `<div class="comment-view">
                            <div class="user-info">
                                <img src="${avatar}" alt="User Avatar" />
                            <div class="username-and-timestamp">
                                <span class="username">${username}</span>
                                <span class="timestamp">${FormatTime(reponse[i].commentAt)}</span>
                            </div>
                            </div>
                            <div class="comment-content">
                                <p>
                                ${reponse[i].content}
                                </p>
                            </div>
                            <div class="comment-actions">
                                <p id="like-button-cmt-${reponse[i].commentId}" class="like-button-cmt" onclick="LikeComment(${reponse[i].commentId}, '${reponse[i].postId}')">Like</p>

                                <p class="edit-button" onclick="EditComment(${reponse[i].commentId}, '${reponse[i].postId}')">Edit</p>
                                <p class="reply-button" onclick="CheckBeforeDeleteComment(${reponse[i].commentId}, '${reponse[i].postId}')">Delete</p>
                            </div>
                        </div>`
            }
            GetAllOnReady();
            document.getElementById('CommentList').innerHTML = cmt;
        }
    })
}



function FormatTime(commentAt) {
    let time = commentAt;
    let ftime = new Date(time);
    let options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    let dtime = ftime.toLocaleTimeString("en-us", options);
    //console.log(dtime);
    return dtime;
}


function AddNewComment(postId) {
    let content = document.getElementById("comment-text").value;
    if (content == "") {
        alert("Please enter comment content!");
        return;
    }
    var currentdate = new Date();
    var datetime = currentdate.toISOString();
    $.ajax({
        url: 'https://localhost:7131/v1/api/Comment/posts/' + postId,
        method: 'POST',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            likeCount: 0,
            commentAt: datetime,
            content: content,
            postId: postId,
            userId: userId
        }),
        success: function (response) {
            console.log(response);
            document.getElementById("comment-text").value = '';
            GetAllComments(postId);
        },
        error: function (response) {
            alert("Comment của bạn có những từ ngữ nhạy cảm, xúc phạm hoặc gây hiểu lầm");
            document.getElementById('comment-text').value = "";
        }
    });
}

function LikeComment(commentId, postId) {
    let likeButton = $(`#like-button-cmt-${commentId}`);

    if (likeButton.hasClass("liked")) {
        DeleteLikeComment(commentId);
       
        likeButton.removeClass("liked");
    } else {
        likeButton.addClass("liked");
        AddLikeToComment(commentId, postId);
        
        $(`.like-button-cmt:not(#like-button-cmt-${commentId})`).removeClass("liked");
    }
}



function AddLikeToComment(commentId, postId) {
    var currentdate = new Date();
    var datetime = currentdate.toISOString();

    $.ajax({
        url: 'https://localhost:7131/v1/api/Like/cmts/' + commentId,
        method: "Post",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            userId: userId,
            postId: postId,
            likeAt: datetime,
            commentId: commentId
        }),
        //async:false,
        error: function (response) {
            //alert("Error!")
            console.log(response);
        },
        success: function (response) {
            //console.log(response);
            LikeCommentCount(commentId);
            //alert("Thanh Cong!")
        },
    })
}

function DeleteLikeComment(commentId) {
    $.ajax({
        url: 'https://localhost:7131/v1/api/Like/cmts/' + commentId + '?userId=' + userId,
        method: 'Delete',
        contentType: 'json',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        //async: false,
        error: function (reponse) {
            //alert("Error");
        },
        success: function (reponse) {
            LikeCommentCount(commentId);
        },
    })
}
function GetAllCommentLike(commentId, callback) {
    $.ajax({
        url: 'https://localhost:7131/v1/api/Like/cmt/' + commentId + '/likes',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (respone) {
            let commentLikeCount = respone.length;
            callback(commentLikeCount);
        }
    })

}

function LikeCommentCount(commentId) {
    GetAllCommentLike(commentId, function (commentLikeCount) {
        console.log(commentLikeCount);
        let likeButton = document.getElementById(`like-button-cmt-${commentId}`);
        likeButton.textContent = `Like ${commentLikeCount}`;
    });
}

function EditComment(commentId, postId) {
    let content = "";
    $.ajax({
        url: 'https://localhost:7131/v1/api/Comment/' + postId + '/' + commentId,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (reponse) {
            if (commentId == reponse.commentId && reponse.userId == userId) {
                content = reponse.content;
                $("#comment-text").val(content);
                setTimeout(function () {
                    DeleteComment(commentId, postId);
                }, 3000); // 3 second delay
            } else {
                alert("You don't have permission to perform this action!");
            }
        },
    });
}


function CheckBeforeDeleteComment(commentId, postId) {
    //console.log('ok');
    $.ajax({
        url: 'https://localhost:7131/v1/api/Comment/' + postId + '/' + commentId,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (reponse) {
            if (commentId == reponse.commentId && reponse.userId == userId) {
                if (confirm("Are you sure you want to delete this comment?")) {
                    DeleteComment(commentId, postId);

                }
            }
            else {
                alert("You don't have permission to perfom this action!");

            }

        }
    })
}

function DeleteComment(commentId,postId) {
    $.ajax({
        url:'https://localhost:7131/v1/api/Like/cmts/'+postId+'/'+commentId,
        method: 'Delete',
        contentType: 'json',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (reponse) {
            $.ajax({
                url: 'https://localhost:7131/v1/api/Comment/posts/' + postId + '/' + commentId,
                method: 'Delete',
                contentType: 'json',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                success: function (reponse) {
                    GetAllComments(postId);
                },
            })
        },
    })
}




function GetAllPostComment(postId, callback) {
    $.ajax({
        url: 'https://localhost:7131/v1/api/Comment/posts/' + postId,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },

        success: function (respone) {
            let commentCount = respone.length;
            callback(commentCount);
        }
    })
};

function CommentCount(postId) {
    GetAllPostComment(postId, function (commentCount) {
        console.log(commentLikeCount);
        let commentButton = document.getElementById(`comment-button-cmt-${commentId}`);
       commentButton.textContent = `Comment ${commentCount}`;
    });
}

function GetAllOnReady() {
    $.ajax({
        url: 'https://localhost:7131/v1/api/Posts',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (respone) {
            const postCount = reponse.length;
            for (let i = 0; i < postCount; ++i){
                CommentCount(postId);
                LikePostCount(postId);
            }
        }
    })
}

