$(document).ready(function () {
    let header = $('#header');
    let headerSignIn = $('#signIn');
    let headerSignUp = $('#signUp');

    let btnMainLogIn = $('#btn-log');
    let btnSignUpBackToHome = $('#signUpBackToHome');
    let btnSignInBackToHome = $('#logInBackToHome');

    let mainPage = $('#main-view');
    let logInPage = $('#log-in-page');
    let signUpPage = $('#sign-up-page');
    let adminPage = $('#admin-container');
    let customerPage = $('#customer-container');
    let employeePage = $('#employee-container');
    let supplierPage = $('#supplier-container');
    let inventoryPage = $('#inventory-container');
    let paymentPage = $('#payment-container');

    function allContainerHide(){
        logInPage.css('display','none');
        signUpPage.css('display','none');
        adminPage.css('display','none');
        customerPage.css('display','none');
        employeePage.css('display','none');
        supplierPage.css('display','none');
        inventoryPage.css('display','none');
        paymentPage.css('display','none');
    }
    allContainerHide();

    $('#btn-log,#signIn').click(function (){
        allContainerHide();
        logInPage.css('display','block');
        mainPage.css('display','none');
    });
    btnSignInBackToHome.click(function (){
        allContainerHide();
        logInPage.css('display','none');
        mainPage.css('display','block');
    });

    $('#signUp').click(function (){
        allContainerHide();
        signUpPage.css('display','block');
        mainPage.css('display','none');
    });
    $('#order-thead').css({
        'width': '100%',
        'display': 'flex'
    });
    $('#order-thead>th').css({
        'flex': '1',
        'max-width': 'calc(100%/5*1)'
    })
});