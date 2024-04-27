const EMP_ID_REGEX = /^C00-(0*[1-9]\d{0,2})$/;
const EMP_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const EMP_GENDER_REGEX = /^[A-Z\s]*$/;
const EMP_STATUS_REGEX = /^[A-Z\s]*$/;
const EMP_DESIGNATION_REGEX = /^[A-Za-z ]{5,}$/;
const EMP_ROLE_REGEX = /^[A-Z\s]*$/;
const EMP_JOIN_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const EMP_BRANCH_REGEX = /^[A-Za-z ]{5,}$/;
const EMP_ADDRESS_BUILD_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const EMP_ADDRESS_LANE_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const EMP_ADDRESS_CITY_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const EMP_ADDRESS_STATE_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const EMP_ADDRESS_CODE_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const EMP_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMP_CONTACT_REGEX = /^[^\p{L}]{10,}$/u;
const EMP_DOB_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const EMP_GUARDIAN_REGEX = /^[A-Za-z ]{5,}$/;
const EMP_GURDIAN_CONTACT_REGEX = /^[^\p{L}]{10,}$/u;

let em_vArray = new Array();
em_vArray.push({ field: $("#empId"), regEx: EMP_ID_REGEX, error: $("#empIdError") });
em_vArray.push({ field: $("#empName"), regEx: EMP_NAME_REGEX, error: $("#empNameError") });
em_vArray.push({ field: $("#empBuildNo"), regEx: EMP_ADDRESS_BUILD_REGEX, error: $("#empBuildNoError") });
em_vArray.push({ field: $("#empLane"), regEx: EMP_ADDRESS_LANE_REGEX, error: $("#empLaneError") });
em_vArray.push({ field: $("#empCity"), regEx: EMP_ADDRESS_CITY_REGEX, error: $("#empCityError") });
em_vArray.push({ field: $("#empState"), regEx: EMP_ADDRESS_STATE_REGEX, error: $("#empStateError") });
em_vArray.push({ field: $("#empPostalCode"), regEx: EMP_ADDRESS_CODE_REGEX, error: $("#empPostalCodeError") });
em_vArray.push({ field: $("#empEmail"), regEx: EMP_EMAIL_REGEX, error: $("#empEmailError") });
em_vArray.push({ field: $("#empGender"), regEx: EMP_GENDER_REGEX, error: $("#empGenderError") });
em_vArray.push({ field: $("#empDob"), regEx: EMP_DOB_REGEX, error: $("#empDobError") });

em_vArray.push({ field: $("#empStatus"), regEx: EMP_STATUS_REGEX , error: $("#empStatusError") });
em_vArray.push({ field: $("#designation"), regEx: EMP_DESIGNATION_REGEX, error: $("#designationError") });
em_vArray.push({ field: $("#empRole"), regEx: EMP_ROLE_REGEX , error: $("#empRoleError") });
em_vArray.push({ field: $("#joinDate"), regEx: EMP_JOIN_REGEX , error: $("#joinDateError") });
em_vArray.push({ field: $("#branc"), regEx: EMP_BRANCH_REGEX, error: $("#empContactNoError") });
em_vArray.push({ field: $("#empContactNo"), regEx: EMP_CONTACT_REGEX, error: $("#empContactNoError") });
em_vArray.push({ field: $("#empContactNo"), regEx: EMP_GUARDIAN_REGEX , error: $("#empContactNoError") });
em_vArray.push({ field: $("#empContactNo"), regEx: EMP_GURDIAN_CONTACT_REGEX , error: $("#empContactNoError") });

function clearCustomerInputFields() {
    $("#cusId,#cusName,#cusBuildNo,#cusLane,#cusCity,#cusState,#cusPostalCode,#cusEmail,#cusDob,#cusGender,#cusContactNo").val("");
    $("#cusId,#cusName,#cusBuildNo,#cusLane,#cusCity,#cusState,#cusPostalCode,#cusEmail,#cusDob,#cusGender,#cusContactNo").css("border", "1px solid #ced4da");
    $("#cusId").focus();
    $('input[name="rating"]').prop('checked', false);
    setBtn();
}
setBtn();
function setClBtn(){
    var any = false;
    $("#cusId,#cusName,#cusBuildNo,#cusLane,#cusCity,#cusState,#cusPostalCode,#cusEmail,#cusDob,#loyaltyDate,#cusContactNo").each(function () {
        if ($(this).val().trim() !== ""||$('input[name="rating"]:checked').prop('checked') == true) {
            any= true;
            return false;
        }
    });
    if (any) {
        $("#cusClear").prop("disabled", false);
    } else {
        $("#cusClear").prop("disabled", true);
    }
}
setClBtn();
function events(e) {
    setClBtn();
    let indexNo = c_vArray.indexOf(c_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidations(c_vArray[indexNo]);

    setBtn();

    if (e.key == "Enter") {

        if (e.target.id != c_vArray[c_vArray.length - 1].field.attr("id")) {
            if (checkValidations(c_vArray[indexNo])) {
                c_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(c_vArray[indexNo])) {
                saveCustomer();
            }
        }
    }
}

$("#cusName,#cusBuildNo,#cusLane,#cusCity,#cusState,#cusPostalCode,#cusEmail,#cusContactNo,#cusGender, #cusDob,#loyaltyDate").on("keydown keyup change", function (e) {
    events(e);
});
/*$("#cusGender, #cusDob, #loyaltyDate").on("", function(e) {
    events(e);
});*/
$("input[name='rating']").on("change", function(e) {
    setBtn();
});
$("#cusId").on("keydown keyup", function (e) {
    events(e);
    searchCustomer($("#cusId").val()).then(function (res){
        $("#cusId,#cusName,#cusBuildNo,#cusLane,#cusCity,#cusState" +
            ",#cusPostalCode,#cusEmail,#cusDob,#cusGender,#cusContactNo").css("border", "1px solid #ced4da");
        setBtn();
        captureClear();
        setAllCusVal(res);
    });
});

function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}



function checkAll() {
    for (let i = 0; i < c_vArray.length; i++) {
        if (!checkValidations(c_vArray[i])) return false;
    }
    return true;
}
function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
            let check = ob.field.attr('id');
            switch (check) {
                case "cusId" : ob.error.text("cus-Id is a required field: C00-"); break
                case "cusName" : ob.error.text("cus-Name is a required field: Minimum 5,Max 20,Spaces Allowed"); break
                case "cusBuildNo" : ob.error.text("BuildNo is a required field: Minimum 3"); break
                case "cusLane" : ob.error.text("Lane is a required field: Minimum 3"); break
                case "cusCity" : ob.error.text("City is a required field: Minimum 3"); break
                case "cusState" : ob.error.text("State is a required field: Minimum 3"); break
                case "cusPostalCode" : ob.error.text("PostalCode is a required field: Minimum 3"); break
                case "cusEmail" : ob.error.text("Email is not valid"); break;
                case "cusDob" : ob.error.text("Dob is not valid"); break
                case "cusContactNo" : ob.error.text("ContactNo is not valid: Minimum 10"); break
            }
        } else {
            ob.field.css("border", "1px solid #ced4da");
            ob.error.text("");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
            ob.error.text("");
        } else {
            ob.field.css("border", "1px solid #ced4da");
            ob.error.text("");
        }
    }

}
function setBtn() {
    setClBtn();
    $("#cusSave").prop("disabled", true);
    $("#cusDelete").prop("disabled", true);
    $("#cusUpdate").prop("disabled", true);
    $("#cusSearch").prop("disabled", true);
    let id = $("#cusId").val();
    if ($("#cusId").val() != "" && CUS_ID_REGEX.test($("#cusId").val())){
        $("#cusSearch").prop("disabled", false);
    }else {
        $("#cusSearch").prop("disabled", true);
    }
    validCustomer(id)
        .then(function (isValid) {
            if (isValid) {
                $("#cusDelete").prop("disabled", false);
                if (checkAll()) {
                    $("#cusUpdate").prop("disabled", false);
                    $("#cusDelete").prop("disabled", false);
                } else {
                    $("#cusUpdate").prop("disabled", true);
                }
            }else {
                $("#cusDelete").prop("disabled", true);
                $("#cusUpdate").prop("disabled", true);
                if (checkAll()) {
                    $("#cusSave").prop("disabled", false);
                } else {
                    $("#cusSave").prop("disabled", true);
                }
            }
        })
        .catch(function () {
            $("#cusDelete").prop("disabled", true);
            $("#cusUpdate").prop("disabled", true);
            if (checkAll()) {
                $("#cusSave").prop("disabled", false);
            } else {
                $("#cusSave").prop("disabled", true);
            }
        });
}

$("#cusClear").click(function () {
    var ids = ["cusId", "cusGender", "cusName","cusDob","cusBuildNo", "cusLane", "cusCity","cusState","cusPostalCode",
        "cusEmail", "cusContactNo","loyaltyDate","totalPoints", "lastPurchaseDate","rating"];
    ids.forEach(function(id) {
        $("#" + id +"Error").val("");
    });
    clearCustomerInputFields();
    c_vArray.forEach(function(item) {
        item.error.val("");
    });
    stopWebcamStream();
    $('#cusVideo').hide();
    captureClear();
});

function captureClear() {
    stopWebcamStream();
    $('#video').hide();
    $("#cusCapturedImage").show();
    $('#cusCaptureButton').css("background-color", "#007bff");
    $('#cusCaptureButton').css("border-color", "#007bff");
    $('#cusCaptureButton').text("Capture");
    $("#cusCapturedImage").attr('src', "assets/images/walk.gif");
    $('input[name="rating"]:checked').prop('checked', false);
}