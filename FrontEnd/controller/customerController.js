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

function saveCustomer() {

    /*var array = $("#CusForm").serializeArray();
    var data = {};
    array.forEach(function (field) {
        data[field.name] = field.value;
    });*/
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
            alert("Customer Added Successfully");
        },
        error: function (ob, textStatus, error) {
            alert(textStatus + " : Error Customer Not Added")

        }
    });

}
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