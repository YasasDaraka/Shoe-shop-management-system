$("#userBtnCustomer, #userBtnInventory, #userBtnSupplier, #userBtnEmployee, #userBtnSales").click(function () {
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
        case 'btnSales':
            paymentPage.css('display', 'block');
            break;
    }
});
