let btnSignIn = $('#btnSignIn');

$(document).ready(function () {
    btnSignIn.click(function (){
        allContainerHide();
        adminPage.css('display','block');
        logInPage.css('display','none');
    });
});