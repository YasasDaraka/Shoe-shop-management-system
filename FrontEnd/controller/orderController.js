$("#paymentCard").click(function () {
    allContainerHide();
    adminPage.css('display','block');
    paymentPage.css('display','block');
    cardPage.css('display','block');
});
$("#cancel").click(function () {
    cardPage.css('display','none');
    adminPage.css('display','block');
    paymentPage.css('display','block');
});