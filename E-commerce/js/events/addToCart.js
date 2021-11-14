let buttons = document.getElementsByTagName("button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function addToCartBtn(e) {
        Swal.fire({
            icon: "success",
            title: `เพิ่ม ${e.target.name} ลงในตะกร้า`,
        });
    };
}


