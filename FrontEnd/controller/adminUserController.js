$(document).ready(function () {
    // setTime();
    // setDate();
    //adminFieldSet(true);
    $("#adminNewPass").hide();
    $("#adminNewPassLabel").hide();
    $("#adminSave").prop("disabled", true);
    $("#adminDelete").prop("disabled", true);
    $("#adminUpdate").prop("disabled", true);
    $("#adminSearch").prop("disabled", true);
    $("#adminClear").prop("disabled", true);


    $('#adminTable').css({
        'max-height': '100px',
        'overflow-y': 'auto',
        'display': 'table-caption'
    });
    $('#admin-thead').css({
        'width': '100%',
    });
    $('#admin-thead>th').css({
        'width': 'calc(100%/2*1)'
    })
    $('#adminTable>tr>td').css({
        'width': 'calc(100%/2*1)'
    });

});

const ADMIN_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADMIN_PASS_REGEX =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
let ad_vArray = new Array();
ad_vArray.push({ field: $("#adminName"), regEx: ADMIN_EMAIL_REGEX, error: $("#adminIdError") });
ad_vArray.push({ field: $("#adminOldPassword"), regEx: ADMIN_PASS_REGEX, error: $("#adminOldPasswordError") });
ad_vArray.push({ field: $("#adminNewPassword"), regEx: ADMIN_PASS_REGEX, error: $("#adminNewPasswordError") });
function adminEvents(e) {
    //setClBtn();
    let indexNo = ad_vArray.indexOf(ad_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkAdminValidations(ad_vArray[indexNo]);

    //setBtn();

    if (e.key == "Enter") {

        if (e.target.id != ad_vArray[ad_vArray.length - 1].field.attr("id")) {
            if (checkAdminValidations(ad_vArray[indexNo])) {
                ad_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkAdminValidations(ad_vArray[indexNo])) {
                // saveAdmin();
            }
        }
    }
}
function setAdminBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
            let check = ob.field.attr('id');
            switch (check) {
                case "adminName" : ob.error.text("Email is not valid"); break
                case "adminNewPass" : ob.error.text("8 Chars - Uppercase,Lowercase,numbers"); break;
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
function checkAdminValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setAdminBorder(true, object)
        return true;
    }
    setAdminBorder(false, object)
    return false;
}
$("#adminName").on("keydown keyup", function (e) {
    //adminEvents(e);
    searchUser($("#adminName").val()).then(function (res){
        if (!res) {
            if ($("#adminOldPassword").val() !== ""){
                if (ADMIN_PASS_REGEX.test($("#adminOldPassword").val())) {
                    $("#adminSave").prop("disabled", false);
                    $("#adminOldPasswordError").text("");
                }else {
                    $("#adminOldPasswordError").text("8 Chars - Uppercase,Lowercase,numbers");
                    $("#adminSave").prop("disabled", true);
                }
            }else {
                $("#adminSave").prop("disabled", false);
                $("#adminOldPasswordError").text("");
            }
        }else {}
        //captureClear();
    });
});

function searchUser() {
    let name = $("#adminName").val();
        return new Promise(function (resolve, reject) {
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            console.log(accessToken);
            $.ajax({
                url: "http://localhost:8080/helloshoes/api/v1/auth/search/" + name,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                dataType: "json",
                success: function (res, textStatus, xhr) {
                    if (xhr.status === 200) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                error: function (ob, textStatus, error) {
                    resolve(false);
                }
            });
        });

}

function passwordCheck(pass) {
    let value = {
        email: $("#adminName").val(),
        password:pass,
    }
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/auth/pass",
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: JSON.stringify(value),
            contentType: "application/json",
            success: function (res) {
                console.log(res);
                if (res === true) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
            error: function (ob, textStatus, error) {
                resolve(false);
            }
        });
    });

}
function checkToUpdate(oldPass) {
    searchUser().then(function (user) {
        if (user) {
            passwordCheck(oldPass).then(function (pass) {
                if (pass) {
                    $("#adminNewPass").show();
                    $("#adminNewPassLabel").show();
                    $("#adminDelete").prop("disabled", false);
                    $("#adminUpdate").prop("disabled", true);

                }else {
                    $("#adminNewPass").hide();
                    $("#adminNewPassLabel").hide();
                    $("#adminDelete").prop("disabled", true);
                    $("#adminUpdate").prop("disabled", true);
                }
            });
        }else {
            if (ADMIN_PASS_REGEX.test($("#adminOldPassword").val())) {
                $("#adminSave").prop("disabled", false);
            }else {
                $("#adminSave").prop("disabled", true);
            }
        }
    });
}
$("#adminName").on("keydown keyup", function (e) {
    if ($("#adminNewPass").is(":visible")){
        $("#adminSave").prop("disabled", true);
    }
    var password = $("#adminOldPassword").val();
    checkToUpdate(password);
});

$("#adminOldPassword").on("keydown keyup", function (e) {
    if ($("#adminNewPass").is(":visible")){
        $("#adminSave").prop("disabled", true);
    }
    var password = $("#adminOldPassword").val();
    checkToUpdate(password);
});
$("#adminNewPass").on("keydown keyup", function (e) {
    var oldPass = $("#adminOldPassword").val();
    var newPass = $("#adminNewPass").val();
    searchUser().then(function (user) {
        if (user) {
            passwordCheck(oldPass).then(function (pass) {
                if (pass) {
                    passwordCheck(newPass).then(function (check) {
                        console.log(check)
                        if (!check && newPass.length > 4) {
                            $("#adminDelete").prop("disabled", false);
                            $("#adminUpdate").prop("disabled", false);
                        }else {
                            $("#adminUpdate").prop("disabled", true);
                        }
                    });
                }
            });
        }
    });
});
$("#adminSave").click(function () {
    saveAdmin();
});
$("#adminUpdate").click(function () {
    console.log("update")
    searchUser().then(function (user) {
        if (user) {
            swal("Do you really want to update this user.?", {
                buttons: {
                    cancel1: {
                        text: "Cancel",
                        className: "custom-cancel-btn",
                    },
                    ok: {
                        text: "OK",
                        value: "confirm",
                        className: "custom-ok-btn",
                    }
                },
            }).then((con) => {
                if (con === "confirm") {
                    let value = {
                        email: $("#adminName").val(),
                        password: $("#adminNewPass").val(),
                        role: $('#adminRole').val()
                    }
                    console.log(value);
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/auth/admin",
                        method: "PUt",
                        data: JSON.stringify(value),
                        contentType: "application/json",
                        success: function (res, textStatus, jsXH) {
                            swal("Saved", "User Update Successfully", "success");
                            getAllAdmins();
                        },
                        error: function (ob, textStatus, error) {
                            swal("Error", textStatus + " : Error User Not Updated", "error");
                        }
                    });
                }
            });
        } else {
            swal("Error", "User already exits.!", "error");
        }
    });
});
function saveAdmin() {
    searchUser().then(function (user) {
        console.log("save 1")
        if (!user) {
            let value = {
                email: $("#adminName").val(),
                password: $("#adminOldPassword").val(),
                role: $('#adminRole').val()
            }
            console.log(value);
            $.ajax({
                url: "http://localhost:8080/helloshoes/api/v1/auth/signup",
                method: "POST",
                data: JSON.stringify(value),
                contentType: "application/json",
                success: function (res, textStatus, jsXH) {
                    swal("Saved", "User Added Successfully", "success");
                    getAllAdmins();
                },
                error: function (ob, textStatus, error) {
                    swal("Error", textStatus + " : Error User Not Added", "error");
                }
            });

        } else {
            swal("Error", "User already exits.!", "error");
        }
    });
}

function getAllAdmins() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    $("#adminTable").empty();
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/auth/getall/admin",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            for (var r of res) {
                let row = `<tr>
                    <th scope="row">${r.email}</th>
                    <td>${r.role}</td>
                    </tr>`;
                $("#adminTable").append(row);
                $('#adminTable').css({
                    'max-height': '100px',
                    'overflow-y': 'auto',
                    'display': 'table-caption'
                });
                $('#adminTable>tr>td').css({
                    'width': 'calc(100%/2*1)'
                });
                $('#adminTable > tr > td:nth-child(1),#adminTable > tr > td:nth-child(1)').css({
                    'width': '100%'
                });
                $('#adminTable>tr').css({
                    'display': 'inline-table',
                    'width': '100%'
                });

            }
        }
    });
}
$("#adminDelete").click(function () {
    let id = $("#adminName").val();

    searchUser(id).then(function (isValid) {
        if (isValid == false) {
            swal("Error", "No such admin..please check the ID", "error");
        } else {

            swal("Do you want to delete this admin.?", {
                buttons: {
                    cancel1: {
                        text: "Cancel",
                        className: "custom-cancel-btn",
                    },
                    ok: {
                        text: "OK",
                        value: "confirm",
                        className: "custom-ok-btn",
                    }
                },
            }).then((value) => {
                if (value === "confirm") {
                    performAuthenticatedRequest();
                    const accessToken = localStorage.getItem('accessToken');
                    let value = {
                        email: $("#adminName").val(),
                        password: $("#adminOldPassword").val(),
                        role: "ADMIN"
                    }
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/auth/admin",
                        method: "DELETE",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        data: JSON.stringify(value),
                        contentType: "application/json",
                        success: function (res) {
                            console.log(res);
                            swal("Deleted", "user Delete Successfully", "success");
                            //captureClear();
                            //getAllCustomers();
                            //setBtn();
                        },
                        error: function (ob, textStatus, error) {
                            swal("Error", textStatus + "Error user Not Delete", "error");
                        }
                    });
                }
            });
        }
    });

    /*$("#customerID").prop('disabled', true);
    $("#customerName").prop('disabled', true);
    $("#customerAddress").prop('disabled', true);*/

});