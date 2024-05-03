$(document).ready(function () {
    // setTime();
    // setDate();
    //adminFieldSet(true);
    $("#userSave").prop("disabled", true);
    $("#userDelete").prop("disabled", true);
    $("#userUpdate").prop("disabled", true);
    $("#userClear").prop("disabled", true);


    $('#userTable').css({
        'max-height': '100px',
        'overflow-y': 'auto',
        'display': 'table-caption'
    });
    $('#user-thead').css({
        'width': '100%',
    });
    $('#user-thead>th').css({
        'width': 'calc(100%/2*1)'
    })
    $('#userTable>tr>td').css({
        'width': 'calc(100%/2*1)'
    });

});

const User_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const User_PASS_REGEX =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
let us_vArray = new Array();
us_vArray.push({ field: $("#userName"), regEx: User_EMAIL_REGEX, error: $("#userIdError") });
us_vArray.push({ field: $("#userOldPassword"), regEx: User_PASS_REGEX, error: $("#userOldPasswordError") });

$("#userName").on("keydown keyup", function (e) {
    /*$("#userIdError").text("");
    $("#userName").css("border", "1px solid #ced4da");*/
    //adminEvents(e);
    if ($("#userName").val() !== "") {
    if (User_EMAIL_REGEX.test($("#userName").val())) {
        searchUserPanel($("#userName").val()).then(function (res) {
            $("#userIdError").text("");
            $("#userName").css("border", "2px solid green");
            if (!res) {
                if ($("#userOldPassword").val() !== "") {
                    if (User_PASS_REGEX.test($("#userOldPassword").val())) {
                        $("#userSave").prop("disabled", false);
                        $("#userOldPasswordError").text("");
                    } else {
                        $("#userOldPasswordError").text("8 Chars - Uppercase,Lowercase,numbers");
                        $("#userSave").prop("disabled", true);
                    }
                }
            } else {
                userCheckToUpdate($("#userOldPassword").val());
                $("#userDelete").prop("disabled", false);
            }
            //captureClear();
        });
    } else {
        $("#userIdError").text("Not valid Email");
        $("#userName").css("border", "2px solid red");
    }
}else {
        $("#userIdError").text("");
        $("#userName").css("border", "1px solid #ced4da");
        $("#userClear").prop("disabled", false);
    }
});
$("#userOldPassword").on("keydown keyup", function (e) {
    /*$("#userOldPasswordError").text("");
    $("#userOldPassword").css("border", "1px solid #ced4da");*/
    if ($("#userOldPassword").val() !== "") {
        if (User_PASS_REGEX.test($("#userOldPassword").val())) {
            searchUserPanel($("#userName").val()).then(function (res) {
                if (!res) {
                    $("#userSave").prop("disabled", false);
                    $("#userOldPasswordError").text("");
                    $("#userOldPassword").css("border", "1px solid #ced4da");
                }
                else {
                    userCheckToUpdate($("#userOldPassword").val());
                }
            });
        }
        else {
            $("#userOldPasswordError").text("8 Chars - Uppercase,Lowercase,numbers");
            $("#userOldPassword").css("border", "2px solid red");
            $("#userSave").prop("disabled", true);
        }
    } else {
        $("#userSave").prop("disabled", false);
        $("#userOldPasswordError").text("");
        $("#userOldPassword").css("border", "1px solid #ced4da")
        $("#userClear").prop("disabled", false);
    }
});
function searchUserPanel(name) {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/auth/search/" + name,
            method: "GET",
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

function userCheckToUpdate(oldPass) {
    searchUserPanel($("#userName").val()).then(function (user) {
        if (user) {
            if (User_PASS_REGEX.test($("#userOldPassword").val())) {
                    $("#userDelete").prop("disabled", false);
                    $("#userUpdate").prop("disabled", false);

                }else {
                    $("#userDelete").prop("disabled", true);
                    $("#userUpdate").prop("disabled", true);
                }
        }else {
            if (User_PASS_REGEX.test($("#userOldPassword").val())) {
                $("#userSave").prop("disabled", false);
            }else {
                $("#userSave").prop("disabled", true);
            }
        }
    });
}
$("#userSave").click(function () {
    saveUser();
});
$("#userUpdate").click(function () {
    console.log("update")
    searchUserPanel($("#userName").val()).then(function (user) {
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
                        email: $("#userName").val(),
                        password: $("#userOldPassword").val(),
                        role: $('#userRole').val()
                    }
                    console.log(value);
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/auth/user",
                        method: "PUt",
                        data: JSON.stringify(value),
                        contentType: "application/json",
                        success: function (res, textStatus, jsXH) {
                            swal("Saved", "User Update Successfully", "success");
                            getAllUsers();
                        },
                        error: function (ob, textStatus, error) {
                            swal("Error", textStatus + " : Error User Not Update", "error");
                        }
                    });
                }
            });
        } else {
            swal("Error", "User already exits.!", "error");
        }
    });
});
function saveUser() {
    searchUserPanel($("#userName").val()).then(function (user) {
        console.log("save 1")
        if (!user) {
            let value = {
                email: $("#userName").val(),
                password: $("#userOldPassword").val(),
                role: $('#userRole').val()
            }
            console.log(value);
            $.ajax({
                url: "http://localhost:8080/helloshoes/api/v1/auth/signup",
                method: "POST",
                data: JSON.stringify(value),
                contentType: "application/json",
                success: function (res, textStatus, jsXH) {
                    swal("Saved", "User Added Successfully", "success");
                    getAllUsers();
                    userClear();
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

function bindUserTrrEvents() {
    $('#userTable>tr').click(function () {

        let name = $(this).children().eq(0).text();
        let role = $(this).children().eq(1).text();

        $("#userName").val(name);
        $("#userRole").val(role);

        $("#userDelete").prop('disabled', false);
    });
}

function getAllUsers() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    $("#userTable").empty();
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/auth/getall/user",
        method: "GET",
        success: function (res) {
            console.log(res);
            for (var r of res) {
                let row = `<tr>
                    <th scope="row">${r.email}</th>
                    <td>${r.role}</td>
                    </tr>`;
                $("#userTable").append(row);
                $('#userTable').css({
                    'max-height': '100px',
                    'overflow-y': 'auto',
                    'display': 'table-caption'
                });
                $('#userTable>tr>td').css({
                    'width': 'calc(100%/2*1)'
                });
                $('#userTable > tr > td:nth-child(1),#adminTable > tr > td:nth-child(1)').css({
                    'width': '100%'
                });
                $('#userTable>tr').css({
                    'display': 'inline-table',
                    'width': '100%'
                });
                bindUserTrrEvents();
            }
        }
    });
}
$("#userDelete").click(function () {
    let id = $("#userName").val();

    searchUserPanel(id).then(function (isValid) {
        if (isValid == false) {
            swal("Error", "No such user..please check the ID", "error");
        } else {

            swal("Do you want to delete this user.?", {
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
                        email: $("#userName").val(),
                        password: $("#userOldPassword").val(),
                        role: "ADMIN"
                    }
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/auth/user",
                        method: "DELETE",
                        data: JSON.stringify(value),
                        contentType: "application/json",
                        success: function (res) {
                            console.log(res);
                            swal("Deleted", "user Delete Successfully", "success");
                            userClear();
                            getAllUsers();
                            //captureClear();
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
$("#userClear").click(function () {
   userClear();
});
function userClear() {
    var ids = ["userName", "userIdError", "userOldPassword","userOldPasswordError"];
    ids.forEach(function(id) {
        $("#" + id).val("");
    });
    $("#userIdError").text("");
    $("#userOldPasswordError").text("");
    $("#userName").css("border", "1px solid #ced4da");
    $("#userOldPassword").css("border", "1px solid #ced4da");
    $("#cusClear").prop("disabled", true);
    $("#userSave").prop("disabled", true);
    $("#userDelete").prop("disabled", true);
    $("#userUpdate").prop("disabled", true);
    $("#userClear").prop("disabled", true);
}