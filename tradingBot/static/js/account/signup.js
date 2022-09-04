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



function loginTry(e) {
    e.preventDefault();
    let formData = new FormData(document.forms.person);
    console.log(password.value)
    console.log(email.value)
    formData.append("email", email.value);
    formData.append("password", password.value);

    // send it out
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/users/a/a");
    xhr.send(formData);
    xhr.onload = () => {
        let resp = JSON.parse(xhr.response)
        if (resp.email == email.value) {
            window.location.href = "http://127.0.0.1:8000/login"
        } else {
            alert("yor username already taken")
        }
    }
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;