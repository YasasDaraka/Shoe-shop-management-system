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
let userPage = $('#user-container');
let customerPage = $('#customer-container');
let employeePage = $('#employee-container');
let supplierPage = $('#supplier-container');
let inventoryPage = $('#inventory-container');
let paymentPage = $('#payment-container');
let cardPage = $('#card-container');
let adminEditPage = $('#admin-edit-container');

function allContainerHide(){
    header.css('display','none');
    mainPage.css('display','none');
    logInPage.css('display','none');
    signUpPage.css('display','none');
    adminPage.css('display','none');
    userPage.css('display','none');
    customerPage.css('display','none');
    employeePage.css('display','none');
    supplierPage.css('display','none');
    inventoryPage.css('display','none');
    paymentPage.css('display','none');
    cardPage.css('display','none');
    adminEditPage.css('display','none');
}
$(document).ready(function () {
    purchaseBtnHide(true);
    allContainerHide();
    header.css('display','block');
    mainPage.css('display','block');
    $('#btn-log,#signIn').click(function (){
        allContainerHide();
        header.css('display','block');
        logInPage.css('display','block');
        mainPage.css('display','none');
    });
    $('#signUpBackToHome,#logInBackToHome,#adminLogOut').click(function (){
        allContainerHide();
        header.css('display','block');
        mainPage.css('display','block');
    });

    $('#signUp').click(function (){
        allContainerHide();
        header.css('display','block');
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
function purchaseBtnHide(value){
    $("#txtBalance").prop("disabled", value);
    $("#txtDiscount").prop("disabled", value);
    $("#txtCash").prop("disabled", value);
    $("#btnSubmitOrder").prop("disabled", value);
}