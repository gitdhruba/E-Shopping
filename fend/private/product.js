var bookname = document.getElementById("bookname");
var availableqnt = document.getElementById("avlqnt");
var qntinput = document.getElementById("qntinput");
var addtocart = document.getElementById("addtocart");
var purchase = document.getElementById("purchase");
var price = document.getElementById("price")
var id;
var qnt;

addtocart.addEventListener("click", Addtocart);
purchase.addEventListener("click", Purchase);

const DisplayBook = async() => {
    const response = await fetch("/api/user/private/showbook");
       if (response.status !== 200) {
           console.log("cannot fetch data");
       }
    let data = await response.json();

    id = data.Bookid;
    bookname.innerText = data.Bookname;
    price.innerText = "Rs. "+data.Price;
    availableqnt.innerText = "Available Quantity: "+data.Quantity;
}

async function Addtocart(){
    qnt = qntinput.value
    //console.log(quantity)
    if(qnt < 1){
        alert("invalid quantity")
    }else{
        console.log(qnt)
        const response = await fetch("/api/user/private/addtocart", {
            method: 'POST',
            body: JSON.stringify({
                bookid: Number(id),
                quantity: Number(qnt),
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
            alert(data.msg)
        } else {
            alert("Item added to cart")
            window.location.href = "carts.html"
        }
    }
}

async function Purchase(){
    qnt = qntinput.value
    //console.log(quantity)
    if(qnt < 1){
        alert("invalid quantity")
    }else{
        console.log(qnt)
        const response = await fetch("/api/user/private/addentry", {
            method: 'POST',
            body: JSON.stringify({
                bookid: Number(id),
                quantity: Number(qnt),
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
            alert("Order Could not be placed")
        } else {
            window.location.href = "orders.html"
        }
    }
}