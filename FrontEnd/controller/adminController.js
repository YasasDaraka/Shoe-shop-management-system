let btnDashboard = $('#btnDashboard');
let btnCustomer = $('#btnCustomer');
let btnInventory = $('#btnInventory');
let btnSupplier = $('#btnSupplier');
let btnEmployee = $('#btnEmployee');
let btnSales = $('#btnSales');
let btnAdmin = $('#btnAdminPanel');
let btnUser = $('#btnUsers');

function hideAdminPages(){
    customerPage.css('display','none');
    employeePage.css('display','none');
    supplierPage.css('display','none');
    inventoryPage.css('display','none');
    paymentPage.css('display','none');
}
/*
$(document).ready(function () {

    $("#btnDashboard, #btnCustomer, #btnInventory, #btnEmployee, #btnSales, #btnAdminPanel, #btnUsers").each(function () {
        switch ($(this).attr('id')) {
            case 'btnCustomer':
                hideAdminPages();customerPage.css('display','block');
                break;
            case 'btnInventory':
                hideAdminPages();inventoryPage.css('display','block');
                break;
            case 'btnSupplier':
                hideAdminPages();employeePage.css('display','block');
                break;
            case 'btnEmployee':
                hideAdminPages();employeePage.css('display','block');
                break;
            case 'btnSales':
                hideAdminPages();paymentPage.css('display','block');
                break;
        }
    });

});*/
