import stationeries from "../stationeries.js";

//--------------------------- Search ---------------------------
document.getElementById("search").addEventListener("keyup" , () => { // keyup ตรวจสอบว่ามีการกดหรือปล่อยปุ่มใด ๆ จากแป้นพิมพ์
    let x = document.getElementById("search").value.toLowerCase(); // x เป็นตัวแปรเก็บค่าที่รับมาจากแป้นพิมพ์ โดยจะเปลี่ยนให้อยู่ในรูปแบบของ ตัวอักษรพิมพ์เล็ก แล้วนำไปเช็คกับชื่อสินค้าใน stationeries
    let search = stationeries.filter(value => { //นำ stationeries มา filter เพื่อหาว่า ตัวอักษรที่ได้มานั้น มีอยู่ใน stationeries ไม่
        let a = value.name.toLowerCase().includes(x); // โดยใช้ includes จะออกมาเป็น true : false ถ้าเจอก็จะออก true ถ้าไม่เจอก็จะออก false
        if(!a){
            document.getElementById(value.id).style.display = "none"; //จะให้ซ่อนรายการสินค้านั้น
        }else{
            document.getElementById(value.id).style.display = "";   //จะให้แสดงรายการสินค้านั้น
        }
        return a;
    });
    console.log(search);
});


let cilcks = false; 
document.getElementById("shownavbar").addEventListener("click" , ()=>{ //เมื่อทำการกดคลิ๊ก จะให้ tag ที่มี id คือ searchbar เเละเมอื่กดอีกครั้ง ก็จะให้ปิด
    if(cilcks){
        document.getElementById("searchbar").style.display = "none"; //จะให้ซ่อนรายการสินค้านั้น
        cilcks = false;
    }else{
        document.getElementById("searchbar").style.display = ""; //จะให้แสดงรายการสินค้านั้น
        cilcks = true;
    }
},false);

