$(document).ready(function () {
    // setTime();
    // setDate();

    /*$("#customerID").prop('disabled', true);
    $("#customerName").prop('disabled', true);
    $("#customerAddress").prop('disabled', true);
*/

});

$('#supIdAdd').click(function () {
    supFieldSet(false);
    $(this).find("#supId").focus();
    generateSupplierId();
    setSupClBtn();
});

function supFieldSet(state) {
    var ids = ["#supId", "#supCategory", "#supName", "#supBuildNo", "#supLane",
        "#supCity","#supState", "#supPostalCode", "#supCountry", "#supEmail", "#supMobileNo", "#supLandNo"];
    ids.forEach(function (id) {
        $("#" + id).prop('disabled', state);
    });
    $(this).find("#cusId").focus();
    generateSupplierId();
    setSupClBtn();
}

function returnAllSupVal() {
    var formData = {
        supplierCode: $("#supId").val(),
        supplierName: $("#supName").val(),
        category: $("#supCategory").val(),
        address: {
            buildNo: $("#supBuildNo").val(),
            lane: $("#supLane").val(),
            city: $("#supCity").val(),
            state: $("#supState").val(),
            postalCode: $("#supPostalCode").val(),
            country: $("#supCountry").val()
        },
        contact: {
            mobileNo: $("#supMobileNo").val(),
            landNo: $("#supLandNo").val()
        },
        email: $("#supEmail").val()
    };

    return formData;
}
function setAllSupVal(ar) {
    $("#supId").val(ar.supplierCode);
    $("#supName").val(ar.supplierName);
    $("#supCategory").val(ar.category);
    $("#supBuildNo").val(ar.address.buildNo);
    $("#supLane").val(ar.address.lane);
    $("#supCity").val(ar.address.city);
    $("#supState").val(ar.address.state);
    $("#supPostalCode").val(ar.address.postalCode);
    $("#supCountry").val(ar.address.country);
    $("#supEmail").val(ar.email);
    $("#supMobileNo").val(ar.contact.mobileNo);
    $("#supLandNo").val(ar.contact.landNo);
}

getAllSupplier();
$("#supSave").click(function () {

    if (checkAllSup()) {
            saveSupplier();
    } else {
        alert("Error");
        swal("Error", "Error Supplier Save.!", "error");
    }
});

function generateSupplierId() {
    loadSupId().then(function (id) {
        $("#supId").val(id);
    }).catch(function (error) {
        console.error("Error loading Supplier Id:", error);
    });
}

function loadSupId() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        var ar;
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/supplier/getGenId",
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

function loadSupAr() {
    return new Promise(function (resolve, reject) {
        var ar;
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/supplier/getAll",
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


function bindSupTrrEvents() {
    $('#customerTable>tr').click(function () {

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
        setSupBtn();
    });
}

$("#supDelete").click(function () {
    let id = $("#supId").val();

    validSupplier(id).then(function (isValid) {
        if (isValid == false) {
            swal("Error", "No such Supplier..please check the ID", "error");
            clearSupInputFields();
        } else {

            swal("Do you want to delete this Supplier.?", {
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
                        url: "http://localhost:8080/helloshoes/api/v1/supplier?supId=" + id,
                        method: "DELETE",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        success: function (res) {
                            console.log(res);
                            swal("Deleted", "Supplier Delete Successfully", "success");
                            clearSupInputFields();
                            //getAllCustomers();
                        },
                        error: function (ob, textStatus, error) {
                            swal("Error", textStatus + "Error Supplier Not Delete", "error");
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

$("#supUpdate").click(function () {
    let id = $("#supId").val();
    validSupplier(id).then(function (isValid) {
        if (isValid) {
            swal("Do you really want to update this Supplier.?", {
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
                    var data = returnAllSupVal();
                    performAuthenticatedRequest();
                    const accessToken = localStorage.getItem('accessToken');
                    console.log(data)
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/supplier",
                        method: "PUT",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        success: function (res) {
                            console.log(res);
                            //alert("Customer Update Successfully")
                            swal("Updated", "Supplier Update Successfully", "success");;
                            //getAllCustomers();
                        },
                        error: function (ob, textStatus, error) {
                            //alert(textStatus+" : Error Customer Not Update");
                            swal("Error", textStatus + "Error Supplier Not Update", "error");
                        }
                    });
                    /* $("#customerID").prop('disabled', true);
                     $("#customerName").prop('disabled', true);
                     $("#customerAddress").prop('disabled', true);
                     clearCustomerInputFields();*/
                }
            });

        } else {
            swal("Error", "No such Supplier..please check the ID", "error");
            /*alert("No such Customer..please check the ID");*/
        }
    });

});

function saveSupplier() {
    let id = $("#supId").val();
    validSupplier(id).then(function (isValid) {
        console.log(isValid)
        if (!isValid) {
            console.log(isValid);
            var formData = returnAllSupVal();
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            console.log(formData);
            console.log(accessToken);
            $.ajax({
                url: "http://localhost:8080/helloshoes/api/v1/supplier",
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: JSON.stringify(formData),
                contentType: "application/json",
                success: function (res, textStatus, jsXH) {
                    console.log(res);
                    // alert("Customer Added Successfully");
                    swal("Saved", "Supplier Added Successfully", "success");
                    //getAllCustomers();

                },
                error: function (ob, textStatus, error) {
                    //alert(textStatus + " : Error Customer Not Added")
                    swal("Error", textStatus + " : Error Supplier Not Added", "error");
                }
            });


        } else {
            //alert("Customer already exits.!");
            swal("Error", "Supplier already exits.!", "error");
            clearSupInputFields();
        }
    });
}

function getAllSupplier() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    $("#customerTable").empty();
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/supplier/getAll",
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
                $("#customerTable").append(row);
                bindSupTrrEvents();
            }
        }
    });
}

function validSupplier(id) {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/supplier/search/" + id,
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

function searchSupplier(id) {
    console.log(id);
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/supplier/" + id,
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

$('#supSearch').click(function () {
    let id = $("#supId").val();
    searchSup(id).then(function (res) {
        setAllSupVal(res);
    });
    setSupClBtn();
});
