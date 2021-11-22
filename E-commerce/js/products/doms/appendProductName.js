// function สร้าง div เพื่อเก็บชื่อสินค้า
export default function appendProductName(stationery) {
    let divProductName = document.createElement("div");
    divProductName.className =
        "py-2 text-center font-bold uppercase tracking-wide text-gray-800";
    divProductName.setAttribute("id", "name");
    divProductName.textContent = stationery.name;
    return divProductName;
}