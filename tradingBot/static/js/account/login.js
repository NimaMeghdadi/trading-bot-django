var email = document.getElementById("email"),
    password = document.getElementById("password")

// var empty = { "id": 0, "email": ' ', "first_name": ' ', "last_name": '', "money": 0, "bitcoin": 0 }
// localStorage.setItem("respLocalStorage", empty);

function loginTry(e) {
    e.preventDefault();
    const request = new XMLHttpRequest();
    // localStorage.setItem("emailLocalStorage", email.value);

    console.log(password.value)
    console.log(email.value)
    const url = 'http://127.0.0.1:8000/users/' + email.value + '/' + password.value + '';
    request.open("GET", url);
    request.send();

    request.onload = (e) => {
        // console.log(request.response);
        console.log(JSON.parse(request.response));
        let resp = JSON.parse(request.response)
        if (resp.id) {
            localStorage.setItem("person_info", request.response);
            window.location.href = "http://127.0.0.1:8000/"
        }
    }
}