window.onload = function () {
    //GetAllComments();
    const closeBtn = document.querySelector(".close");
    // Add an event listener to the close button to hide the modal
    closeBtn.addEventListener("click", () => {
        const modal = document.querySelector("#report-dialog");
        modal.style.display = "none";
    });
    window.onclick = function (event) {
        const modal = document.querySelector("#report-dialog");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};
userId = localStorage.getItem("userId");
function OpenReportDialog() {
    const modalOpenBtns = document.querySelectorAll("#report-btn");
    const modal = document.querySelector("#report-dialog");

    modalOpenBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            modal.style.display = "block";
        });
    });
}
function SubmitReport(postId) {
    event.preventDefault();
    var reportReason = $('input[name="report-reason"]:checked').val();
    if (reportReason == "") {
        alert("Please Choose One Reason To Report!");
        return;
    }
    //var reportComment = $('textarea[name="report-comment"]').val();

    // TODO: Send report to server
    console.log(reportReason);
    const modal = document.querySelector("#report-dialog");
    $.ajax({
        url: 'https://localhost:7131/v2/api/Report/' + postId,
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify({
            userId: userId,
            postId: postId,
            reportContent: reportReason
        }),
        success: function (respone) {
            modal.style.display = "none";
            alert("Thank You, Your Report Will Be Processed Soon!");
            CheckReportCount();
        }
    })
    
};

function CheckReportCount() {
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
            for (let i; i < postCount; ++i) {
                DeletePostServer(respone[i].postId);
            }
        }
    })
}

function DeletePostServer(postId) {
    $.ajax({
        url: 'https://localhost:7131/v2/api/Report/'+postId,
        method: 'DELETE',
        contentType: 'json',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (respone) {

        }
    })
}

//function CheckBeforeDeletePost(postId) {
//    $.ajax({
//        url: 'https://localhost:7131/v2/api/Report/' + postId,
//        method: 'GET',
//        contentType: 'json',
//        dataType: 'json',
//        xhrFields: {
//            withCredentials: true
//        },
//        success: function (respone) {
//            let reportCount = respone.length;
//            if (reportCount > 3) {
//                DeletePostImage(postId);
//                DeletePostComment(postId);
//                DeletePostLike(postId);
//                DeletePost(postId);
//            }
//        }
//    })
//};


//function DeletePostComment(postId) {

//};


//function DeletePostLike(postId) {
//    $.ajax({
//        url: '' + postId,
//        method: 'DELETE',
//        contentType: 'json',
//        dataType: 'json',
//        xhrFields: {
//            withCredentials: true
//        },

//        success: function (respone) {

//        }
//    })
//}

//function DeletePostImage(postId) {
//    $.ajax({
//        url: 'https://localhost:7131/vi/api/Image/' + postId,
//        method: 'DELETE',
//        contentType: 'json',
//        dataType: 'json',
//        xhrFields: {
//            withCredentials: true
//        },

//        success: function (respone) {

//        }
//    })
//};


//function DeletePost(postId) {
//    $.ajax({
//        url: 'https://localhost:7131/v1/api/Posts/' + postId,
//        method: 'DELETE',
//        contentType: 'json',
//        dataType: 'json',
//        xhrFields: {
//            withCredentials: true
//        },

//        success: function (respone) {

//        }
//    })
//};



//function GetAllPostLike(postId, callback) {
//    $.ajax({
//        url: 'https://localhost:7131/v1/api/Posts/' + postId +'/likes/users',
//        method: 'GET',
//        contentType: 'json',
//        dataType: 'json',
//        xhrFields: {
//            withCredentials: true
//        },

//        success: function (respone) {
//            let postLikeCount = respone.length;
//            callback(postLikeCount);
//        }
//    })
//};



