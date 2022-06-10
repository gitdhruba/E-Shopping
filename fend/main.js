const submit = document.getElementById("submit_btn");
let uname = document.getElementById("username");
//let email = document.getElementById("email");
let password = document.getElementById("password");

console.log(uname.value);


submit.addEventListener('click',Submitfunc);

function Submitfunc(){
    

    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:8000/api/user/signin";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server
            console.log(this.responseText);

        }
    };

    //var data = JSON.stringify({"email": email.value, "username": uname.value, "password": password.value});
    var data = JSON.stringify({"identity": uname.value, "password": password.value});
    
    xhr.send(data);
}