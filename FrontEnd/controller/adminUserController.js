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
    /*    var targetNode = document.getElementById('admin-edit-container');
        var config = {attributes: true, attributeFilter: ['style']};
        var callback = function (mutationsList, observer) {
            for (var mutation of mutationsList) {
                if (mutation.attributeName === 'style') {
                    var displayStyle = window.getComputedStyle(targetNode).getPropertyValue('display');
                    if (displayStyle === 'none') {
                        stopAdminWebcamStream();
                        $('#adminVideo').hide();
                        $("#adminCapturedImage").show();
                        $('#adminCaptureButton').css("background-color", "#007bff");
                        $('#adminCaptureButton').css("border-color", "#007bff");
                        $('#adminCaptureButton').text("Capture");
                        $("#adminCapturedImage").attr('src', "assets/images/walk.gif");
                    }
                }
            }
        };
        var observer = new MutationObserver(callback);
        observer.observe(targetNode, config);*/
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
    adminEvents(e);
    searchUser($("#adminName").val()).then(function (res){
        if (!res) {
            let indexNo = ad_vArray.indexOf(ad_vArray.find(c => c.attr("id") === $("#adminOldPassword").attr("id")));
            if (checkAdminValidations(ad_vArray[indexNo])) {
                $("#adminSave").prop("disabled", false);
            }else {
                $("#adminSave").prop("disabled", true);
            }
        }else {}
        //captureClear();
    });
});
let adminUserVideoStream;
$('#adminCaptureButton').click(function () {
    let text = $(this).text();
    var video = $('#adminVideo')[0];
    var canvas = $('#adminCanvas')[0];
    var capturedImage = $('#adminCapturedImage');

    var constraints = {
        video: true
    };

    if (text === "Capture") {
        $("#adminClear").prop("disabled", false);
        $(this).text("Take Picture");
        $(this).css("background-color", "#dc3545");
        $(this).css("border-color", "#dc3545");
        $(video).show();
        capturedImage.hide();

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                adminUserVideoStream = stream;
                video.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing webcam:', error);
            });
    } else if (text === "Take Picture") {
        $("#adminClear").prop("disabled", false);
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL('image/png');
        capturedImage.attr('src', imageDataUrl);
        capturedImage.show();
        $(this).css("background-color", "#007bff");
        $(this).css("border-color", "#007bff");
        $(this).text("Capture");
        stopAdminWebcamStream();
        $(video).hide();
    }
});

function stopAdminWebcamStream() {
    if (adminUserVideoStream) {
        const tracks = adminUserVideoStream.getTracks();
        tracks.forEach(track => track.stop());
        adminUserVideoStream = null;
    }
}

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
                        resolve(res);
                },
                error: function (ob, textStatus, error) {
                    resolve(null);
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
$("#adminSave").on("keydown keyup", function (e) {
    saveAdmin();
});
$("#adminUpdate").on("keydown keyup", function (e) {
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
                        password: $("#adminNewPassword").val(),
                        role: $('#adminRole').val()
                    }
                    console.log(value);
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/auth//admin",
                        method: "PUt",
                        data: JSON.stringify(value),
                        contentType: "application/json",
                        success: function (res, textStatus, jsXH) {
                            alert("User Added Successfully");
                            swal("Saved", "User Added Successfully", "success");
                            //getAllCustomers();
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
function saveAdmin() {
    searchUser().then(function (user) {
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
                    alert("User Added Successfully");
                    swal("Saved", "User Added Successfully", "success");
                    //getAllCustomers();
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