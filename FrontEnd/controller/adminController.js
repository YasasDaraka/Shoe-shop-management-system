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
$("#btnCustomer, #btnInventory, #btnSupplier, #btnEmployee, #btnSales").click(function () {
    hideAdminPages();
    switch ($(this).attr('id')) {
        case 'btnCustomer':
            customerPage.css('display', 'block');
            break;
        case 'btnInventory':
            inventoryPage.css('display', 'block');
            break;
        case 'btnSupplier':
            supplierPage.css('display', 'block');
            break;
        case 'btnEmployee':
            employeePage.css('display', 'block');
            break;
        case 'btnSales':
            paymentPage.css('display', 'block');
            break;
    }
});