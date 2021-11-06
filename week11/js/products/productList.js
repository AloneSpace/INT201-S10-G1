import stationeries from "../stationeries.js";

const productsEle = document.querySelector("#products");

for (let stationery of stationeries) {
        let divProductEle = document.createElement("div");
        divProductEle.setAttribute("id", stationery.id);
        divProductEle.className =
            "w-56 md:w-72 bg-white mt-20 shadow-lg rounded-lg overflow-hidden";
        let divProductName = appendProductName(stationery);
        let divImgProduct = appendImgProduct(stationery);
        let divProductDetail = appendProductDetail(stationery);
    
        divProductEle.appendChild(divProductName);
        divProductEle.appendChild(divImgProduct);
        divProductEle.appendChild(divProductDetail);
        productsEle.appendChild(divProductEle);
}

function appendProductName(stationery) {
    let divProductName = document.createElement("div");
    divProductName.className =
        "py-2 text-center font-bold uppercase tracking-wide text-gray-800";
    divProductName.setAttribute("id" , "name");
    divProductName.textContent = stationery.name;
    return divProductName;
}

function appendProductDetail(stationery) {
    let divProductDetail = document.createElement("div");
    divProductDetail.className =
        "flex items-center justify-between py-2 px-3 bg-gray-400";
    let divPriceEle = appendDivPriceEle(stationery);
    let addToCartBtn = document.createElement("button");
    addToCartBtn.setAttribute("id", stationery.name);
    addToCartBtn.addEventListener("click", ()=>{
        let addproduct = addToCartBtn.getAttribute('id')
        if(!incart.includes(addproduct)){
            alert(`${addproduct} added inn your cart`);
        }
        incartEle.textContent =  ++count;
        incart.push(addproduct);
        console.log(incart);
    },false);
    addToCartBtn.className =
        "bg-green-500 text-xs text-white px-2 py-1 font-semibold rounded uppercase hover:bg-green-600";
    addToCartBtn.textContent = "เพิ่มลงในตะกร้า";
    divProductDetail.appendChild(divPriceEle);
    divProductDetail.appendChild(addToCartBtn);
    return divProductDetail;
}

function appendDivPriceEle(stationery) {
    let divPriceEle = document.createElement("div");
    let priceEle = document.createElement("h2");
    priceEle.className = "text-gray-800 font-bold";
    priceEle.textContent = `${stationery.price} THB`;
    let stockEle = document.createElement("h4");
    stockEle.className = "text-gray-800 font-bold text-xs";
    stockEle.textContent = `(Instock: ${stationery.stock})`;
    divPriceEle.appendChild(priceEle);
    divPriceEle.appendChild(stockEle);
    return divPriceEle;
}

function appendImgProduct(stationery){
    let divImgProduct = document.createElement("div");
    divImgProduct.className = 
        "max-w-sm rounded overflow-hidden shadow-lg";
    let ImgEle = document.createElement("img");
    ImgEle.className = "w-full";
    ImgEle.src = stationery.srcimg;
    ImgEle.style = "height:300px";
    divImgProduct.appendChild(ImgEle);
    return divImgProduct;
}


const incartEle = document.querySelector("#incart");
const carts = document.querySelector("#carts");

let count = 0;
incartEle.textContent = count;
let incart = [];

let btn = document.getElementById("shownavbar");
let cilcks = false; 
let navbar = document.getElementById("searchbar");
btn.addEventListener("click" , ()=>{
    if(cilcks){
        navbar.style.display = "none";
        cilcks = false;
    }else{
        navbar.style.display = "";
        cilcks = true;
    }
},false);

let inp = document.getElementById("search");

inp.addEventListener("keyup" , ()=>{
    buttonC();
},false)

let result = stationeries.filter(text => text.name.includes(""));

//ปุ่ม search
function buttonC(){
    let x = document.getElementById("search").value.toLowerCase();
    result = stationeries.filter(text => text.name.toLowerCase().includes(`${x}`));
    console.log(result.length == 0);
    let divProduct = productsEle.children;
    console.log(result);
    if(result.length == 0){
        for(let a of divProduct){
            a.style.display = "none";
        }
    }else{
        for(let a of divProduct){
            for(let e of result){
                if(a.id == e.id){
                    a.style.display = "";
                    break;
                }else{
                    a.style.display = "none";
                }
            }
        }
    }
}
//เลขตะกร้า
carts.addEventListener("click" , ()=>{
    let a = [];
    incart = a;
    incartEle.textContent = count = 0;
    console.log(incart);
})
