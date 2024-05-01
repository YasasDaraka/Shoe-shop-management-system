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
    adminEditPage.css('display','none');
    userEditPage.css('display','none');
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
            getAllCustomers();
            break;
        case 'getAllItm':
            itmList.css('display', 'block');
            getAllItems();
            break;
        case 'getAllEmp':
            empList.css('display', 'block');
            getAllEmployees();
            break;
        case 'getAllSup':
            supList.css('display', 'block');
            getAllSuppliers();
            break;
    }
});
$("#btnCustomer, #btnInventory, #btnSupplier, #btnEmployee, #btnSales,#btnAdminPanel,#btnUsers").click(function () {
    hideAdminPages();
    switch ($(this).attr('id')) {
        case 'btnCustomer':
            cusList.css('display', 'none');
            cusMain.css('display', 'block');
            customerPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnInventory':
            itmList.css('display', 'none');
            itmMain.css('display', 'block');
            inventoryPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnSupplier':
            supList.css('display', 'none');
            supMain.css('display', 'block');
            supplierPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnEmployee':
            empList.css('display', 'none');
            empMain.css('display', 'block');
            employeePage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnAdminPanel':
            adminEditPage.css('display', 'block');
            getAllAdmins();
            allCaptureClear();
            break;
        case 'btnSales':
            paymentPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnUsers':
            userEditPage.css('display', 'block');
            getAllUsers();
            allCaptureClear();
            break;
    }
});
function allCaptureClear() {
    if (videoStream) {
        stopWebcamStream();
        $('#cusVideo').hide();
        captureClear();
    }else if (empVideoStream) {
        empCaptureClear();
    }else if (itmVideoStream) {
        itmCaptureClear();
    }
}

$("#side-bar-icon").click(function () {
    /*var navBarWidth = parseFloat($("#nav-bar").css('width'));
    if (Math.abs(navBarWidth - 5) < 0.01) {
        console.log("nav")
        $("#nav-bar").css('width', "20%");
        $("#nav-bar").css("transition", "all 0.3s ease");
    }*/
});
