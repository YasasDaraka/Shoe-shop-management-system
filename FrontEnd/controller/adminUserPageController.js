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
    //adminEvents(e);
    searchUserPanel($("#userName").val()).then(function (res){
        if (!res) {
            if ($("#userOldPassword").val() !== ""){
                if (User_PASS_REGEX.test($("#userOldPassword").val())) {
                    $("#userSave").prop("disabled", false);
                    $("#userOldPasswordError").text("");
                }else {
                    $("#userOldPasswordError").text("8 Chars - Uppercase,Lowercase,numbers");
                    $("#userSave").prop("disabled", true);
                }
            }else {
                $("#userSave").prop("disabled", false);
                $("#userOldPasswordError").text("");
            }
        }else {
                userCheckToUpdate();
        }
        //captureClear();
    });
});

function searchUserPanel() {
    let name = $("#userName").val();
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

function userCheckToUpdate(oldPass) {
    searchUserPanel().then(function (user) {
        if (user) {
                if (pass) {
                    $("#userDelete").prop("disabled", false);
                    $("#userUpdate").prop("disabled", true);

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
    searchUserPanel().then(function (user) {
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
                        password: $("#userNewPass").val(),
                        role: $('#userRole').val()
                    }
                    console.log(value);
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/auth/user",
                        method: "PUt",
                        data: JSON.stringify(value),
                        contentType: "application/json",
                        success: function (res, textStatus, jsXH) {
                            swal("Saved", "User Added Successfully", "success");
                            getAllUsers();
                        },
                        error: function (ob, textStatus, error) {
                            swal("Error", textStatus + " : Error User Not Added", "error");
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
    searchUserPanel().then(function (user) {
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

function getAllUsers() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    $("#userTable").empty();
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/auth/getall/user",
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