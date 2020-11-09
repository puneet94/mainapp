$(document).ready(function () {
    $(".yearly").hide();
    //$(".subscriptionOptions").hide();
    $("#monthlyPricing").on("click",function () {
      $(this).addClass('active');   
       $("#yearlyPricing").removeClass('active');
      $(".yearly").hide();
       $(".monthly").show();
    });
    $("#yearlyPricing").on("click",function () {
      $(this).addClass('active');  
      $("#monthlyPricing").removeClass('active');
      $(".monthly").hide();
       $(".yearly").show();
    });
    $("#backButton").on("click",function(){
        $(".subscriptionOptions").hide();
       $(".registrationForm").show();
    })
    $("#userEmailRegister").on("click",function(){
        $(".registrationForm").hide();
       $(".subscriptionOptions").show();
    })
    $(".selectSubsc").on("click",function(){

    });
    function register(){
        $.post( "./userAuth/register", function( data ) {
            console.log( data );
          });
    }
  });
  