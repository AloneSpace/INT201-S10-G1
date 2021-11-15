let localeStorageCart = localStorage.getItem("cart");
let cart = localeStorageCart ? JSON.parse(localeStorageCart) : [];
const incartEle = document.querySelector("#incart");
let table = document.getElementById("cartTable");

//* Function to add product to cart and display in table
export const addToCart = async (product) => {
    let productIndex = cart.findIndex((item) => item.id === product.id); // หาค่าของ product ที่มี id ตรงกับที่ส่งมา
    productIndex === -1
        ? cart.push({ ...product, quantity: 1 })
        : (cart[productIndex].quantity += 1);
    localStorage.setItem("cart", JSON.stringify(cart)); // บันทึกค่าใน localStorage
    let qty = cart[productIndex]?.quantity || 1; // ถ้ามีค่าใน cart จะเอาค่า quantity ของ product ที่มี id ตรงกับที่ส่งมา ถ้าไม่มีจะเอาค่าเริ่มต้นคือ 1
    let row;
    if (productIndex === -1) {
        // ถ้าไม่มีค่าใน cart จะเพิ่มลงใน table
        row = table.insertRow(-1);
    } else {
        row = table.deleteRow(productIndex + 1);
        row = table.insertRow(productIndex + 1);
    }
    addProductToTable(product, row, qty); // เพิ่มสินค้าลงใน table
    incartEle.textContent = cart.length; // เพิ่มจำนวนสินค้าลงใน incartEle
    await Swal.fire({
        icon: "success",
        title: `เพิ่ม ${product.name} ลงในตะกร้า`,
    }); // แสดงข้อความเมื่อเพิ่มสินค้าลงในตะกร้า
};
export const initliaizeCart = () => {
    if (cart.length > 0) {
        // ถ้ามีสินค้าใน cart จะเพิ่มลงใน table
        for (let i = 0; i < cart.length; ++i) {
            let row = table.insertRow(i + 1);
            let qty = cart[i]?.quantity || 1;
            addProductToTable(cart[i], row, qty);
        }
    }
    // incartEle.textContent = cart.length;
    incartEle.textContent = cart.length;
};

export const getItemInCart = () => cart;

//* Function to remove product from cart
function removeProductFromCart(id) {
    let productIndex = cart.findIndex((item) => item.id === id); // หาค่าของ product ที่มี id ตรงกับที่ส่งมา
    cart.splice(productIndex, 1); // ลบสินค้าที่มี id ตรงกับที่ส่งมา
    localStorage.setItem("cart", JSON.stringify(cart)); // บันทึกค่าใน localStorage
    table.deleteRow(productIndex + 1); // ลบสินค้าที่มี id ตรงกับที่ส่งมาออกจาก table
    incartEle.textContent = cart.length; // เพิ่มจำนวนสินค้าลงใน incartEle
}

//* Function to add product to table
function addProductToTable(product, row, qty = 1) {
    // สร้างคอลัมน์และเพิ่มสินค้าลงในคอลัมน์
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.innerHTML = `<td class="hidden pb-4 md:table-cell">
    <a href="#">
        <img
            src="${product.srcimg}"
            class="w-20 rounded"
            alt="Thumbnail"
        />
    </a>
</td>`;
    cell2.innerHTML = `<td>
    <a href="#">
        <p class="mb-2 md:ml-4">${product.name}</p>
            <button
                class="text-red-700 md:ml-4"
                id="removeProduct${product.id}"
            >
                <small>(Remove item)</small>
            </button>
    </a>
</td>`;
    cell3.className = "justify-center md:justify-end md:flex mt-6";
    cell3.innerHTML = `
    <div class="w-20 h-10">
        <div class="relative flex flex-row w-full h-8">
            <input
                type="number"
                value="${qty}"
                class="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
                readonly
            />
        </div>
    </div>`;
    cell4.className = "hidden text-right md:table-cell";
    cell4.innerHTML = `
    <span class="text-sm lg:text-base font-medium">
        ${product.price}
    </span>`;
    cell5.className = "text-right";
    cell5.innerHTML = `
    <span class="text-sm lg:text-base font-medium">
        ${product.price * qty}
    </span>`;

    // สร้าง event เพื่อลบสินค้าออกจากตะกร้า
    let removeProductBtn = document.getElementById(
        `removeProduct${product.id}`
    );

    const _removeProductFromCart = removeProductFromCart;
    removeProductBtn.addEventListener(
        "click",
        () => {
            _removeProductFromCart(product.id); // ลบสินค้าออกจากตะกร้า
        },
        false
    );
}

document.getElementById("deleteAllBtn").addEventListener("click", () => {
    alert(`Delete all products in your cart`);
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    incartEle.textContent = 0;
});
