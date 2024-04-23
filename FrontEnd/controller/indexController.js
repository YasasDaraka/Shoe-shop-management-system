$(document).ready(function () {
    let header = $('#header');
    let headerSignIn = $('#signIn');
    let headerSignUp = $('#signUp');

    let btnMainLogIn = $('#btn-log');
    let btnSignUpBackToHome = $('#signUpBackToHome');

    let mainPage = $('#main-view');
    let logPage = $('#log-in-page');
    let signPage = $('#sign-up-page');
    let adminPage = $('#admin-container');
    let customerPage = $('#customer-container');
    let employeePage = $('#employee-container');
    let supplierPage = $('#supplier-container');
    let inventoryPage = $('#inventory-container');
    let paymentPage = $('#payment-container');

    function allContainerHide(){
        logPage.css('display','none');
        signPage.css('display','none');
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
        signPage.css('display','block');
        mainPage.css('display','none');
    });
    btnSignUpBackToHome.click(function (){
        allContainerHide();
        signPage.css('display','none');
        mainPage.css('display','block');
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