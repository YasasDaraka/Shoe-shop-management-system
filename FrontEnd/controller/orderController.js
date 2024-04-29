const QTY_REGEX = /^[1-9]\d*$/;
const ord_itm_ID_REGEX = /^[A-Za-z0-9 ]{5,}$/;
const ord_CUS_ID_REGEX = /^C00-(0*[1-9]\d{0,2})$/;
let o_Array = new Array();
o_Array.push({field: $("#ordItmQty"), regEx: QTY_REGEX });
o_Array.push({field: $("#OrdItm"), regEx: ord_itm_ID_REGEX });
o_Array.push({field: $("#ordCusId"), regEx: ord_CUS_ID_REGEX });
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
    $("#order-update").prop("disabled", true);
    $("#order-delete").prop("disabled", true);
    generateOrderId();
    $('#order-thead').css({
        'width': '100%',
        'display': 'flex'
    });
    $('#order-thead>th').css({
        'flex': '1',
        'max-width': 'calc(100%/7*1)'
    })
});

$("#order-clear,.order-nav").click(function () {
    clearAll();
});

/*function generateOrderId() {
    loadOrderId().then(function (id) {
        $("#orderID").val(id);
    }).catch(function (error) {
        console.error("Error loading order Id:", error);
    });
}*/
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
$("#OrdItm").on("keydown keyup", function (e) {
    let indexNo = o_Array.indexOf(o_Array.find((c) => c.field.attr("id") == e.target.id));
    if (o_Array[indexNo].regEx.test($("#OrdItm").val())) {
        searchItem($("#OrdItm").val()).then(function (res){
            if (res != null || res != undefined){
                $("#OrdItm").css("border", "2px solid green");
                $("#OrdItmError").text("");
                $("#OrdItmDes").val(res.itemDesc);
                $("#ordItmSize").val(res.size);
                $("#ordItmPrice").val(res.salePrice);
                setAddItemBtn();
            }
            if( $("#OrdItmDes").val() == "" || $("#OrdItmDes").val() == null){
                $("#OrdItmError").text("Supplier is not Exist");
                $("#OrdItm").css("border", "2px solid red");
            }
        });
    }else {
        $("#OrdItmError").text("itm-Code is a required field: Minimum 5");
        $("#OrdItm").css("border", "2px solid red");
    }
    setOrderBtn();
    setOrdClBtn();
});
$("#ordCusId").on("keydown keyup", function (e) {
    let indexNo = o_Array.indexOf(o_Array.find((c) => c.field.attr("id") == e.target.id));
    if (o_Array[indexNo].regEx.test($("#ordCusId").val())) {
        searchCustomer($("#ordCusId").val()).then(function (res){
            if (res != null || res != undefined){
                $("#ordCusId").css("border", "2px solid green");
                $("#ordCusIdError").text("");
                $("#ordCusName").val(res.customerName);
                $("#ordPoints").val(res.totalPoints);
                setAddItemBtn();
            }
            if( $("#ordCusName").val() == "" || $("#ordCusName").val() == null){
                $("#ordCusIdError").text("Customer is not Exist");
                $("#ordCusId").css("border", "2px solid red");
            }
        });
    }else {
        $("#ordCusIdError").text("Cus-Id is a required field: C00-");
        $("#ordCusId").css("border", "2px solid red");
    }
    setOrderBtn();
    setOrdClBtn();
});
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
        "orderNo": "ORD003",
        "total": 100.0,
        "paymentMethod": "Credit Card",
        "totalPoints": 50,
        "cashier": "John Doe",
        "customerName": {
            "customerId": "C00-3",
            "customerName": "Yasas"
        },
        "saleDetails": [
            {
                "orderDetailPK": {
                    "orderNo": "ORD003",
                    "itemCode": "ITEM001"
                },
                "itmQTY": 2
            },
            {
                "orderDetailPK": {
                    "orderNo": "ORD003",
                    "itemCode": "ITEM002"
                },
                "itmQTY": 2
            }
        ]
    }

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

        order.saleDetails.push(orderDetails);
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
    let id = $("#OrdItm").val();
    let name = $("#OrdItmDes").val();
    let size = $("#ordItmSize").val();
    let price = $("#ordItmPrice").val();
    let qty = $("#ordItmQty").val();
    let total = parseFloat(price) * parseFloat(qty);
    let allTotal = 0;
    let itemExists = false;

    $('#order-table>tr').each(function (e) {
        let check = $(this).children().eq(1).text();
        if (id === check) {
            let liQty = $(this).children().eq(5).text();
            let upQty = parseInt(liQty) + parseInt(qty);

            $(this).children().eq(2).text(name);
            $(this).children().eq(3).text(size);
            $(this).children().eq(5).text(upQty);
            $(this).children().eq(6).text(upQty * parseFloat(price));
            itemExists = true;
            return false;
        }
    });

    if (!itemExists) {
        let row = `<tr>
                     <td><img class="rounded mx-auto d-block" src="assets/images/delete.gif" alt="Card" style="width: 36px; z-index: 5;" /></td>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${size}</td>
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
            'max-width': 'calc(100%/7*1)'
        });
        if ($("#order-table>tr").length > 1) {
            $('#order-table>tr').css({
                'width': '100%',
                'display': 'flex'
            });
        } else {
            $('#order-table>tr').css({
                'width': '98.2%',
                'display': 'flex'
            });
        }
        bindRemove();

    }
    $('#order-table>tr').each(function (e) {
        let full = $(this).children().eq(6).text();
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
                        //generateOrderId();
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

$("#orderId").on("keyup input change", async function (e) {
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
            let size;

                if (order.saleDetails.length !== 0) {
                    for (var info of order.saleDetails) {
                        if (info.orderDetailPK.orderNo == id) {
                            code = info.orderDetailPK.itemCode;
                            qty = info.itmQTY;
                            unitPrice = info.inventory.salePrice;
                            size = info.inventory.size;
                            itemName = info.inventory.itemDesc;


                            let total = parseFloat(unitPrice) * parseFloat(qty);
                            let row = `<tr>
                     <td><img class="rounded mx-auto d-block" src="assets/images/delete.gif" alt="Card" style="width: 36px; z-index: 5;" /></td>
                     <td>${code}</td>
                     <td>${itemName}</td>
                     <td>${size}</td>
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
                                'max-width': 'calc(100%/7*1)'
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
                            bindRemove();
                        }
                    }
                }
            $("#order-delete").prop("disabled", false);
            setOrdUpdateBtn();
        }

    }
    setOrdClBtn();
});
function bindRemove() {
    $('#order-table>tr>td').click(function () {
        let row = $(this).closest('tr');
        row.remove();

        $('#order-table').css({
            'width ': '101.8%',
            'max-height': '80px',
            'overflow-y': 'auto',
            'display': 'table-caption'
        });
        $('#order-table>tr>td').css({
            'flex': '1',
            'max-width': 'calc(100%/7*1)'
        });
        if ($("#order-table>tr").length > 1) {
            $('#order-table>tr').css({
                'width': '100%',
                'display': 'flex'
            });
        } else {
            $('#order-table>tr').css({
                'width': '98.2%',
                'display': 'flex'
            });
        }
        setOrdUpdateBtn();
    });
}
async function setOrdUpdateBtn() {
    let id = $("#orderId").val();
    let order = await searchOrder(id);
    if ($("#order-table>tr").length != order.saleDetails.length) {
        $("#btnSubmitOrder").prop("disabled", true);
        $("#order-update").prop("disabled", false);

        //updateAddedItemTable(order);
    }else {
        $("#btnSubmitOrder").prop("disabled", false);
        $("#order-update").prop("disabled", true);
    }
    setOrdClBtn();
}

function updateAddedItemTable(order) {
    $("#order-table").empty();
    order.saleDetails.forEach(saleDetail => {
        let row = `<tr>
                       <td><img class="rounded mx-auto d-block" src="assets/images/delete.gif" alt="Card" style="width: 36px; z-index: 5;" /></td>
                       <td>${saleDetail.orderDetailPK.itemCode}</td>
                       <td>${saleDetail.inventory.itemDesc}</td>
                       <td>${saleDetail.inventory.size}</td>
                       <td>${saleDetail.inventory.salePrice}</td>
                       <td>${saleDetail.itmQTY}</td>
                       <td>${saleDetail.total}</td>
                   </tr>`;
        $("#order-table").append(row);
    });
}
function setOrdClBtn(){
    var empty = true;
    $("#orderId,#OrdItmDes, #OrdItm, #ordItmPrice, #ordItmSize, #ordItmQty, #ordDate, #ordCusId, #ordCusName, #ordPoints,#txtCash").each(function() {
        if ($(this).val() !== "") {
            empty = false;
            return true;
        }
    });
    $("#order-clear").prop("disabled", empty);
}
function clearAll() {
    $("#orderId,#OrdItmDes, #OrdItm, #ordItmPrice, #ordItmSize, #ordItmQty, #ordDate, #ordCusId, #ordCusName, #ordPoints,#txtCash,#txtDiscount,#txtBalance").val("");
    $("#orderId,#OrdItmDes, #OrdItm, #ordItmPrice, #ordItmSize, #ordItmQty, #ordDate, #ordCusId, #ordCusName, #ordPoints,#txtCash").css("border", "1px solid #ced4da");

    $("#ordItmQty").text("");
    $("#total,#subtotal").text("0");
    $("#order-add-item").prop("disabled", true);
    $("#btnSubmitOrder").prop("disabled", true);
    $("#order-update").prop("disabled", true);
    $("#order-clear").prop("disabled", true);
    $("#order-delete").prop("disabled", true);
    $("#order-table").empty();
    /*$("#cusImage").attr('src', "");
    $('#cusImage').css('display', 'none');*/
}