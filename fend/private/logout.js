const logout = document.getElementById("logout");

logout.addEventListener('click',logoutfunc);

function logoutfunc() {
    window.location.replace("http://127.0.0.1:8000/");
}
