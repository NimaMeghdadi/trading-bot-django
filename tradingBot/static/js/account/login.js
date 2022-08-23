function loginTryy(e) {
    e.preventDefault();
    console.log("nima fa")
}
var email = document.getElementById("email")

function loginTry(e) {
    e.preventDefault();
    const request = new XMLHttpRequest();
    console.log(email.value)
    const url = 'http://127.0.0.1:8000/users/' + email.value + '';
    request.open("GET", url);
    request.send();

    request.onload = (e) => {
        alert(request.response);
    }
}