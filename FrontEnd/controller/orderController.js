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


function data() {
    var data = {
        orderNo: "ORD001",
        purchaseDate: "2024-04-30",
        total: 100.0,
        paymentMethod: "Credit Card",
        totalPoints: 50,
        cashier: "John Doe",
        customerName: {
            customerId: "CUST001",
            customerName: "Yasas"
        },
        saleDetails: [
                {
                orderDetailPK: {
                    orderNo: "ORD001",
                    itemCode: "ITEM001"
                },
                itmQTY: 2,
                inventory: {
                    itemCode: "ITEM001"
                }
            }
        ]
    }
}