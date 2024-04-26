let btnDashboard = $('#btnDashboard');
let btnCustomer = $('#btnCustomer');
let btnInventory = $('#btnInventory');
let btnSupplier = $('#btnSupplier');
let btnEmployee = $('#btnEmployee');
let btnSales = $('#btnSales');
let btnAdmin = $('#btnAdminPanel');
let btnUser = $('#btnUsers');

let btnAllCus = $('#getAllCus');
let btnAllItm = $('#getAllItm');
let btnAllEmp = $('#getAllEmp');
let btnAllSup = $('#getAllSup');

let btnBackCus = $('#backCus');
let btnBackItm = $('#backItm');
let btnBackEmp = $('#backEmp');
let btnBackSup = $('#backSup');

let empList = $('#employee-list');
let supList = $('#supplier-list');
let itmList = $('#inventory-list');
let cusList = $('#customer-list');

let empMain = $('#employee-main');
let supMain = $('#supplier-main');
let itmMain = $('#inventory-main');
let cusMain = $('#customer-main');


function hideAdminPages(){
    customerPage.css('display','none');
    employeePage.css('display','none');
    supplierPage.css('display','none');
    inventoryPage.css('display','none');
    paymentPage.css('display','none');
}
function hideMainPages(){
    empMain.css('display','none');
    supMain.css('display','none');
    itmMain.css('display','none');
    cusMain.css('display','none');
}
function hideAllLoadPages(){
    empList.css('display','none');
    supList.css('display','none');
    itmList.css('display','none');
    cusList.css('display','none');
}

$("#getAllCus, #getAllItm, #getAllEmp, #getAllSup").click(function () {
    hideMainPages();
    switch ($(this).attr('id')) {
        case 'getAllCus':
            cusList.css('display', 'block');
            break;
        case 'getAllItm':
            itmList.css('display', 'block');
            break;
        case 'getAllEmp':
            empList.css('display', 'block');
            break;
        case 'getAllSup':
            supList.css('display', 'block');
            break;
    }
});
$("#btnCustomer, #btnInventory, #btnSupplier, #btnEmployee, #btnSales,#btnAdminPanel").click(function () {
    hideAdminPages();
    switch ($(this).attr('id')) {
        case 'btnCustomer':
            cusList.css('display', 'none');
            cusMain.css('display', 'block');
            customerPage.css('display', 'block');
            break;
        case 'btnInventory':
            itmList.css('display', 'none');
            itmMain.css('display', 'block');
            inventoryPage.css('display', 'block');
            break;
        case 'btnSupplier':
            supList.css('display', 'none');
            supMain.css('display', 'block');
            supplierPage.css('display', 'block');
            break;
        case 'btnEmployee':
            empList.css('display', 'none');
            empMain.css('display', 'block');
            employeePage.css('display', 'block');
            break;
        case 'btnAdminPanel':
            adminEditPage.css('display', 'block');
            break;
        case 'btnSales':
            paymentPage.css('display', 'block');
            break;
    }
});
