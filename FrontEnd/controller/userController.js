$("#userBtnCustomer, #userBtnInventory, #userBtnSupplier, #userBtnEmployee, #userBtnSales,#userBtnUsers,#UserBtnDashboard").click(function () {
    hideAdminPages();
    switch ($(this).attr('id')) {
        case 'userBtnCustomer':
            checkUserLabel();
            $("#userFormIcon").text("Customer page");
            cusList.css('display', 'none');
            cusMain.css('display', 'block');
            customerPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnInventory':
            checkUserLabel();
            $("#userFormIcon").text("Inventory page");
            itmList.css('display', 'none');
            itmMain.css('display', 'block');
            inventoryPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnSupplier':
            checkUserLabel();
            $("#userFormIcon").text("Supplier page");
            supList.css('display', 'none');
            supMain.css('display', 'block');
            supplierPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnEmployee':
            checkUserLabel();
            $("#userFormIcon").text("Employee page");
            empList.css('display', 'none');
            empMain.css('display', 'block');
            employeePage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnSales':
            checkUserLabel();
            $("#userFormIcon").text("Sales page");
            paymentPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnUsers':
            checkUserLabel();
            $("#userFormIcon").text("Users page");
            userEditPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'UserBtnDashboard':
            checkUserLabel();
            $("#userFormIcon").text("Dashboard");
            userDashboard.css('display', 'block');
            allCaptureClear();
            break;
    }
});

$("#user-side-bar-icon").click(function () {
    let attr = $("#user-bar-icon").attr('src');

    if (attr === "assets/images/arrow.gif"){
        $("#user-nav-bar").css('width', "20%");
        $("#user-nav-bar").css("transition", "all 0.3s ease");
        $("#user-side-bar-icon").css("transition", "all 0.3s");
        $("#user-side-bar-icon").css('left', "97.2%");
        $("#user-bar-icon").attr('src',"assets/images/arrow-rotate.gif");
        $("#user-bar-icon").css({
            "width": "38px",
            "padding-right": "0px",
            "z-index": "5"
        });
        $(".user-lb-hide").css("transition", "all 0.3s");
        $(".user-lb-hide").css('font-size', "18px");
        checkUserLabel();
    }else if (attr === "assets/images/arrow-rotate.gif"){
        $("#user-nav-bar").css('width', "5%");
        $("#user-nav-bar").css("transition", "all 0.3s ease");
        $("#user-side-bar-icon").css("transition", "all 0.3s");
        $("#user-bar-icon").attr('src',"assets/images/arrow.gif");
        $("#user-bar-icon").css({
            "width": "60px",
            "padding-right": "10px",
            "z-index": "5"
        });
        $(".user-lb-hide").css("transition", "all 0.3s");
        $(".user-lb-hide").css('font-size', "0px");
        checkUserLabel();
    }

});
function checkUserLabel() {
    let attr = $("#user-bar-icon").attr('src');

    if (attr === "assets/images/arrow.gif"){
        $("#userFormIcon").css("transition", "all 0.3s");
        $("#userFormIcon").css('left', "8vw");

    }else if (attr === "assets/images/arrow-rotate.gif"){
        $("#userFormIcon").css("transition", "all 0.3s");
        $("#userFormIcon").css('left', "23vw");
    }
}