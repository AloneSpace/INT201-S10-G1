const operations = require("./operations");

console.log(operations.add(50, 60)); //*Output: 110

console.log(operations.multiply(50, 60)); //* Output: 3000

console.log(operations.factorialize(4)); //* Output: 24

console.log(operations.toString("multiply", "th", 1000, 6)); //* Output: 6,000

console.log(operations.toString("factorialize", "th", 10)); //* Output: 3,628,800

operations.delay(() => {
    console.log("Done");
}, 1000); //* Desc: รอจนกว่าจะครบ 1 วินาที แล้วจึงจะ output ว่า Done ปล. จะไม่รอ และจะทำคำสั่งถัดไปทันที
