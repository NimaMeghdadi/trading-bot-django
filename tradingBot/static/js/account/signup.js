var password = document.getElementById("password"),
    confirm_password = document.getElementById("confirm_password"),
    email = document.getElementById("email");

function validatePassword() {
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}

function loginTryy(e) {
    e.preventDefault();
    console.log("nima fa")
}

function loginTry(e) {
    e.preventDefault();
    let formData = new FormData(document.forms.person);

    console.log(password.value)
    console.log(email.value)
    formData.append("email", email.value);
    formData.append("password", password.value);

    // send it out
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/users/a");
    xhr.send(formData);

    xhr.onload = () => alert(xhr.response);
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;