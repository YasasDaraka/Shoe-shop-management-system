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
let userEditPage = $('#user-edit-container');
let adminDashboard = $('#admin-dashboard-container');
let userDashboard = $('#user-dashboard-container');
let orderVerify = $('#confirm-container');

let videoStream;
let empVideoStream;
let itmVideoStream;
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
    userEditPage.css('display','none');
    adminDashboard.css('display','none');
    userDashboard.css('display','none');
    orderVerify.css('display','none');
}
$(window).on('load',function (){
    $("#loader").css('display','none');
    purchaseBtnHide(true);
    allContainerHide();
    header.css('display','block');
    mainPage.css('display','block');
    $('#btn-log,#signIn,#log-in-btn').click(function (){
        allContainerHide();
        header.css('display','block');
        logInPage.css('display','block');
        mainPage.css('display','none');
    });
    $('#signUpBackToHome,#logInBackToHome,#adminLogOut,#userLogOut').click(function (){
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
    setDate();
    setTime();
});
function purchaseBtnHide(value){
    $("#txtBalance").prop("disabled", value);
    $("#txtDiscount").prop("disabled", value);
    $("#txtCash").prop("disabled", value);
   // $("#btnSubmitOrder").prop("disabled", value);
}
function userLimits(){
    $("#cusUpdate").hide();
    $("#cusDelete").hide();

    $("#empSave").hide();
    $("#empUpdate").hide();
    $("#empDelete").hide();

    $("#itmSave").hide();
    $("#itmUpdate").hide();
    $("#itmDelete").hide();

    $("#supSave").hide();
    $("#supUpdate").hide();
    $("#supDelete").hide();

    /*$("#order-update").hide()
    $("#order-delete").hide();*/

    $('#empCaptureButton').hide();
    $('#itmCaptureButton').hide();

    $('#userSave').hide();

}
function userlimitOff(){
    $("#cusUpdate").show();
    $("#cusDelete").show();
    $("#empSave").show();
    $("#empUpdate").show();
    $("#empDelete").show();
    $("#itmSave").show();
    $("#itmUpdate").show();
    $("#itmDelete").show();
    $("#supSave").show();
    $("#supUpdate").show();
    $("#supDelete").show();
    /*$("#order-update").show();
    $("#order-delete").show();*/
    $('#userSave').show();

    $('#empCaptureButton').show();
    $('#itmCaptureButton').show();

}
function showAlert(name) {
    let timerInterval;
    Swal.fire({
        title: "Welcome "+name+" !",
        html: "",
        timer: 3000, //8000
      /*  timerProgressBar: true,*/
        width: 600,
        padding: "3em",
        color: "rgba(233,197,74,0.4)",
        background: "url(assets/images/users.gif) no-repeat",
        backdrop: `
      rgba(233,197,74,0.4)
      url("")
      left top
      no-repeat
    `,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
               // timer.textContent = `${Swal.getTimerLeft()}`;
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
function setDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day = currentDate.getDate().toString().padStart(2, '0');
    let formattedDate = year + '-' + month + '-' + day;
    $('.currDate').text(` : ${formattedDate}`);
}

function setTime() {
    setInterval(function (){
        let currentTime = new Date();
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        let seconds = currentTime.getSeconds();

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        const formattedTime = hours + ":" + minutes + ":" + seconds;
        $('.currTime').text(` : ${formattedTime}`);
    },1000);
}