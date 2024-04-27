$(document).ready(function () {
    // setTime();
    // setDate();
    empFieldSet(true);
    var targetNode = document.getElementById('employee-container');
    var config = {attributes: true, attributeFilter: ['style']};
    var callback = function (mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.attributeName === 'style') {
                var displayStyle = window.getComputedStyle(targetNode).getPropertyValue('display');
                if (displayStyle === 'none') {
                    stopEmpWebcamStream();
                    $('#empVideo').hide();
                    $("#empCapturedImage").show();
                    $('#empCaptureButton').css("background-color", "#007bff");
                    $('#empCaptureButton').css("border-color", "#007bff");
                    $('#empCaptureButton').text("Capture");
                    $("#empCapturedImage").attr('src', "assets/images/walk.gif");
                }
            }
        }
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
});
let empVideoStream;
$('#empCaptureButton').click(function () {
    let text = $(this).text();
    var video = $('#empVideo')[0];
    var canvas = $('#empCanvas')[0];
    var capturedImage = $('#empCapturedImage');

    var constraints = {
        video: true
    };

    if (text === "Capture") {
        $("#empClear").prop("disabled", false);
        $(this).text("Take Picture");
        $(this).css("background-color", "#dc3545");
        $(this).css("border-color", "#dc3545");
        $(video).show();
        capturedImage.hide();

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                empVideoStream = stream;
                video.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing webcam:', error);
            });
    } else if (text === "Take Picture") {
        $("#empClear").prop("disabled", false);
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL('image/png');
        capturedImage.attr('src', imageDataUrl);
        capturedImage.show();
        $(this).css("background-color", "#007bff");
        $(this).css("border-color", "#007bff");
        $(this).text("Capture");
        stopEmpWebcamStream();
        $(video).hide();
    }
});

function stopEmpWebcamStream() {
    if (empVideoStream) {
        const tracks = empVideoStream.getTracks();
        tracks.forEach(track => track.stop());
        empVideoStream = null;
    }
}

$('#empAdd').click(function () {
    empFieldSet(false);
    $(this).find("#empId").focus();
    generateEmployeeId();
    setEmpClBtn();
});

function empFieldSet(state) {
    em_vArray.forEach(function(item) {
        item.field.prop('disabled', state);
    });
    /*var ids = ["cusId", "cusGender", "cusName", "cusDob", "cusBuildNo", "cusLane", "cusCity", "cusState", "cusPostalCode",
        "cusEmail", "cusContactNo", "loyaltyDate", "totalPoints", "lastPurchaseDate", "rating"];
    ids.forEach(function (id) {
        $("#" + id).prop('disabled', state);
    });*/
    $(this).find("#empId").focus();
    generateEmployeeId();
    setEmpClBtn();
}

function returnAllEmpVal() {
    var image = $("#empCapturedImage");
    var imageUrl = image.attr('src');
    var formData = {
        employeeId: $("#empId").val(),
        employeeName: $("#empName").val(),
        gender: $("#empGender").val(),
        employeeStatus: $("#empStatus").val(),
        designation: $("#designation").val(),
        role: $("#empRole").val(),
        employeeDob: $("#empDob").val(),
        joinDate: $("#joinDate").val(),
        branch: $("#empBranch").val(),
        address: {
            buildNo: $("#empBuildNo").val(),
            lane: $("#empLane").val(),
            city: $("#empCity").val(),
            state: $("#empState").val(),
            postalCode: $("#empPostalCode").val()
        },
        contactNo: $("#empContactNo").val(),
        email: $("#empEmail").val(),
        guardianName: $("#guardianName").val(),
        emergencyContact: $("#emergencyContact").val(),
        proPic: imageUrl
    };

    return formData;
}
function setAllEmpVal(ar) {
    console.log(ar)
    $("#empName").val(ar.employeeName);
    $("#empBuildNo").val(ar.address.buildNo);
    $("#empLane").val(ar.address.lane);
    $("#empCity").val(ar.address.city);
    $("#empState").val(ar.address.state);
    $("#empPostalCode").val(ar.address.postalCode);
    $("#empEmail").val(ar.email);
    $("#empDob").val(ar.employeeDob);
    $("#empGender").val(ar.gender);
    $("#empContactNo").val(ar.contactNo);
    $("#empStatus").val(ar.employeeStatus);
    $("#designation").val(ar.designation);
    $("#empRole").val(ar.role);
    $("#joinDate").val(ar.joinDate);
    $("#empBranch").val(ar.branch);
    $("#guardianName").val(ar.guardianName);
    $("#emergencyContact").val(ar.emergencyContact);
    $("#empCapturedImage").attr('src', ar.proPic);
}

//getAllEmployees();
$("#empSave").click(function () {

    if (checkAllEmp()) {
        var image = $("#empCapturedImage");
        var imageUrl = image.attr('src');
        if (!imageUrl) {
            //alert("Error");
            swal("Error", "Take Employee Photo.!", "error");
        } else {
            saveEmployee();
        }
    } else {
        alert("Error");
        swal("Error", "Error Employee Save.!", "error");
    }
});

function generateEmployeeId() {
    loadEmpId().then(function (id) {
        $("#empId").val(id);
    }).catch(function (error) {
        console.error("Error loading Employee Id:", error);
    });
}

function loadEmpId() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        var ar;
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/employee/getGenId",
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

function loadEmpAr() {
    return new Promise(function (resolve, reject) {
        var ar;
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/employee/getAll",
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


function bindEmpTrrEvents() {
    $('#employeeTable>tr').click(function () {

        let customerId = $(this).children().eq(0).text();
        let customerName = $(this).children().eq(1).text();
        let gender = $(this).children().eq(2).text();
        let loyaltyDate = $(this).children().eq(3).text();
        let level = $(this).children().eq(4).text();
        let totalPoints = $(this).children().eq(5).text();
        let customerDob = $(this).children().eq(6).text();
        let buildNo = $(this).children().eq(7).text();
        let lane = $(this).children().eq(8).text();
        let city = $(this).children().eq(9).text();
        let state = $(this).children().eq(10).text();
        let postalCode = $(this).children().eq(11).text();
        let contactNo = $(this).children().eq(12).text();
        let email = $(this).children().eq(13).text();
        let recentPurchase = $(this).children().eq(14).text();


        $("#cusId").val(customerId);
        $("#cusName").val(customerName);
        $("#cusGender").val(gender);
        $("#loyaltyDate").val(loyaltyDate);
        $("#totalPoints").val(totalPoints);
        $("#cusDob").val(customerDob);
        $("#cusBuildNo").val(buildNo);
        $("#cusLane").val(lane);
        $("#cusCity").val(city);
        $("#cusState").val(state);
        $("#cusPostalCode").val(postalCode);
        $("#cusContactNo").val(contactNo);
        $("#cusEmail").val(email);
        $("#lastPurchaseDate").val(recentPurchase);
        /*$("#customerID").prop('disabled', false);
        $("#customerName").prop('disabled', false);
        $("#customerAddress").prop('disabled', false);
        $("#cusUpdate").prop('disabled', false);
        $("#cusDelete").prop('disabled', false);*/
        setBtn();
        searchCustomer(customerId).then(function (res){
            captureClear();
            setLevel(res.level);
            $("#cusCapturedImage").attr('src', res.proPic);

        });
    });
}

$("#empDelete").click(function () {
    let id = $("#empId").val();

    validEmployee(id).then(function (isValid) {
        if (isValid == false) {
            swal("Error", "No such Employee..please check the ID", "error");
            clearEmpInputFields();
        } else {

            swal("Do you want to delete this Employee.?", {
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
                        url: "http://localhost:8080/helloshoes/api/v1/employee?empId=" + id,
                        method: "DELETE",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        success: function (res) {
                            console.log(res);
                            swal("Deleted", "Employee Delete Successfully", "success");
                            clearEmpInputFields();
                            empCaptureClear();
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

$("#empUpdate").click(function () {
    let id = $("#empId").val();
    validEmployee(id).then(function (isValid) {
        if (isValid) {
            swal("Do you really want to update this employee.?", {
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
                    var data = returnAllEmpVal();
                    performAuthenticatedRequest();
                    const accessToken = localStorage.getItem('accessToken');
                    console.log(data)
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/employee",
                        method: "PUT",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        success: function (res) {
                            console.log(res);
                            //alert("Customer Update Successfully")
                            swal("Updated", "Employee Update Successfully", "success");
                            empCaptureClear();
                            //getAllCustomers();
                        },
                        error: function (ob, textStatus, error) {
                            //alert(textStatus+" : Error Customer Not Update");
                            swal("Error", textStatus + "Error Employee Not Update", "error");
                        }
                    });
                    /* $("#customerID").prop('disabled', true);
                     $("#customerName").prop('disabled', true);
                     $("#customerAddress").prop('disabled', true);
                     clearCustomerInputFields();*/
                }
            });

        } else {
            swal("Error", "No such Employee..please check the ID", "error");
            /*alert("No such Customer..please check the ID");*/
        }
    });

});

function saveEmployee() {
    let id = $("#empId").val();
    validEmployee(id).then(function (isValid) {
        console.log(isValid)
        if (!isValid) {
            console.log(isValid);
            var formData = returnAllEmpVal();
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            console.log(formData);
            console.log(accessToken);
            $.ajax({
                url: "http://localhost:8080/helloshoes/api/v1/employee",
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: JSON.stringify(formData),
                contentType: "application/json",
                success: function (res, textStatus, jsXH) {
                    console.log(res);
                    // alert("Customer Added Successfully");
                    swal("Saved", "Employee Added Successfully", "success");
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
            clearEmpInputFields();
        }
    });
}

function getAllEmployees() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    $("#employeeTable").empty();
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/employee/getAll",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            for (var r of res) {
                let row = `<tr>
                    <th scope="row">${r.customerId}</th>
                    <td>${r.customerName}</td>
                    <td>${r.gender}</td>
                    <td>${r.loyaltyDate}</td>
                    <td>${r.level}</td>
                    <td>${r.totalPoints}</td>
                    <td>${r.customerDob}</td>
                    <td>${r.address.buildNo}</td>
                    <td>${r.address.lane}</td>
                    <td>${r.address.city}</td>
                    <td>${r.address.state}</td>
                    <td>${r.address.postalCode}</td>
                    <td>${r.contactNo}</td>
                    <td>${r.email}</td>
                    <td>${r.recentPurchase}</td>
                    </tr>`;
                $("#employeeTable").append(row);
                bindEmpTrrEvents();
            }
        }
    });
}

function validEmployee(id) {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/employee/search/" + id,
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

function searchEmployee(id) {
    console.log(id);
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/employee/search/" + id,
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

$('#empSearch').click(function () {
    let id = $("#empId").val();
    searchEmployee(id).then(function (res) {
        setAllEmpVal(res);
        empCaptureClear();
        $("#empCapturedImage").attr('src', res.proPic);
    });
    setEmpClBtn();
});
