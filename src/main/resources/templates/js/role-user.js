function showPageUser() {
    let content = `<main class="hm-gradient">
<!--        <div class="container mt-4">-->
            <div class="bg-image" style=" 
                background-image: url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg');
                height: 100vh;">
                 <nav class="mb-4 navbar navbar-expand-lg navbar-dark cyan">
                <a class="navbar-brand font-bold" href="#">Homepage</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent-4" aria-controls="navbarSupportedContent-4"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Technology <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Add</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Laptops</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-5" data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false">Category
                            </a>
                            <div class="dropdown-menu dropdown-purple" aria-labelledby="navbarDropdownMenuLink-5">
                                <a class="dropdown-item" href="#">Technology</a>
                                <a class="dropdown-item" href="#">Fashion</a>
                                <a class="dropdown-item" href="#">Vegetable</a>
                            </div>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#"><i class="fa fa-envelope"></i> Contact <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"><i class="fa fa-gear"></i> Settings</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i> Account </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-cyan"
                                 aria-labelledby="navbarDropdownMenuLink-4" id="account">
                                <a class="dropdown-item" href="#">My Account</a>
                                <a class="dropdown-item" >Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <!--/.Navbar -->
<!--            <hr class="my-4">-->
<div class="row">
    <div class="col-3"></div>
    <div class="col-9">
    <table class="table align-middle mb-0 bg-white">
  <thead class="bg-light">
    <tr>
      <th>No.</th>
      <th>Name</th>
      <th>Price</th>
      <th>Image</th>
      <th>Quantity</th>
      <th>Category</th>
      <th>User</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody id="display">
  </tbody>
</table>
</div>
</div>
</div>
    </main>`
    document.getElementById("content").innerHTML = content
}