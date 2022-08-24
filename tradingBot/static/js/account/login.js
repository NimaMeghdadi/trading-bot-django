function loginTryy(e) {
    e.preventDefault();
    console.log("nima fa")
}
var email = document.getElementById("email"),
    password = document.getElementById("password")

function loginTry(e) {
    e.preventDefault();
    const request = new XMLHttpRequest();
    console.log(password.value)
    console.log(email.value)
    const url = 'http://127.0.0.1:8000/users/' + email.value + '/' + password.value + '';
    request.open("GET", url);
    request.send();

    request.onload = (e) => {
        alert(request.response);
    }
}