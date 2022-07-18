var CartList = document.getElementById("OrderList")
// window['my'] = document.getElementById("Searchbar").value
// var searchvalue = document.getElementById("Searchbar").value
// localStorage.setItem('searchvalue', searchvalue);

const DisplayOrders = async() => {
    const response = await fetch("/api/user/private/getpurchasedata");
    if (response.status !== 200) {
        console.log("cannot fetch data");
    }
    let data = await response.json();
    console.log(data[1])

    data.forEach(ele => {
        //Creating Card
        CreateCards(ele);

    });

};

//var quantity



function CreateCards(ele) {
    var card = document.createElement("div");
    card.className = "card m-2";
    var img = document.createElement("img");
    img.src = "/assets/images/download.jpeg";
    img.alt = "BookImg";
    card.appendChild(img);
    var bookname = document.createElement("p");
    bookname.className = "text-center p-1 m-1"
    bookname.innerText = ele.Bookname;
    bookname.id = "book "+ele.Bookid;
    card.appendChild(bookname)
    var quantity = document.createElement("p");
    quantity.className = "text-center p-1 m-1"
    quantity.innerText = "Selected Quantity : " +ele.Quantity;
    card.appendChild(quantity)
    var bookprice = document.createElement("p");
    bookprice.className = "text-center p-1 m-1"
    bookprice.innerText = "Rs." + ele.Totalprice;
    card.appendChild(bookprice)
    var time = document.createElement("p");
    time.className = "text-center p-1 m-1"
    time.id = "time "+ele.Bookid
    time.innerText = "Order placed on " +ele.Time;
    time.value = ele.Time
    card.appendChild(time)
    /*var quaninp = document.createElement("div");
    quaninp.className = "mb-3 mx-3"
    var inp = document.createElement("input");
    inp.type = "number"
    inp.className = "form-control";
    inp.id = "qntinp"
    inp.placeholder = "Enter Quantity required"
    quaninp.appendChild(inp);
    card.appendChild(quaninp)
    var buybtn = document.createElement("button")
    //buybtn.href = "javascript:void(0)"
    buybtn.id = ele.Bookid
    buybtn.className = "btn btn-outline-primary text-center mx-5 my-1 d-inline-block"
    buybtn.innerText = "Buy Now"
    buybtn.onclick = "senddata()"
    console.log(buybtn)
    card.appendChild(buybtn)*/
    var removebtn = document.createElement("a")
    removebtn.href = "javascript:void(0)"
    removebtn.id = ele.Bookid
    removebtn.className = "btn btn-outline-warning text-center mx-5 my-1 d-inline-block"
    removebtn.innerText = "Cancel Order"
    removebtn.addEventListener("click", function(){CancelOrder(this.id)})
    card.appendChild(removebtn)

    CartList.appendChild(card)
    console.log(card)
}

async function CancelOrder(id){
    t = document.getElementById("time "+id).value
    console.log(t)
    const response = await fetch("/api/user/private/deleteentry", {
        method: 'POST',
        body: JSON.stringify({
            bookid: Number(id),
            time: t,
        }),
        headers: {
            'Content-Type':'application/json'
        }
    });
    if (response.status !== 200) {
       console.log("cannot fetch data");
    }
    let data = await response.json();
    if(data.error){
        console.log(data)
        alert("an error occured while cancelling the order")
    } else {
        console.log("order cancelled successfully")
        window.location.href = "orders.html"
    }
}