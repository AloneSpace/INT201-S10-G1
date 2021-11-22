import stationeries from "../../assets/stationeries.js";
import { initliaizeCart } from "../cart/cart.js";
import appendProductName from "./doms/appendProductName.js";
import appendProductDetail from "./doms/appendProductDetail.js";
import appendDivPriceEle from "./doms/appendDivPriceEle.js";
import appendImgProduct from "./doms/appendImgProduct.js";



//for of เพื่อวนอ่านค่าแต่ละตัวใน array ของ stationeries
export default function products(){
    // เลือก node id = products ในหน้า index.html
    const productsEle = document.querySelector("#products");
    initliaizeCart();
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
} 
