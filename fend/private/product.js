var bookname = document.getElementById("bookname");
var availableqnt = document.getElementById("avlqnt");
var qntinput = document.getElementById("qntinput");
var addtocart = document.getElementById("addtocart");
var purchase = document.getElementById("purchase");
var price = document.getElementById("price")
var similarproducts = document.getElementById("similar-product-container")
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

    id = data.selectedbook.Bookid;
    bookname.innerText = data.selectedbook.Bookname;
    price.innerText = "Rs. "+data.selectedbook.Price;
    availableqnt.innerText = "Available Quantity: "+data.selectedbook.Quantity;

    //console.log(data.relatedbooks)
    if(data.relatedbooks.length){
    
        //create arrows
        var left_btn = document.createElement("button")
        left_btn.className = "pre-btn"
        var img = document.createElement("img")
        img.src = "./assets/images/arrow.png"
        img.alt = ""
        left_btn.appendChild(img)
        similarproducts.appendChild(left_btn)
        var right_btn = document.createElement("button")
        right_btn.className = "nxt-btn"
        var img = document.createElement("img")
        img.src = "./assets/images/arrow.png"
        img.alt = ""
        right_btn.appendChild(img)
        similarproducts.appendChild(right_btn)

        //create cards
        data.relatedbooks.forEach((ele) => {
            
            var productcard = document.createElement("div")
            productcard.className = "product-card"

            var productimage = document.createElement("div")
            productimage.className = "product-image"
            var newtag = document.createElement("span")
            newtag.className = "discount-tag"
            newtag.innerText = "NEW"
            productimage.appendChild(newtag)
            var img = document.createElement("img")
            img.src = "./assets/images/download.jpeg"
            img.className = "product-thumb"
            img.alt = ""
            productimage.appendChild(img)
            var showproductbtn = document.createElement("button")
            showproductbtn.className = "card-btn"
            showproductbtn.innerText = "Show Product"
            showproductbtn.id = ele.Bookid
            showproductbtn.addEventListener("click",function(){GotoProductpage(this.id)})
            productimage.appendChild(showproductbtn)
            productcard.appendChild(productimage)

            var productinfo = document.createElement("div")
            productinfo.className = "product-info"
            var productname = document.createElement("h3")
            productname.className = "product-brand"
            productname.innerText = ele.Bookname
            productinfo.appendChild(productname)
            var shortdes = document.createElement("p")
            shortdes.className = "product-short-des"
            shortdes.innerText = "a short line about this product"
            productinfo.appendChild(shortdes)
            var price = document.createElement("span")
            price.className = "price"
            price.innerText = "Rs. " +ele.Price
            productinfo.appendChild(price)
            productcard.appendChild(productinfo)

            similarproducts.appendChild(productcard)

        });
        
    }
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

async function GotoProductpage(id) {
    const response = await fetch("/api/user/private/createbookcookie", {
        method: 'POST',
        body: JSON.stringify({
            bookid: id,
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    if(response.status !== 200) {
        console.log("cannot fetch data");
    }
    let data = await response.json();
    if(data.error){
        console.log("cookie could not be created");
    } else {
        //window.location.href = "product.html";
        location.reload();
    }
}