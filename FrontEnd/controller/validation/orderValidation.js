

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
    let oq =  QTY_REGEX.test($("#ordItmQty").val());

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
    if(id !== "" && id !== undefined){
        searchOrder(id).then(function (order) {
            if (Object.keys(order).length === 0) {
                if (checkAllOrder()) {
                    if ($("#txtCash").prop("disabled")!== true && $("#txtCash").val()!== ""){
                        $("#btnSubmitOrder").prop("disabled", false);
                    }else {
                        $("#btnSubmitOrder").prop("disabled", true);
                    }
                } else {
                    $("#btnSubmitOrder").prop("disabled", true);
                }
            }
        });
    }else {
         $("#btnSubmitOrder").prop("disabled", true);
    }

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


$("#OrdItmDes, #OrdItm, #ordItmPrice, #ordItmSize, #ordItmQty, #ordCusId, #ordCusName, #ordPoints,#txtCash,#txtDiscount,#txtBalance").on("keydown keyup input change", function (e){
    var empty = true;
    $("#orderId,#OrdItmDes, #OrdItm, #ordItmPrice, #ordItmSize, #ordItmQty, #ordCusId, #ordCusName, #ordPoints,#txtCash").each(function() {
        if ($(this).val() !== "") {
            empty = false;
            return true;
        }
    });
    $("#order-clear").prop("disabled", empty);
});
