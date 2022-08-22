function loginTry(e) {
    e.preventDefault();
    console.log("nima fa")
}
const request = new XMLHttpRequest();
const url = 'http://localhost:5000/movies';
request.open("GET", url);
request.send();

request.onload = (e) => {
    alert(request.response);
}