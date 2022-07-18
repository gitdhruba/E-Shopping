var CartList = document.getElementById("CartList")
var PlaceOrder = document.getElementById("Placeorder")

PlaceOrder.addEventListener("click", PlaceCartOrder)
// window['my'] = document.getElementById("Searchbar").value
// var searchvalue = document.getElementById("Searchbar").value
// localStorage.setItem('searchvalue', searchvalue);

const DisplayCarts = async() => {
    const response = await fetch("/api/user/private/getcartdata");
    if (response.status !== 200) {
        console.log("cannot fetch data");
    }
    let data = await response.json();
    var price = 0;
    data.forEach((ele) => {
        price = price + ele.Totalprice
    });
    console.log(data);
    console.log(price);
    if(price){
        document.getElementById("totalprice").innerHTML = "total price: "+price;
        document.getElementById("Placeorder").innerHTML = "Place Order";
    }
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
    time.innerText = "Added to cart on " +ele.Time;
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
    removebtn.innerText = "Remove from cart"
    removebtn.addEventListener("click", function(){RemoveCart(this.id)})
    card.appendChild(removebtn)

    CartList.appendChild(card)
    console.log(card)
}

async function RemoveCart(id){
    t = document.getElementById("time "+id).value
    console.log(t)
    const response = await fetch("/api/user/private/deletefromcart", {
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
        alert("an error occured while removing item from cart")
    } else {
        alert("cart item removed successfully")
        window.location.href = "carts.html"
    }
}

async function PlaceCartOrder(){

    const response = await fetch("/api/user/private/placecartorders");
    if (response.status !== 200) {
        console.log("cannot fetch data");
    }

    var data = await response.json();

    if(data.length){
        alert("some oreders could not be placed")
        while(CartList.firstChild){
            CartList.removeChild(CartList.lastChild);
        }
        document.getElementById("totalprice").innerHTML = "These Orders could not be placed";

        data.forEach((ele) => {
            var card = document.createElement("div");
           card.className = "card m-2";
           var img = document.createElement("img");
           img.src = "/assets/images/download.jpeg";
           img.alt = "BookImg";
           card.appendChild(img);
           var bookname = document.createElement("p");
           bookname.className = "text-center p-1 m-1"
           bookname.innerText = ele.Bookname;
          // bookname.id = "book "+ele.Bookid;
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
          // time.id = "time "+ele.Bookid
           time.innerText = "Added to cart on " +ele.Time;
           time.value = ele.Time
           card.appendChild(time)
           var msg = document.createElement("p");
           msg.className = "text-center p-1 m-1"
           msg.innerText = "Currently out of stock";
           card.appendChild(msg)

           CartList.appendChild(card)
        })
    } 
    else {
        alert("orders placed successfully")
        while(CartList.firstChild){
            CartList.removeChild(CartList.lastChild);
        }
        document.getElementById("totalprice").innerHTML = "All Orders are placed successfully"

    }
}