$(document).ready(function () {
    // setTime();
    // setDate();
    //adminFieldSet(true);
    $("#adminNewPass").hide();
    $("#adminSave").prop("disabled", true);
    $("#adminDelete").prop("disabled", true);
    $("#adminUpdate").prop("disabled", true);
    $("#adminSearch").prop("disabled", true);
    $("#adminClear").prop("disabled", true);
    var targetNode = document.getElementById('admin-edit-main');
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
    observer.observe(targetNode, config);
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
                    console.log(res);
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

function passwordCheck() {
    let value = {
        email: $("#adminName").val(),
        password: $("#adminOldPassword").val(),
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
function checkToUpdate(password) {
    searchUser().then(function (isValid) {
        if (Object.keys(isValid).length !== 0) {
            passwordCheck(oldPass).then(function (isValid) {
                if (isValid) {
                    $("#adminNewPass").show();
                }
            });
        }
    });
}
$("#adminName").on("keydown keyup", function (e) {
    var password = $("#adminOldPassword").val();
    checkToUpdate(password);
});

$("#adminOldPassword").on("keydown keyup", function (e) {
    var password = $("#adminOldPassword").val();
    checkToUpdate(password);
});
$("#adminNewPass").on("keydown keyup", function (e) {
    var oldPass = $("#adminOldPassword").val();
    var newPass = $("#adminNewPass").val();
    searchUser().then(function (isValid) {
        if (Object.keys(isValid).length !== 0) {
            passwordCheck(oldPass).then(function (isValid) {
                if (isValid) {
                    passwordCheck(newPass).then(function (isValid) {
                        if (!isValid) {
                            $("#adminDelete").prop("disabled", false);
                            $("#adminUpdate").prop("disabled", false);
                        }
                    });
                }
            });
        }
    });
});