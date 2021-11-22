// function ใส่รูปภาพ
export default function appendImgProduct(stationery) {
    let divImgProduct = document.createElement("div");
    divImgProduct.className = "max-w-sm rounded overflow-hidden shadow-lg";
    let ImgEle = document.createElement("img");
    ImgEle.className = "w-full";
    ImgEle.src = stationery.srcimg;
    ImgEle.style = "height:300px";
    divImgProduct.appendChild(ImgEle);
    return divImgProduct;
}