$(document).ready(function () {
    // setTime();
    // setDate();
    /*itmFieldSet(false);*/
    $("#itmSave").prop("disabled", true);
    $("#itmDelete").prop("disabled", true);
    $("#itmUpdate").prop("disabled", true);
    $("#itmSearch").prop("disabled", true);
    $("#itmClear").prop("disabled", true);
    //setItmClBtn();
    var targetNode = document.getElementById('inventory-main');
    var config = {attributes: true, attributeFilter: ['style']};
    var callback = function (mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.attributeName === 'style') {
                var displayStyle = window.getComputedStyle(targetNode).getPropertyValue('display');
                if (displayStyle === 'none') {
                    stopItmWebcamStream();
                    $('#itmVideo').hide();
                    $("#itmCapturedImage").show();
                    $('#itmCaptureButton').css("background-color", "#007bff");
                    $('#itmCaptureButton').css("border-color", "#007bff");
                    $('#itmCaptureButton').text("Capture");
                    $("#itmCapturedImage").attr('src', "assets/images/walk.gif");
                }
            }
        }
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
});
let itmVideoStream;
$('#itmCaptureButton').click(function () {
    let text = $(this).text();
    var video = $('#itmVideo')[0];
    var canvas = $('#itmCanvas')[0];
    var capturedImage = $('#itmCapturedImage');

    var constraints = {
        video: true
    };

    if (text === "Capture") {
        $("#itmClear").prop("disabled", false);
        $(this).text("Take Picture");
        $(this).css("background-color", "#dc3545");
        $(this).css("border-color", "#dc3545");
        $(video).show();
        capturedImage.hide();

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                itmVideoStream = stream;
                video.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing webcam:', error);
            });
    } else if (text === "Take Picture") {
        $("#itmClear").prop("disabled", false);
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL('image/png');
        capturedImage.attr('src', imageDataUrl);
        capturedImage.show();
        $(this).css("background-color", "#007bff");
        $(this).css("border-color", "#007bff");
        $(this).text("Capture");
        stopItmWebcamStream();
        $(video).hide();
    }
});

function stopItmWebcamStream() {
    if (itmVideoStream) {
        const tracks = itmVideoStream.getTracks();
        tracks.forEach(track => track.stop());
        itmVideoStream = null;
    }
}

function itmFieldSet(state) {
    itm_vArray.forEach(function(item) {
        item.field.prop('disabled', state);
    });
    $(this).find("#itmCode").focus();
    //generateEmployeeId();
    setItmClBtn();
}

function returnAllItmVal() {
    var image = $("#itmCapturedImage");
    var imageUrl = image.attr('src');
    var formData = {
        itemCode: $("#itmCode").val(),
        itemDesc: $("#itmName").val(),
        itemPicture: imageUrl,
        category: $("#itmCat").val(),
        size: parseInt($("#itmSize").val()),
        supplier: { supplierCode: $("#itmSupId").val() },
        salePrice: parseFloat($("#itmSalePrice").val()),
        buyPrice: parseFloat($("#itmBuyPrice").val()),
        expectedProfit: parseFloat($("#itmProfit").val()),
        profitMargin: parseFloat($("#itmProfitMargin").val()),
        status: $("#itmStatus").val(),
    };

    return formData;
}
function setAllItmVal(ar) {
    console.log(ar)
    $("#itmName").val(ar.itemDesc);
    $("#itmCat").val(ar.category);
    $("#itmSize").val(ar.size);
    $("#itmSupId").val(ar.supplier.supplierCode);
    $("#itmSupName").val(ar.supplier.supplierName);
    $("#itmSalePrice").val(ar.salePrice);
    $("#itmBuyPrice").val(ar.buyPrice);
    $("#itmProfit").val(ar.expectedProfit);
    $("#itmProfitMargin").val(ar.profitMargin);
    $("#itmStatus").val(ar.status);
    $("#itmCapturedImage").attr('src', ar.itemPicture);
}

//getAllEmployees();
$("#itmSave").click(function () {

    if (checkAllItm()) {
        var image = $("#itmCapturedImage");
        var imageUrl = image.attr('src');
        if (!imageUrl) {
            //alert("Error");
            swal("Error", "Take Item Photo.!", "error");
        } else {
            saveItem();
        }
    } else {
        alert("Error");
        swal("Error", "Error Item Save.!", "error");
    }
});

function loadItmAr() {
    return new Promise(function (resolve, reject) {
        var ar;
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/inventory/getAll",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
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


/*function bindEmpTrrEvents() {
    $('#employeeTable>tr').click(function () {
        var employeeId = $(this).children().eq(0).text();
        var employeeName = $(this).children().eq(1).text();
        var gender = $(this).children().eq(2).text();
        var employeeDob = $(this).children().eq(3).text();
        var employeeStatus = $(this).children().eq(4).text();
        var contactNo = $(this).children().eq(5).text();
        var email = $(this).children().eq(6).text();
        var branch = $(this).children().eq(7).text();
        var designation = $(this).children().eq(8).text();
        var role = $(this).children().eq(9).text();
        var joinDate = $(this).children().eq(10).text();
        var guardianName = $(this).children().eq(11).text();
        var emergencyContact = $(this).children().eq(12).text();
        var buildNo = $(this).children().eq(13).text();
        var lane = $(this).children().eq(14).text();
        var city = $(this).children().eq(15).text();
        var state = $(this).children().eq(16).text();
        var postalCode = $(this).children().eq(17).text();


        $("#empId").val(employeeId);
        $("#empName").val(employeeName);
        $("#empBuildNo").val(buildNo);
        $("#empLane").val(lane);
        $("#empCity").val(city);
        $("#empState").val(state);
        $("#empPostalCode").val(postalCode);
        $("#empEmail").val(email);
        $("#empDob").val(employeeDob);
        $("#empGender").val(gender);
        $("#empContactNo").val(contactNo);
        $("#empStatus").val(employeeStatus);
        $("#designation").val(designation);
        $("#empRole").val(role);
        $("#joinDate").val(joinDate);
        $("#empBranch").val(branch);
        $("#guardianName").val(guardianName);
        $("#emergencyContact").val(emergencyContact);
        /!*$("#customerID").prop('disabled', false);
        $("#customerName").prop('disabled', false);
        $("#customerAddress").prop('disabled', false);
        $("#cusUpdate").prop('disabled', false);
        $("#cusDelete").prop('disabled', false);*!/
        setEmpBtn();
        searchEmployee(employeeId).then(function (res){
            empCaptureClear();
            $("#empCapturedImage").attr('src', res.proPic);

        });
    });
}*/

$("#itmDelete").click(function () {
    let id = $("#itmCode").val();

    validItem(id).then(function (isValid) {
        if (isValid == false) {
            swal("Error", "No such Item..please check the ID", "error");
            clearItmInputFields();
        } else {

            swal("Do you want to delete this Item.?", {
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
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/inventory?itmId=" + id,
                        method: "DELETE",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        success: function (res) {
                            console.log(res);
                            swal("Deleted", "Item Delete Successfully", "success");
                            clearItmInputFields();
                            itmCaptureClear();
                            //getAllCustomers();
                        },
                        error: function (ob, textStatus, error) {
                            swal("Error", textStatus + "Error Employee Not Delete", "error");
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

$("#itmUpdate").click(function () {
    let id = $("#itmCode").val();
    validItem(id).then(function (isValid) {
        if (isValid) {
            swal("Do you really want to update this Item.?", {
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
                    var data = returnAllItmVal();
                    performAuthenticatedRequest();
                    const accessToken = localStorage.getItem('accessToken');
                    console.log(data)
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/inventory",
                        method: "PUT",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        success: function (res) {
                            console.log(res);
                            //alert("Customer Update Successfully")
                            swal("Updated", "Item Update Successfully", "success");
                            itmCaptureClear();
                            //getAllCustomers();
                        },
                        error: function (ob, textStatus, error) {
                            //alert(textStatus+" : Error Customer Not Update");
                            swal("Error", textStatus + "Error Item Not Update", "error");
                        }
                    });
                    /* $("#customerID").prop('disabled', true);
                     $("#customerName").prop('disabled', true);
                     $("#customerAddress").prop('disabled', true);
                     clearCustomerInputFields();*/
                }
            });

        } else {
            swal("Error", "No such Item..please check the ID", "error");
            /*alert("No such Customer..please check the ID");*/
        }
    });

});

function saveItem() {
    let id = $("#itmCode").val();
    validItem(id).then(function (isValid) {
        console.log(isValid)
        if (!isValid) {
            console.log(isValid);
            var formData = returnAllItmVal();
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            console.log(formData);
            console.log(accessToken);
            $.ajax({
                url: "http://localhost:8080/helloshoes/api/v1/inventory",
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: JSON.stringify(formData),
                contentType: "application/json",
                success: function (res, textStatus, jsXH) {
                    console.log(res);
                    // alert("Customer Added Successfully");
                    swal("Saved", "Item Added Successfully", "success");
                    //getAllCustomers();
                },
                error: function (ob, textStatus, error) {
                    //alert(textStatus + " : Error Customer Not Added")
                    swal("Error", textStatus + " : Error Employee Not Added", "error");
                }
            });


        } else {
            //alert("Customer already exits.!");
            swal("Error", "Employee already exits.!", "error");
            clearItmInputFields();
        }
    });
}

function getAllItems() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    $("#itemTable").empty();
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/inventory/getAll",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            for (var r of res) {
                let row = `<tr>
                    <th scope="row">${r.employeeId}</th>
                    <td>${r.employeeName}</td>
                    <td>${r.gender}</td>
                    <td>${r.employeeDob}</td> 
                    <td>${r.employeeStatus}</td>
                    <td>${r.contactNo}</td>
                    <td>${r.email}</td>
                    <td>${r.branch}</td>
                    <td>${r.designation}</td>
                    <td>${r.role}</td>
                    <td>${r.joinDate}</td>
                    <td>${r.guardianName}</td>
                    <td>${r.emergencyContact}</td>
                    <td>${r.address.buildNo}</td>
                    <td>${r.address.lane}</td>
                    <td>${r.address.city}</td>
                    <td>${r.address.state}</td>
                    <td>${r.address.postalCode}</td>
                </tr>`;

                $("#itemTable").append(row);
                bindItmTrrEvents();
            }
        }
    });
}

function validItem(id) {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/inventory/search/" + id,
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

function searchItem(id) {
    console.log(id);
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/inventory/search/" + id,
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

$('#itmSearch').click(function () {
    let id = $("#itmCode").val();
    searchItem(id).then(function (res) {
        setAllItmVal(res);
        itmCaptureClear();
        $("#itmCapturedImage").attr('src', res.proPic);
    });
    setItmClBtn();
});
