import stationeries from "../stationeries.js";
import { initliaizeCart, addToCart } from "../cart/cart.js";
import { CookieUtil } from "../events/cookie.js";

// เลือก node id = products ในหน้า index.html
const productsEle = document.querySelector("#products");

initliaizeCart();

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
    productsEle.appendChild(divProductEle); // นำ divProductEle เข้าไปต่อที่ productsEle (#products)
}

// function สร้าง div เพื่อเก็บชื่อสินค้า
function appendProductName(stationery) {
    let divProductName = document.createElement("div");
    divProductName.className =
        "py-2 text-center font-bold uppercase tracking-wide text-gray-800";
    divProductName.setAttribute("id", "name");
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
    addToCartBtn.setAttribute("id", stationery.id);
    let _self = addToCart;
    addToCartBtn.addEventListener(
        "click",
        () => {
            _self(stationery);
        },
        false
    );


    let addToWant = document.createElement("button");
    // ตั้งค่าให้ปุ่ม addToWant แต่ละปุ่มมี id เป็นชื่อของสินค้า
    addToWant.setAttribute("id", stationery.id);
    addToWant.addEventListener(
        "click",
        () => {
            
            CookieUtil.set('name', stationery.name);
        },
        false
    );
    
    // addToCartBtn.addEventListener(
    //     "click",
    //     () => {
    //         let addproduct = addToCartBtn.getAttribute("id");
    //         // ถ้าเรา add สินค้าเป็นครั้งแรก จะให้ขึ้นแจ้งเตือน(alert)ว่า "จะเพิ่มสินค้านี้ลงตะกร้าไหม"
    //         if (!incart.includes(addproduct)) {
    //             Swal.fire({
    //                 icon: "success",
    //                 title: `เพิ่ม ${e.target.id} ลงในตะกร้า`,
    //             });
    //         }
    //         // เมื่อทำการ add ลงตะกร้าสำเร็จจะเพิ่มเลขตรง icon ตะกร้า
    //         incartEle.textContent = ++count;
    //         // เพิ่มสินค้าที่เราเลือกลงใน array incart
    //         incart.push(addproduct); // push เป็น function ที่เพิ่มค่าเข้าไปที่ค่าสุดท้ายของ array
    //         console.log(incart); // แสดงให้ดูว่าตอนนี้มีสินค้าใดในตะกร้าบ้าง
    //     },
    //     false
    // );
    //--------------------------------------------------------------------------------------------------------------------------------
    
    addToCartBtn.className =
        "bg-green-500 text-xs text-white px-2 py-1 font-semibold rounded uppercase hover:bg-green-600";
    addToCartBtn.textContent = "เพิ่มลงในตะกร้า";
    divProductDetail.appendChild(divPriceEle);
    divProductDetail.appendChild(addToCartBtn);
    addToWant.className =
        "bg-yellow-300 text-xs text-white px-1 py-1 font-semibold rounded uppercase hover:bg-yellow-400";
    addToWant.textContent = "เพิ่มสิ่งที่อยากได้";
    divProductDetail.appendChild(addToWant);
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
function appendImgProduct(stationery) {
    let divImgProduct = document.createElement("div");
    divImgProduct.className = "max-w-sm rounded overflow-hidden shadow-lg";
    let ImgEle = document.createElement("img");
    ImgEle.className = "w-full";
    ImgEle.src = stationery.srcimg;
    ImgEle.style = "height:300px";
    divImgProduct.appendChild(ImgEle);
    return divImgProduct;
}
