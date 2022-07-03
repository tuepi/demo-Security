let token = ""

function register() {
    let username = document.getElementById("orangeForm-name").value
    let password = document.getElementById("passwordRe").value
    let confirmPassword = document.getElementById("confirmPassword").value
    let user = {
        username : username,
        password : password,
        confirmPassword : confirmPassword
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/register",
        data: JSON.stringify(user),
        success: function () {
            let notification = "Your account has been created successfully."
            document.getElementById("notification").innerHTML = notification
            $('#exampleModal').modal('hide');
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
        },
        error: function (error) {
            console.log(error)
        },
    })
}

function login() {
    let username = document.getElementById("defaultForm-email").value
    let password = document.getElementById("defaultForm-pass").value
    let user = {
        username : username,
        password : password
    }
    console.log(user)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/login",
        data: JSON.stringify(user),
        success: function (data) {
            token = data.accessToken
            showPageUser()
            let notification = "Successful login."
            document.getElementById("notification").innerHTML = notification
            $('#modalLoginForm').modal('hide');
            $("#myModal").modal('show');
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 1000);
        },
        error: function (error) {
            console.log(error)
        },
    })
}

function checkToken(token) {
    if (token != "") {
        findAll()
    }
}

function findAll() {

    $.ajax({
        headers:{
            Authorization: 'Bearer ' + token
        },
        type: "GET",
        url: "http://localhost:8000/admin/users",
        success: function (data) {
            display(data)
        },
        error: function (error) {
            console.log(error)
            alert("bạn không vào được trang này")
        },
    })
}

function display(data) {
    let str = `<table class="table">
    <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Id</th>
        <th scope="col">Username</th>
        <th scope="col">Password</th>
    </tr>
    </thead>
    <tbody>`
    for (let i = 0; i < data.length; i++) {
        str += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${data[i].id}</td>
        <td>${data[i].username}</td>
        <td>${data[i].password}</td>
    </tr>`
    }
    str += `</tbody>
</table>`
    document.getElementById("display").innerHTML = str
}



const $body = $("body");
const $header = $(".page-header");
const $navCollapse = $(".navbar-collapse");
const scrollClass = "scroll";

$(window).on("scroll", () => {
    if (this.matchMedia("(min-width: 992px)").matches) {
        const scrollY = $(this).scrollTop();
        scrollY > 0
            ? $body.addClass(scrollClass)
            : $body.removeClass(scrollClass);
    } else {
        $body.removeClass(scrollClass);
    }
});

$(".page-header .nav-link, .navbar-brand").on("click", function(e) {
    e.preventDefault();
    const href = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(href).offset().top - 71
    }, 600);
});
