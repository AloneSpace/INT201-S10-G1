//* Declare employess
let employees = [
    {
        name: "Karunpat Promvisut",
        id: 63130500002,
        yearActive: 5,
        salary: 40000,
    },
    {
        name: "Chomkanok Chuenpapai",
        id: 63130500016,
        yearActive: 5,
        salary: 25000,
    },
    {
        name: "Tripuwarej Paweenasombat",
        id: 63130500040,
        yearActive: 3,
        salary: 30000,
    },
    {
        name: "Trongsit Sinnurak",
        id: 63130500043,
        yearActive: 4,
        salary: 28000,
    },
    {
        name: "Thatphum Kongnithichalerm",
        id: 63130500044,
        yearActive: 2,
        salary: 38000,
    },
    {
        name: "Naruebadin Ameenee",
        id: 63130500067,
        yearActive: 1,
        salary: 35000,
    },
];

const yearAcceptBonus = 3;

//* Declare function getBonus to calculate salary + bonus
function getBonusWithSalary(employee) {
    if (employee.yearActive >= yearAcceptBonus)
        return employee.salary + (employee.salary * yearAcceptBonus) / 100;
    return employee.salary;

    //*Ternary condition
    // return yearAcceptBonus >= 3 ? employee.salary + (employee.salary * yearAcceptBonus) / 100; : employee.salary
}

//* Declare function getSalaryText to format text
function getSalaryText(employee, fn) {
    return `${employee.name} - ${fn(employee)} บาท`;
}

console.log(`Get length of employees ${employees.length} person\n`);
console.log("Get all employee bonus (Wait for 1 Sec)\n");
employees.forEach((employee) =>
    setTimeout(() => {
        console.log(getSalaryText(employee, getBonusWithSalary));
    }, 1000)
);
