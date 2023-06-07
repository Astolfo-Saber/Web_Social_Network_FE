const userId = localStorage.getItem('userId');
if (userId === null) {
    window.location.href = 'https://localhost:7261/404';
    console.log(userId)
} else {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== "ADMIN_ROLE") {
        window.location.href = 'https://localhost:7261/403';
    }
}
window.onload = function () {
    loadUsers();
    loadPosts();
    loadPostPerMonth();
}

function loadUsers() {
    $.ajax({
        url: 'https://localhost:7131/v1/api/admin/users',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            $("#count-users").text(data.length);
            console.log(data.length);
        }, error: function (error) {
            if (error.status === 401) {
                window.location.href = 'https://localhost:7261/login';
                return;
            } else if (error.status === 403) {
                window.location.href = 'https://localhost:7261/403';
            }
            window.location.href = 'https://localhost:7261/404';
        }
    });
}
function loadPosts() {
    $.ajax({
        url: 'https://localhost:7131/v2/api/Posts',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            $("#count-posts").text(data.length);
            console.log(data.length);
        }, error: function (error) {
            if (error.status === 401) {
                window.location.href = 'https://localhost:7261/login';
                return;
            } else if (error.status === 403) {
                window.location.href = 'https://localhost:7261/403';
            }
            window.location.href = 'https://localhost:7261/404';
        }
    });
}
function loadPostPerMonth() {
    $.ajax({
        url: 'https://localhost:7131/v2/api/Posts/month/posts',
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            $("#count-posts-per-month").text(data.length);
            console.log(data.length);
        }, error: function (error) {
            if (error.status === 401) {
                window.location.href = 'https://localhost:7261/login';
                return;
            } else if (error.status === 403) {
                window.location.href = 'https://localhost:7261/403';
            }
            window.location.href = 'https://localhost:7261/404';
        }
    });
}
