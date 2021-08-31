const getBMI = function (pound = 0, inch = 0) {
  let kilogram = +pound * 0.453592
  let weight = +inch * 0.0254
  return kilogram / Math.pow(weight, 2)
}

console.log(getBMI(36.5, 39)) //16.871807182141648
console.log(getBMI(100.0, 55)) //23.241950616132637
console.log(getBMI(120.0, 66)) //23.241950616132637
