function signIn() {
    let value = {
        email: $("#inputEmail").val(),
        password: $("#reInputPassword").val(),
    }
    console.log(val);
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/auth/signin",
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