$("#btnSignIn").click(function () {
    showAlert();
    signIn();
    /*allContainerHide();
    adminPage.css('display','block');
    logInPage.css('display','none');*/
});
function signIn() {
    let value = {
        email: $("#log-in-Username").val(),
        password: $("#log-in-Password").val(),
    }
    console.log(value);
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/auth/signin",
        method: "POST",
        data: JSON.stringify(value),
        contentType: "application/json",
        success: function (res, textStatus, jsXH) {
            localStorage.setItem('email', value.email);
            localStorage.setItem('password', value.password);
            localStorage.setItem('accessToken', res.token);
            console.log("User SignIn Successfully "+res.token);
            //need check admin or user
            allContainerHide();
            adminPage.css('display','block');
            logInPage.css('display','none');
        },
        error: function (ob, textStatus, error) {
            alert(textStatus + " : Error User Not Added")
        }
    });

};

function isTokenExpired(token) {
    const jwtPayload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = jwtPayload.exp * 1000;
    return Date.now() >= expiryTime;
}
function performAuthenticatedRequest() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || isTokenExpired(accessToken)) {
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/auth/signin",
            method: "POST",
            data: JSON.stringify({
                email: localStorage.getItem('email'),
                password: localStorage.getItem('password'),
            }),
            contentType: "application/json",
            success: function (res, textStatus, jsXH) {
                localStorage.setItem('accessToken', res.token);
                console.log("User SignIn Successfully "+res.token);
            },
            error: function (ob, textStatus, error) {
                console.log("token renew sign in error "+res.token);
            }
        });
    } else {

    }
}

function showAlert() {
    let timerInterval;
    Swal.fire({
        title: "Auto close alert with custom styles!",
        html: "I will close in <b></b> milliseconds.",
        timer: 8000, // Set the timer duration in milliseconds
        timerProgressBar: true, // Display a progress bar indicating the remaining time
        width: 600, // Set the width of the modal
        padding: "3em", // Set the padding of the modal content
        color: "#716add", // Set the text color
        background: "#fff url(/images/trees.png)", // Set the background color or image
        backdrop: `
      rgba(0,0,123,0.4)
      url("/images/nyan-cat.gif")
      left top
      no-repeat
    `,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("closed timer");
        }
    });
}