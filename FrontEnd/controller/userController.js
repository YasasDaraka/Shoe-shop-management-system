$("#userBtnCustomer, #userBtnInventory, #userBtnSupplier, #userBtnEmployee, #userBtnSales,#userBtnUsers").click(function () {
    hideAdminPages();
    switch ($(this).attr('id')) {
        case 'userBtnCustomer':
            cusList.css('display', 'none');
            cusMain.css('display', 'block');
            customerPage.css('display', 'block');
            break;
        case 'userBtnInventory':
            itmList.css('display', 'none');
            itmMain.css('display', 'block');
            inventoryPage.css('display', 'block');
            break;
        case 'userBtnSupplier':
            supList.css('display', 'none');
            supMain.css('display', 'block');
            supplierPage.css('display', 'block');
            break;
        case 'userBtnEmployee':
            empList.css('display', 'none');
            empMain.css('display', 'block');
            employeePage.css('display', 'block');
            break;
        case 'userBtnSales':
            paymentPage.css('display', 'block');
            break;
        case 'userBtnUsers':
            userEditPage.css('display', 'block');
            break;
    }
});
