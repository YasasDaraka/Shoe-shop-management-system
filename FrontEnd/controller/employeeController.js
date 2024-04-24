$(document).ready(function () {
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