$("#userBtnCustomer, #userBtnInventory, #userBtnSupplier, #userBtnEmployee, #userBtnSales,#userBtnUsers,#UserBtnDashboard").click(function () {
    hideAdminPages();
    switch ($(this).attr('id')) {
        case 'userBtnCustomer':
            $("#formIcon").text("Customer page");
            cusList.css('display', 'none');
            cusMain.css('display', 'block');
            customerPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnInventory':
            $("#formIcon").text("Inventory page");
            itmList.css('display', 'none');
            itmMain.css('display', 'block');
            inventoryPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnSupplier':
            $("#formIcon").text("Supplier page");
            supList.css('display', 'none');
            supMain.css('display', 'block');
            supplierPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnEmployee':
            $("#formIcon").text("Employee page");
            empList.css('display', 'none');
            empMain.css('display', 'block');
            employeePage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnSales':
            $("#formIcon").text("Sales page");
            paymentPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnUsers':
            $("#formIcon").text("Users page");
            userEditPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'UserBtnDashboard':
            $("#formIcon").text("Dashboard");
            userDashboard.css('display', 'block');
            allCaptureClear();
            break;
    }
});
