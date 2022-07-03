let token = ""
function showLogin() {
    let but = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onclick="login()">Login</button>`
    document.getElementById("register").innerHTML = ""
    document.getElementById("but").innerHTML = but
}

function showRegister() {
    let str =  `<label for="confirmPassword"> Confirm Password</label>
                        <input type="password" class="form-control" id="confirmPassword">`
    let but = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onclick="register()">Register</button>`
    document.getElementById("register").innerHTML = str
    document.getElementById("but").innerHTML = but
}

function register() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
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
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let user = {
        username : username,
        password : password
    }
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
            let notification = "Successful login."
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