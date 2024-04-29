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

$(document).ready(function () {
    $("#order-add-item").prop("disabled", true);
    $("#btnSubmitOrder").prop("disabled", true);
    $("#order-clear").prop("disabled", true);
    generateOrderId();
    $('#order-thead').css({
        'width': '100%',
        'display': 'flex'
    });
    $('#order-thead>th').css({
        'flex': '1',
        'max-width': 'calc(100%/5*1)'
    })
});

$("#order-clear,.order-nav").click(function () {
    clearAll();
});

function generateOrderId() {
    loadOrderId().then(function (id) {
        $("#orderID").val(id);
    }).catch(function (error) {
        console.error("Error loading order Id:", error);
    });
}
function loadOrderId() {
    return new Promise(function (resolve, reject) {
        var ar;
        $.ajax({
            url: "http://localhost:8080/BackEnd/order/getGenId",
            method: "GET",
            success: function (res) {
                console.log(res);
                ar = res;
                resolve(ar);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

function searchOrder(id) {
    console.log(id);
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/sales/search/"+id,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}

function placeOrder() {
    let order = {
        oid: "",
        date: "",
        cusID: "",
        orderDetails: []
    };

    let cusId = $("#cId").val();
    let date = $("#orderDate").val();
    let OId = $("#orderID").val();

    $('#order-table>tr').each(function () {
        let code = $(this).children().eq(0).text();
        let qty = $(this).children().eq(3).text();
        let price = $(this).children().eq(2).text();
        let orderDetails = {
            oid: OId,
            itmCode: code,
            itmQTY: parseInt(qty),
            itmPrice: parseFloat(price)
        };

        order.orderDetails.push(orderDetails);
    });

    order.oid = OId;
    order.date = date;
    order.cusID = cusId;

    console.log(order)
    $.ajax({
        url: "http://localhost:8080/BackEnd/order",
        method: "POST",
        data: JSON.stringify(order),
        contentType: "application/json",
        success: function (res, textStatus, jsXH) {
            console.log(res);
            //alert("Order Added Successfully");
            swal("Saved", "Order Added Successfully", "success");
            generateOrderId();
        },
        error: function (ob, textStatus, error) {
            //alert(textStatus + " : Error Order Not Added")
            swal("Error", textStatus + " : Error Order Not Added", "error");
        }
    });
}

$("#order-add-item").click(function () {
    let id = $("#icode").val();
    let name = $("#itemName").val();
    let price = $("#price").val();
    let qty = $("#orderQty").val();
    let total = parseFloat(price) * parseFloat(qty);
    let allTotal = 0;
    let itemExists = false;

    $('#order-table>tr').each(function (e) {
        let check = $(this).children().eq(0).text();
        if (id === check) {
            let liQty = $(this).children().eq(3).text();
            let upQty = parseInt(liQty) + parseInt(qty);
            $(this).children().eq(1).text(name);
            $(this).children().eq(2).text(price);
            $(this).children().eq(3).text(upQty);
            $(this).children().eq(4).text(upQty * parseFloat(price));
            itemExists = true;
            return false;
        }
    });

    if (!itemExists) {
        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${price}</td>
                     <td>${qty}</td>
                     <td>${total}</td>
                    </tr>`;

        $("#order-table").append(row);
        $('#order-table').css({
            'width ': '101.8%',
            'max-height': '80px',
            'overflow-y': 'auto',
            'display': 'table-caption'
        });
        $('#order-table>tr>td').css({
            'flex': '1',
            'max-width': 'calc(100%/5*1)'
        });
        if ($("#order-table>tr").length > 1) {
            $('#order-table>tr').css({
                'width': '100%',
                'display': 'flex'
            });
        } else {
            $('#order-table>tr').css({
                'width': '925px',
                'display': 'flex'
            });
        }

    }
    $('#order-table>tr').each(function (e) {
        let full = $(this).children().eq(4).text();
        allTotal += parseFloat(full);
    });
    $("#total").text(allTotal);
    $("#subtotal").text(allTotal);
});
$("#txtDiscount").on("keydown keyup input", function (e) {
    let total = parseFloat($("#total").text());
    if (total > 0) {
        let discount = $(this).val();
        let fullAm = (total / 100 * discount);
        total -= fullAm;
        $("#subtotal").text(total);
        setAndTriggerValue($("#subtotal"), total);
    }

});
$("#txtCash").on("keydown keyup input", function () {
    cashValidate();
    setBalance();
});
$("#subtotal").on("input", function () {
    cashValidate();
});

function setBalance() {
    let subtotalText = $("#subtotal").text();
    let cashText = $("#txtCash").val();
    let subtotal = parseFloat(subtotalText);
    let cash = parseFloat(cashText);
    if (!isNaN(subtotal) && !isNaN(cash)) {
        let balance = cash - subtotal;
        $("#txtBalance").val(balance.toFixed(2));
    } else {
        $("#txtBalance").val("0");
    }
}

$("#btnSubmitOrder").click(function () {
    let oId = $("#orderId").val();

    if (itemValidate()) {
        searchOrder(oId).then(function (order) {
            if (Object.keys(order).length === 0) {
                if (cashValidate()) {
                        placeOrder();
                        clearAll();
                        generateOrderId();
                } else {
                    //alert("Insuficent Credit : Check Cash!");
                    swal("Error", "Insufficient Credit : Check Cash!", "error");
                }
            } else {
                //alert("Order Already Registered");
                swal("Error", "Order Already Registered", "error");
            }
        });
    } else {
        //alert("Please Add Items to Place Order");
        swal("Error", "Please Add Items to Place Order", "error");
    }
});

function loadOrderDetailAr() {
    return new Promise(function (resolve, reject) {
        var ar;
        $.ajax({
            url: "http://localhost:8080/BackEnd/orderDetail/getAll",
            method: "GET",
            success: function (res) {
                console.log(res);
                ar = res;
                resolve(ar);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

$("#orderId").on("keydown", async function (e) {
    $("#order-table").empty();
    if (e.keyCode === 13) {
        let id = $("#orderId").val();
        let order = await searchOrder(id);
        if (Object.keys(order).length !== 0) {
            $("#order-table").empty();
                $("#ordCusId").val(order.customerName.customerId);
                $("#ordCusName").val(order.customerName.customerName);
                $("#ordDate").val(order.purchaseDate);
                /*$("#cusImage").attr('src', customer.proPic);
                $('#cusImage').css('display', 'block');*/
            let code;
            let qty;
            let unitPrice;
            let itemName;

                if (order.saleDetails.length !== 0) {
                    for (var info of order.saleDetails) {
                        if (info.orderDetailPK.orderNo == id) {
                            code = info.orderDetailPK.itemCode;
                            qty = info.itmQTY;
                            unitPrice = info.inventory.salePrice;
                            let res = await searchItem(code);
                            itemName = info.inventory.itemDesc;


                            let total = parseFloat(unitPrice) * parseFloat(qty);
                            let row = `<tr>
                     <td>${code}</td>
                     <td>${itemName}</td>
                     <td>${unitPrice}</td>
                     <td>${qty}</td>
                     <td>${total}</td>
                    </tr>`;
                            $("#order-table").append(row);
                            $('#order-table').css({
                                'width ': '101.8%',
                                'max-height': '80px',
                                'overflow-y': 'auto',
                                'display': 'table-caption'
                            });
                            $('#order-table>tr>td').css({
                                'flex': '1',
                                'max-width': 'calc(100%/5*1)'
                            });
                            if ($("#order-table>tr").length > 1) {
                                $('#order-table>tr').css({
                                    'width': '100%',
                                    'display': 'flex'
                                });
                            } else {
                                $('#order-table>tr').css({
                                    'width': '925px',
                                    'display': 'flex'
                                });
                            }
                        }
                    }
                }

        }

    }
});
