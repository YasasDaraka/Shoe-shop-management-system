$(document).ready(function () {
    var targetNode = document.getElementById('customer-container');
    var config = {attributes: true, attributeFilter: ['style']};
    var callback = function (mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.attributeName === 'style') {
                var displayStyle = window.getComputedStyle(targetNode).getPropertyValue('display');
                if (displayStyle === 'none') {
                    stopWebcamStream();
                    $('#cusVideo').hide();
                    $("#cusCapturedImage").show();
                    $('#cusCaptureButton').css("background-color", "#007bff");
                    $('#cusCaptureButton').css("border-color", "#007bff");
                    $('#cusCaptureButton').text("Capture");
                    $("#cusCapturedImage").attr('src', "assets/images/walk.gif");
                }
            }
        }
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
});
let videoStream;
$('#cusCaptureButton').click(function () {
    let text = $(this).text();
    var video = $('#cusVideo')[0];
    var canvas = $('#cusCanvas')[0];
    var capturedImage = $('#cusCapturedImage');

    var constraints = {
        video: true
    };

    if (text === "Capture") {
        $("#cusClear").prop("disabled", false);
        $(this).text("Take Picture");
        $(this).css("background-color", "#dc3545");
        $(this).css("border-color", "#dc3545");
        $(video).show();
        capturedImage.hide();

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                videoStream = stream;
                video.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing webcam:', error);
            });
    } else if (text === "Take Picture") {
        $("#cusClear").prop("disabled", false);
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL('image/png');
        capturedImage.attr('src', imageDataUrl);
        capturedImage.show();
        $(this).css("background-color", "#007bff");
        $(this).css("border-color", "#007bff");
        $(this).text("Capture");
        stopWebcamStream();
        $(video).hide();
    }
});

function stopWebcamStream() {
    if (videoStream) {
        const tracks = videoStream.getTracks();
        tracks.forEach(track => track.stop());
        videoStream = null;
    }
}

function cusCaptureClear() {
    stopWebcamStream();
    $('#video').hide();
    $("#cusCapturedImage").show();
    $('#cusCaptureButton').css("background-color", "#007bff");
    $('#cusCaptureButton').css("border-color", "#007bff");
    $('#cusCaptureButton').text("Capture");
    $("#cusCapturedImage").attr('src', "assets/images/defaultCusPic.gif");
}

/*$('#cusAdd').click(function () {
    cusFieldSet(true);
    $(this).find("#cusId").focus();
    /!*generateCustomerId();
    setClBtn();*!/
});
function cusFieldSet(state) {
    var ids = ["cusId", "cusGender", "cusName","cusDob","cusBuildNo", "cusLane", "cusCity","cusState","cusPostalCode",
        "cusEmail", "cusContactNo","loyaltyDate","totalPoints", "lastPurchaseDate","rating"];
    ids.forEach(function(id) {
        $("#" + id).prop('disabled', state);
    });
    // $(this).find("#customerID").focus();
    // generateCustomerId();
    // setClBtn();
}*/
$("#cusSave").click(function () {


        var image = $("#cusCapturedImage");
        var imageUrl = image.attr('src');
        if (!imageUrl) {
            alert("Error");
        } else {
            saveCustomer();
        }

});

function returnAllCusVal(){
    var formData = {};
    var address = {};
    var rating = $("input[name='rating']:checked").val();

    formData.customerId = $("#cusId").val();
    formData.customerName = $("#cusName").val();
    formData.gender = $("#cusGender").val();
    formData.loyaltyDate = $("#loyaltyDate").val();
    formData.level = rating;
    formData.totalPoints = $("#totalPoints").val();
    formData.customerDob = $("#cusDob").val();
    address.buildNo = $("#cusBuildNo").val();
    address.lane = $("#cusLane").val();
    address.city = $("#cusCity").val();
    address.state = $("#cusState").val();
    address.postalCode = $("#cusPostalCode").val();
    formData.contactNo = $("#cusContactNo").val();
    formData.email = $("#cusEmail").val();
    formData.recentPurchase = $("#lastPurchaseDate").val();

    return formData;

}
function setAllCusVal(ar){
    var rating = $("input[name='rating']:checked").val();

    $("#cusId").val(ar.customerId);
    $("#cusName").val(ar.customerName);
    $("#cusGender").val(ar.gender);
    $("#loyaltyDate").val(ar.loyaltyDate);
    $("#totalPoints").val(ar.totalPoints);
    $("#cusDob").val(ar.customerDob);
    $("#cusBuildNo").val(ar.buildNo);
    $("#cusLane").val(ar.lane);
    $("#cusCity").val(ar.city);
    $("#cusState").val(ar.state);
    $("#cusPostalCode").val(ar.postalCode);
    $("#cusContactNo").val(ar.contactNo);
    $("#cusEmail").val(ar.email);
    $("#lastPurchaseDate").val(ar.recentPurchase);

}



getAllCustomers();


$("#cusSave").click(function () {

    if (checkAll()) {
        var image = $("#capturedImage");
        var imageUrl = image.attr('src');
        if (!imageUrl) {
            //alert("Error");
            swal("Error", "Take Customer Photo.!", "error");
        } else {
            saveCustomer();
        }
    } else {
        alert("Error");
        swal("Error", "Error Customer Save.!", "error");
    }
});

$(document).ready(function () {
   // setTime();
   // setDate();
    $("#customerID").prop('disabled', true);
    $("#customerName").prop('disabled', true);
    $("#customerAddress").prop('disabled', true);

    /*$('#cusThead').css({
        'width': '600px',
        'display': 'flex'
    });
    $('#cusThead>th').css({
        'flex': '1',
        'max-width': 'calc(100%/3*1)'
    });
    $('#customerTable').css({
        'max-height': '370px',
        'overflow-y': 'auto',
        'display': 'table-caption'
    });
    $('#customerTable>tr').css({
        'width': '600px',
        'display': 'flex'
    });
    $('#customerTable>tr>td').css({
        'flex': '1',
        'max-width': 'calc(100%/3*1)'
    });*/
});

function generateCustomerId() {
    loadCusId().then(function (id) {
        $("#cusId").val(id);
    }).catch(function (error) {
        console.error("Error loading customer Id:", error);
    });
}
function loadCusId() {
    return new Promise(function (resolve, reject) {
        var ar;
        $.ajax({
            url: "http://localhost:8080/BackEnd/customer/getGenId",
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

function loadCusAr() {
    return new Promise(function (resolve, reject) {
        var ar;
        $.ajax({
            url: "http://localhost:8080/BackEnd/customer/getAll",
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

$('#cusAdd').click(function () {
    disableAllCusFields(false);
    $(this).find("#cusId").focus();
    generateCustomerId();
    setClBtn();
});
function disableAllCusFields(value) {
    $("#cusId, #cusName, #cusBuildNo, #cusLane, #cusCity, #cusState," +
        " #cusPostalCode, #cusEmail, #cusDob, #loyaltyDate, #cusContactNo").prop("disabled", value);
}
/*function bindTrrEvents() {
    $('#customerTable>tr').click(function () {

        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();


        $("#customerID").val(id);
        $("#customerName").val(name);
        $("#customerAddress").val(address);

        $("#customerID").prop('disabled', false);
        $("#customerName").prop('disabled', false);
        $("#customerAddress").prop('disabled', false);
        $("#cusUpdate").prop('disabled', false);
        $("#cusDelete").prop('disabled', false);
        setBtn();
        searchCustomer(id).then(function (res){
            captureClear();
            $("#capturedImage").attr('src', res.proPic);
        });
    });
}*/

$("#cusDelete").click(function () {
    let id = $("#customerID").val();

    validCustomer(id).then(function (isValid) {
        if (isValid == false) {
            //alert("No such Customer..please check the ID");
            swal("Error", "No such Customer..please check the ID", "error");
            clearCustomerInputFields();
        } else {
            /*let consent = confirm("Do you want to delete.?");
            if (consent) {}*/
            swal("Do you want to delete this customer.?", {
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
                    $.ajax({
                        url: "http://localhost:8080/BackEnd/customer?cusId=" + id,
                        method: "DELETE",
                        success: function (res) {
                            console.log(res);
                            // alert("Customer Delete Successfully");
                            swal("Deleted", "Customer Delete Successfully", "success");
                            clearCustomerInputFields();
                            captureClear();
                            getAllCustomers();
                        },
                        error: function (ob, textStatus, error) {
                            //alert(textStatus + " : Error Customer Not Delete")
                            swal("Error", textStatus + "Error Customer Not Delete", "error");
                        }
                    });
                }
            });
        }
    });

    $("#customerID").prop('disabled', true);
    $("#customerName").prop('disabled', true);
    $("#customerAddress").prop('disabled', true);

});

$("#cusUpdate").click(function () {
    let id = $("#customerID").val();
    validCustomer(id).then(function (isValid) {
        if (isValid) {
            /*let consent = confirm("Do you really want to update this customer.?");
            if (consent) {}*/
            swal("Do you really want to update this customer.?", {
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
                    var array = $("#CusForm").serializeArray();
                    var data = {};
                    array.forEach(function (field) {
                        data[field.name] = field.value;
                    });
                    let haveImg = $("#capturedImage").attr('src');
                    if (haveImg.startsWith("data:image/png;base64,")){
                        data["proPic"] = haveImg;
                    }
                    console.log(data)
                    $.ajax({
                        url: "http://localhost:8080/BackEnd/customer",
                        method: "PUT",
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        success: function (res) {
                            console.log(res);
                            //alert("Customer Update Successfully")
                            swal("Updated", "Customer Update Successfully", "success");
                            captureClear();
                            getAllCustomers();
                        },
                        error: function (ob, textStatus, error) {
                            //alert(textStatus+" : Error Customer Not Update");
                            swal("Error", textStatus + "Error Customer Not Update", "error");
                        }
                    });
                    $("#customerID").prop('disabled', true);
                    $("#customerName").prop('disabled', true);
                    $("#customerAddress").prop('disabled', true);
                    clearCustomerInputFields();
                }
            });

        } else {
            swal("Error", "No such Customer..please check the ID", "error");
            /*alert("No such Customer..please check the ID");*/
        }
    });

});

function saveCustomer() {
    let id = $("#cusId").val();
    validCustomer(id).then(function (isValid) {
        console.log(isValid)
        if (!isValid) {
            console.log(isValid);
            var formData = returnAllCusVal();
            var image = $("#cusCapturedImage");
            var imageUrl = image.attr('src');
            formData.push({name: 'proPic', value: imageUrl});
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            console.log(formData);
            console.log(accessToken);
            $.ajax({
                url: "http://localhost:8080/helloshoes/api/v1/customer",
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: formData,
                /*contentType: "application/x-www-form-urlencoded",*/
                success: function (res, textStatus, jsXH) {
                    console.log(res);
                    // alert("Customer Added Successfully");
                    swal("Saved", "Customer Added Successfully", "success");
                    //getAllCustomers();

                },
                error: function (ob, textStatus, error) {
                    //alert(textStatus + " : Error Customer Not Added")
                    swal("Error", textStatus + " : Error Customer Not Added", "error");
                }
            });


        } else {
            //alert("Customer already exits.!");
            swal("Error", "Customer already exits.!", "error");
            clearCustomerInputFields();
        }
    });
}

function getAllCustomers() {

    $("#customerTable").empty();
    $.ajax({
        url: "http://localhost:8080/BackEnd/customer/getAll",
        method: "GET",
        success: function (res) {
            console.log(res);
            for (var r of res) {
                let row = `<tr>
                     <td>${r.id}</td>
                     <td>${r.name}</td>
                     <td>${r.address}</td>
                    </tr>`;
                $("#customerTable").append(row);
                $('#customerTable').css({
                    'max-height': '370px',
                    'overflow-y': 'auto',
                    'display': 'table-caption'
                });
                $('#customerTable>tr').css({
                    'width': '600px',
                    'display': 'flex'
                });
                $('#customerTable>tr>td').css({
                    'flex': '1',
                    'max-width': 'calc(100%/3*1)'
                });
                bindTrrEvents();
            }
        }
    });
}

function validCustomer(id) {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/BackEnd/customer/search/" + id,
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

function searchCustomer(id) {
    console.log(id);
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/BackEnd/customer/search/" + id,
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

$('#cusSearch').click(function () {
    let id = $("#cusId").val();
    searchCustomer(id).then(function (res) {
        setAllCusVal(res);
        captureClear();
        $("#capturedImage").attr('src', res.proPic);
    });
    setClBtn();
});
