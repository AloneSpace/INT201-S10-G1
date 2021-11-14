let localeStorageCart = localStorage.getItem("cart");
let cart = localeStorageCart ? JSON.parse(localeStorageCart) : [];
const incartEle = document.querySelector("#incart");
let table = document.getElementById("cartTable");

export const addToCart = async (product) => {
    let productIndex = cart.findIndex((item) => item.id === product.id);
    productIndex === -1
        ? cart.push({ ...product, quantity: 1 })
        : (cart[productIndex].quantity += 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    let qty = cart[productIndex]?.quantity || 1;
    let row;
    if (productIndex === -1) {
        row = table.insertRow(-1);
    } else {
        row = table.deleteRow(productIndex + 1);
        row = table.insertRow(productIndex + 1);
    }
    addProductToTable(product, row, qty);
    incartEle.textContent = cart.length;
    await Swal.fire({
        icon: "success",
        title: `เพิ่ม ${product.name} ลงในตะกร้า`,
    });
};
export const initliaizeCart = () => {
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; ++i) {
            let row = table.insertRow(i + 1);
            let qty = cart[i]?.quantity || 1;

            addProductToTable(cart[i], row, qty);
        }
    }
    incartEle.textContent = cart.length;
};

export const getItemInCart = () => cart;

function removeProductFromCart(id) {
    let productIndex = cart.findIndex((item) => item.id === id);
    cart.splice(productIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    table.deleteRow(productIndex + 1);
    incartEle.textContent = cart.length;
}

function addProductToTable(product, row, qty = 1) {
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
    let removeProductBtn = document.getElementById(
        `removeProduct${product.id}`
    );
    const _removeProductFromCart = removeProductFromCart;
    removeProductBtn.addEventListener(
        "click",
        () => {
            _removeProductFromCart(product.id);
        },
        false
    );
}
