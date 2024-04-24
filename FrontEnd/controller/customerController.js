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
    $("#capturedImage").show();
    $('#captureButton').css("background-color", "#007bff");
    $('#captureButton').css("border-color", "#007bff");
    $('#captureButton').text("Capture");
    $("#capturedImage").attr('src', "assets/images/defaultCusPic.gif");
}
$('#cusAdd').click(function () {
    cusFieldSet(true);
    $(this).find("#cusId").focus();
    /*generateCustomerId();
    setClBtn();*/
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
}
