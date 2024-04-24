$("#signup-page-signup").click(function () {
    signUp();

});

function signUp() {
    let value = {
        email: $("#inputEmail").val(),
        password: $("#reInputPassword").val(),
        role: $('#inputRole').val()
    }
    console.log(val);
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/auth/signup",
        method: "POST",
        data: JSON.stringify(value),
        contentType: "application/json",
        success: function (res, textStatus, jsXH) {
            console.log(res);
            alert("User Added Successfully");

        },
        error: function (ob, textStatus, error) {
            alert(textStatus + " : Error User Not Added")
        }
    });

};