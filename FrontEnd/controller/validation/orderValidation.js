const QTY_REGEX = /^[1-9]\d*$/;
const itm_ID_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const CUS_ID_REGEX = /^C00-(0*[1-9]\d{0,2})$/;
let o_Array = new Array();
o_Array.push({field: $("#ordItmQty"), regEx: QTY_REGEX });
o_Array.push({field: $("#OrdItm"), regEx: itm_ID_REGEX });
o_Array.push({field: $("#OrdItmDes"), regEx: CUS_ID_REGEX });

const inputChangeEvent = new Event('input', { bubbles: true });

function setAndTriggerValue($element, value) {
    $element.val(value);
    $element[0].dispatchEvent(inputChangeEvent);
}

$("#ordItmQty").on("keydown keyup input", function (e){
    let indexNo = o_Array.indexOf(o_Array.find((c) => c.field.attr("id") == e.target.id));
    checkOrderValidations(o_Array[indexNo]);
    setAddItemBtn();
    setOrderBtn();
});
function setAddItemBtn() {
    /*let nm =  Item_NAME_REGEX.test($("#itemName").val());
    let pr =  UNIT_PRICE_REGEX.test($("#price").val());
    let qh =  Item_QTY_REGEX.test($("#qtyOnHand").val());*/
    let oq =  QTY_REGEX.test($("#orderQty").val());

    if(oq){

            $("#order-add-item").prop("disabled", false);

            //$("#order-add-item").prop("disabled", true);          use id search

    }else {
        $("#order-add-item").prop("disabled", true);
    }
}

function checkOrderValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setOrderBorder(true, object)
        return true;
    }
    setOrderBorder(false, object)
    return false;
}
function setOrderBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}
function setOrderBtn() {
    let id = $("#orderId").val();
    searchOrder(id).then(function (order) {
        if (Object.keys(order).length === 0) {
            if (checkAllOrder()) {
                $("#btnSubmitOrder").prop("disabled", false);
            } else {
                $("#btnSubmitOrder").prop("disabled", true);
            }
        }
    });
}
function checkAllOrder() {
    for (let i = 0; i < o_Array.length; i++) {
        if (!checkOrderValidations(o_Array[i])) return false;
    }
    return true;
}
function itemValidate() {
    let subtotal = parseFloat($("#subtotal").text());
    if (subtotal>0) {
        return true;
    }
    return false;
}
function cashValidate() {
    let subtotal = parseFloat($("#subtotal").text());
    let cash = parseFloat($("#txtCash").val());

    if (!isNaN(subtotal) && !isNaN(cash)) {
        if (cash >= subtotal) {
            $("#txtCash").css("border", "2px solid green");
            return true;
        } else if (cash < subtotal) {
            $("#txtCash").css("border", "2px solid red");
        } else {
            $("#txtCash").css("border", "1px solid #ced4da");
        }
    }
    return false;
}

/*$("#orderQty").on("keydown keyup input", function (e){
    let qty = parseInt($("#qtyOnHand").val());
    let orderQty = parseInt($("#orderQty").val());
    console.log(qty,orderQty);
    if (qty>=orderQty && qty<=0){
        $("#orderQty").css("border", "2px solid green");
        $("#QtyError").text("");
        $("#order-add-item").prop("disabled", false);
    }if (qty<orderQty && qty>=0){
        $("#orderQty").css("border", "2px solid red");
        $("#QtyError").text("");
        $("#order-add-item").prop("disabled", true);
    }
    if (qty<orderQty){
        $("#orderQty").css("border", "2px solid red");
        $("#QtyError").text(`Please Enter Amount lower than: ${qty}`);
        $("#order-add-item").prop("disabled", true);
    }
    else if (orderQty<=0){
        $("#orderQty").css("border", "2px solid red");
        $("#QtyError").text(`Please Enter Valid Amount`);
        $("#order-add-item").prop("disabled", true);
    }
    else if(isNaN(orderQty)){
        $("#QtyError").text("Pleace Input Qty");
        $("#order-add-item").prop("disabled", true);
    }else{
        $("#QtyError").text("");
    }
});*/

$("#OrdItmDes, #OrdItm, #ordItmPrice, #ordItmSize, #ordItmQty, #ordDate, #ordCusId, #ordCusName, #ordPoints,#txtCash,#txtDiscount,#txtBalance").on("keydown keyup input change", function (e){
    setOrdClBtn();
});
