$("#paymentCard").click(function () {
    purchaseBtnHide(true);
    allContainerHide();
    adminPage.css('display','block');
    paymentPage.css('display','block');
    cardPage.css('display','block');
});
$("#cancel").click(function () {
    purchaseBtnHide(true);
    cardPage.css('display','none');
    adminPage.css('display','block');
    paymentPage.css('display','block');
});
$("#paymentCash").click(function () {
    purchaseBtnHide(false);
});