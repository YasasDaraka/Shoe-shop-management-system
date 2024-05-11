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
    $("#formIcon").text("");
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
            allCaptureClear();
            break;
        case 'getAllItm':
            itmList.css('display', 'block');
            getAllItems("/getAll");
            allCaptureClear();
            break;
        case 'getAllEmp':
            empList.css('display', 'block');
            getAllEmployees();
            allCaptureClear();
            break;
        case 'getAllSup':
            supList.css('display', 'block');
            getAllSuppliers();
            allCaptureClear();
            break;
    }
});
$("#btnCustomer, #btnInventory, #btnSupplier, #btnEmployee, #btnSales,#btnAdminPanel,#btnUsers,#btnDashboard").click(function () {
    hideAdminPages();
    switch ($(this).attr('id')) {
        case 'btnCustomer':
            $("#formIcon").text("Customer page");
            cusList.css('display', 'none');
            cusMain.css('display', 'block');
            customerPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnInventory':
            $("#formIcon").text("Inventory page");
            itmList.css('display', 'none');
            itmMain.css('display', 'block');
            inventoryPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnSupplier':
            $("#formIcon").text("Supplier page");
            supList.css('display', 'none');
            supMain.css('display', 'block');
            supplierPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnEmployee':
            $("#formIcon").text("Employee page");
            empList.css('display', 'none');
            empMain.css('display', 'block');
            employeePage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnAdminPanel':
            $("#formIcon").text("Admin page");
            adminEditPage.css('display', 'block');
            getAllAdmins();
            allCaptureClear();
            break;
        case 'btnSales':
            $("#formIcon").text("Sales page");
            paymentPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnUsers':
            $("#formIcon").text("Users page");
            userEditPage.css('display', 'block');
            getAllUsers();
            allCaptureClear();
            break;
        case 'btnDashboard':
            $("#formIcon").text("Admin Panel");
            adminDashboard.css('display', 'block');
            setAdminPanel();
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
    let attr = $("#bar-icon").attr('src');

    if (attr === "assets/images/arrow.gif"){
        $("#nav-bar").css('width', "20%");
        $("#nav-bar").css("transition", "all 0.3s ease");
        $("#side-bar-icon").css("transition", "all 0.3s");
        $("#side-bar-icon").css('left', "97.2%");
        $("#bar-icon").attr('src',"assets/images/arrow-rotate.gif");
        $("#bar-icon").css({
            "width": "38px",
            "padding-right": "0px",
            "z-index": "5"
        });
    }else if (attr === "assets/images/arrow-rotate.gif"){
        $("#nav-bar").css('width', "5%");
        $("#nav-bar").css("transition", "all 0.3s ease");
        $("#side-bar-icon").css("transition", "all 0.3s");
        /*$("#side-bar-icon").css('left', "2.7%");*/
        $("#bar-icon").attr('src',"assets/images/arrow.gif");
        $("#bar-icon").css({
            "width": "60px",
            "padding-right": "10px",
            "z-index": "5"
        });
    }




});