import stationeries from "../stationeries.js";

// เลือก node id = products ในหน้า index.html
const productsEle = document.querySelector("#products");

//for of เพื่อวนอ่านค่าแต่ละตัวใน array ของ stationeries
for (let stationery of stationeries) {
        let divProductEle = document.createElement("div"); // สร้าง div เปล่าขึ้นมา
        divProductEle.setAttribute("id", stationery.id); // กำหนด id ของ div โดยเอาจาก id ใน stationery
        // กำหนดรูปแบบของ div ที่เก็บ product แต่ละชิ้น
        divProductEle.className =
            "w-56 md:w-72 bg-white mt-20 shadow-lg rounded-lg overflow-hidden ";
        let divProductName = appendProductName(stationery);
        let divImgProduct = appendImgProduct(stationery);
        let divProductDetail = appendProductDetail(stationery);
        // นำ divProductName, divImgProduct, divProductDetail เข้าไปอยู่ใน divProductEle
        divProductEle.appendChild(divProductName);
        divProductEle.appendChild(divImgProduct);
        divProductEle.appendChild(divProductDetail);
        productsEle.appendChild(divProductEle);// นำ divProductEle เข้าไปต่อที่ productsEle (#products)
}

// function สร้าง div เพื่อเก็บชื่อสินค้า
function appendProductName(stationery) {
    let divProductName = document.createElement("div");
    divProductName.className =
        "py-2 text-center font-bold uppercase tracking-wide text-gray-800";
    divProductName.setAttribute("id" , "name");
    divProductName.textContent = stationery.name;
    return divProductName;
}

// function ที่รวมราคาสินค้า, จำนวนสินค้า และปุ่มเพิ่มลงตะกร้า ไว้ใน div เดียวกัน
function appendProductDetail(stationery) {
    let divProductDetail = document.createElement("div");
    divProductDetail.className =
        "flex items-center justify-between py-2 px-3 bg-gray-400 ";
    let divPriceEle = appendDivPriceEle(stationery);
    // สร้างปุ่ม "เพิ่มลงตะกร้า" --------------------------------------------------------------------------------------------------------------
    let addToCartBtn = document.createElement("button");
    // ตั้งค่าให้ปุ่ม addToCartBtn แต่ละปุ่มมี id เป็นชื่อของสินค้า
    addToCartBtn.setAttribute("id", stationery.name);
    addToCartBtn.addEventListener("click", ()=>{
        let addproduct = addToCartBtn.getAttribute('id')
        // ถ้าเรา add สินค้าเป็นครั้งแรก จะให้ขึ้นแจ้งเตือน(alert)ว่า "จะเพิ่มสินค้านี้ลงตะกร้าไหม"
        if(!incart.includes(addproduct)){
            alert(`${addproduct} added in your cart`);
        }
        // เมื่อทำการ add ลงตะกร้าสำเร็จจะเพิ่มเลขตรง icon ตะกร้า
        incartEle.textContent =  ++count;
        // เพิ่มสินค้าที่เราเลือกลงใน array incart
        incart.push(addproduct); // push เป็น function ที่เพิ่มค่าเข้าไปที่ค่าสุดท้ายของ array
        console.log(incart); // แสดงให้ดูว่าตอนนี้มีสินค้าใดในตะกร้าบ้าง
    },false);   
     //--------------------------------------------------------------------------------------------------------------------------------
    addToCartBtn.className =
        "bg-green-500 text-xs text-white px-2 py-1 font-semibold rounded uppercase hover:bg-green-600";
    addToCartBtn.textContent = "เพิ่มลงในตะกร้า";
    divProductDetail.appendChild(divPriceEle);
    divProductDetail.appendChild(addToCartBtn);
    return divProductDetail;
}

// function รวมราคาและจำนวนสินค้าไว้ใน div เดียวกัน
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

// function ใส่รูปภาพ
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

const deleteAllCartBtn = document.querySelector("#deleteAllBtn"); 
//console.log(deleteAllCartBtn);
deleteAllCartBtn.addEventListener("click", deleteAllInCart );




let count = 0;
incartEle.textContent = count;
// incart เป็น array สำหรับเก็บเราเลือกสินค้าอะไรบ้าง 
let incart = [];


// Search ------------------------------------------------------------------------------------

// ให้ btn เก็บค่าของของ element ที่มี id = shownavbar (ปุ่ม search)
let btn = document.getElementById("shownavbar");
let cilcks = false; 
let navbar = document.getElementById("searchbar");
// ตั้งค่าให้แถบ search ปรากฏออกมาเมื่อเราคลิ๊กที่ปุ่ม search
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
// keyup ตรวจสอบว่ามีการกดหรือปล่อยปุ่มใด ๆ จากแป้นพิมพ์
inp.addEventListener("keyup" , ()=>{
    buttonC();
},false)


// result เก็บ Obj ใน array stationeries เลือกเฉพาะสินค้าที่ตรงกับคำที่เราค้นหา
// includes จะเช็คว่า array นั้นมีค่าทีเราต้องการจะค้นหาอยู่หรือไม่ และจะ return เป็น true/false
let result = stationeries.filter(text => text.name.includes("")); 


//ปุ่ม search
function buttonC(){
    // x เป็นตัวแปรเก็บค่าที่รับมาจากแป้นพิมพ์ โดยจะเปลี่ยนให้อยู่ในรูปแบบของ ตัวอักษรพิมพ์เล็ก แล้วนำไปเช็คกับชื่อสินค้าใน stationeries
    let x = document.getElementById("search").value.toLowerCase();
    result = stationeries.filter(text => text.name.toLowerCase().includes(`${x}`));
    console.log(result.length == 0);
    let divProduct = productsEle.children; // เก็บ productsEle.children หรือก็คือ divProductEle แต่ละตัวลงใน divProduct
    console.log(result);

    // ถ้า result ที่ได้รับมาไม่ตรงกับชื่อสินค้าใดเลย จะให้ซ่อนรายการสินค้า(divProduct)ทั้งหมด
    if(result.length == 0){
        for(let a of divProduct){
            a.style.display = "none";  // คำสั่ง style.display = "none" ทำให้ซ่อนแบบไม่เกิดพื้นที่ว่าง
        }
    }else{ 
        // ถ้า result ที่ได้รับมามีส่วนที่เหมือนกับชื่อสินค้า ก็จะแสดงสินค้าที่มีความน่าจะเป็นที่เรากำกลังค้นหาอยู่ออกมา
        for(let a of divProduct){
            for(let e of result){
                // ถ้าใน result ตรงกับชื่อใน product ตัวไหนก็จะปล่อยให้รายการสินค้านั้นแสดงต่อไป โดยใช้ id ของสินค้านั้นเป็นตัวเทียบ
                if(a.id == e.id){
                    a.style.display = "";
                    break;
                }else{ 
                    // ถ้า result ที่ได้รับมาไม่ตรงกับชื่อสินค้าใดเลย จะให้ซ่อนรายการสินค้าทั้งหมด
                    a.style.display = "none";
                }
            }
        }
    }
}



function deleteAllInCart(){
    alert(`Delete all products in your cart`);
    incart = [];
    incartEle.textContent = 0;  
    console.log(incart);
}

