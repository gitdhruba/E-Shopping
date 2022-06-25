const book1 = document.getElementById("buybook1");
const book2 = document.getElementById("buybook2");

book1.addEventListener("click", BuyBook1);
book2.addEventListener("click", BuyBook2);

/*async function BuyBook1() {
    const res = await fetch('/api/user/private/addentry', {
        method: 'POST',
        body: JSON.stringify({
                       bookid: 1,
                       bookname: abc,
                       isbn: B123456,
                       price: 700,
                    }),
                    headers: {
                        'Content-Type':'application/json'
                    }
    })
    const data = res.json();
    console.log(data);
}

async function BuyBook2() {
    const res = await fetch('/api/user/private/addentry', {
        method: 'POST',
        body: JSON.stringify({
                       bookid: 2,
                       bookname: def,
                       isbn: B123466,
                       price: 800,
                    }),
                    headers: {
                        'Content-Type':'application/json'
                    }
    })
    const data = res.json();
    console.log(data);
}*/

function BuyBook1() {
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:8000/api/user/private/addentry";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server
            console.log(this.responseText);
            

        }
    };

    var data = JSON.stringify({
                       bookid: 1,
                       bookname: abc,
                       isbn: B123456,
                       price: 700,
    });

    xhr.send(data);
}

function BuyBook2() {
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:8000/api/user/private/addentry";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server
            console.log(this.responseText);
            

        }
    };

    var data = JSON.stringify({
                       bookid: 2,
                       bookname: def,
                       isbn: B123466,
                       price: 800,
    });

    xhr.send(data);
}
