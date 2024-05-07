$("#userBtnCustomer, #userBtnInventory, #userBtnSupplier, #userBtnEmployee, #userBtnSales,#userBtnUsers,#UserBtnDashboard").click(function () {
    hideAdminPages();
    switch ($(this).attr('id')) {
        case 'userBtnCustomer':
            $("#userFormIcon").text("Customer page");
            cusList.css('display', 'none');
            cusMain.css('display', 'block');
            customerPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnInventory':
            $("#userFormIcon").text("Inventory page");
            itmList.css('display', 'none');
            itmMain.css('display', 'block');
            inventoryPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnSupplier':
            $("#userFormIcon").text("Supplier page");
            supList.css('display', 'none');
            supMain.css('display', 'block');
            supplierPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnEmployee':
            $("#userFormIcon").text("Employee page");
            empList.css('display', 'none');
            empMain.css('display', 'block');
            employeePage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnSales':
            $("#userFormIcon").text("Sales page");
            paymentPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnUsers':
            $("#userFormIcon").text("Users page");
            userEditPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'UserBtnDashboard':
            $("#userFormIcon").text("Dashboard");
            userDashboard.css('display', 'block');
            allCaptureClear();
            break;
    }
});
