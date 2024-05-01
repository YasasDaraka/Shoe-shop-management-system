$("#btnSignIn").click(function () {
    //showAlert();
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
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            //need check admin or user
            $.ajax({
                url: "http://localhost:8080/helloshoes/api/v1/auth/search/" + value.email,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                dataType: "json",
                success: function (res, textStatus, xhr) {
                    localStorage.setItem('role', res.role);
                    if (res.role === "ADMIN") {
                        userlimitOff();
                        allContainerHide();
                        showAlert("Admin");
                        adminPage.css('display','block');
                        logInPage.css('display','none');
                    } else if(res.role === "USER"){
                        userLimits();
                        allContainerHide();
                        showAlert("User");
                        userPage.css('display','block');
                        logInPage.css('display','none');
                    }
                },
                error: function (ob, textStatus, error) {
                    swal("Error","Error Sign in", "error");
                }
            });

        },
        error: function (ob, textStatus, error) {
            swal("Error", "Error Sign in", "error");
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

