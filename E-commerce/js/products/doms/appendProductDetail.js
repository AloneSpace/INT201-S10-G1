import { CookieUtil } from "../../events/cookie.js";
import { addToCart } from "../../cart/cart.js";
import appendDivPriceEle from "./appendDivPriceEle.js";

// function ที่รวมราคาสินค้า, จำนวนสินค้า และปุ่มเพิ่มลงตะกร้า ไว้ใน div เดียวกัน
export default function appendProductDetail(stationery) {
    let divProductDetail = document.createElement("div");
    divProductDetail.className =
        "flex items-center justify-between py-2 px-3 bg-gray-400 ";
    let divPriceEle = appendDivPriceEle(stationery);
    // สร้างปุ่ม "เพิ่มลงตะกร้า" --------------------------------------------------------------------------------------------------------------
    let addToCartBtn = document.createElement("button");
    // ตั้งค่าให้ปุ่ม addToCartBtn แต่ละปุ่มมี id เป็นชื่อของสินค้า
    addToCartBtn.setAttribute("id", stationery.id);
    addToCartBtn.addEventListener(
        "click",
        () => {
            addToCart(stationery);
        },
        false
    );

    let addToWant = document.createElement("button");
    // ตั้งค่าให้ปุ่ม addToWant แต่ละปุ่มมี id เป็นชื่อของสินค้า
    addToWant.setAttribute("id", `favorite-${stationery.name}`);
    addToWant.addEventListener(
        "click",
        () => {
            CookieUtil.set('favorites', stationery.name);
        },
        false
    );
    
    addToCartBtn.className =
        "bg-green-500 text-xs text-white px-2 py-1 font-semibold rounded uppercase hover:bg-green-600";
    addToCartBtn.textContent = "เพิ่มลงในตะกร้า";
    divProductDetail.appendChild(divPriceEle);
    divProductDetail.appendChild(addToCartBtn);
    // addToWant.className =
    //     "text-xs font-semibold rounded mr-4 ";
    addToWant.innerHTML = 
    `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
     </svg>`
    let favorites = document.cookie.split("favorites=")[1];
    try {
        let values = JSON.parse(favorites);
        if(!values.includes(stationery.name)){
            throw Error()
        }
        addToWant.className = "text-xs font-semibold rounded mr-4 text-red-500";
    } catch (error) {
        addToWant.className = "text-xs font-semibold rounded mr-4 text-white";
        console.log(error);
    }
    divProductDetail.appendChild(addToWant);
    return divProductDetail;
}