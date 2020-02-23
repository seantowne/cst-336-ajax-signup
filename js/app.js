console.log("hello");

$.ajax({
    method: "GET",
    url: "https://itcdland.csumb.edu/~milara/ajax/states.php/",
    dataType: "json",
    success: function(result, status){
        $("#state").append("<option value=''>Select State</option>")
        for ( let i = 0; i < result.length; i ++ ){
            $("#state").append("<option value='"+result[i].usps+"'>"+result[i].state+"</option>");
        }
    }
})
$("#zip").on("change", function(){
    if ( $("#zip").val() === "" ){
        $("#city").html("");
        $("#latitude").html("");
        $("#longitude").html("");
        return;
    }
    $.ajax({
        method: "GET",
        url: "https://itcdland.csumb.edu/~milara/ajax/cityInfoByZip.php",
        dataType: "json",
        data: { "zip" : $("#zip").val()},
        success: function(result, status){
            $("#city").html(result.city);
            $("#latitude").html(result.latitude);
            $("#longitude").html(result.longitude);
        }
    });
});

var r;
$("#state").on("change", function(){
    $.ajax({
       method: "GET",
       url: "https://itcdland.csumb.edu/~milara/ajax/countyList.php?",
       dataType: "json",
       data: { "state": $("#state").val() },
       success: function(result, status){
           $("#county").append("<option value=''>Select County</option>");
           for ( let i = 0; i < result.length; i ++ ){
               var county = result[i].county.split(' ')[0];
               $("#county").append("<option value='"+county+"'>" + county + "</option>");
           }
       },
    });
});

var usernameAvailable;
$("#username").on("change", function(){
    $.ajax({
        method: "GET",
        url: "https://cst336.herokuapp.com/projects/api/usernamesAPI.php?",
        dataType: "json",
        data: { "username" : $("#username").val() },
        success: function(result, status){
            var availability = (result.available ? ' Available':' Unavailable');
            var color = (result.available ? 'green':'red');
            usernameAvailable = result.available;
            $("#usernameAvailability").html(availability);
            $("#usernameAvailability").addClass("text-danger");
        }
    });
});

$("#signupForm").on("submit", function(event){
    if ( !formIsValid() ){
        event.preventDefault();
    }
});

function formIsValid(){
    var valid = true;
    $("#username").change();
    if ( !usernameAvailable ) {
        valid = false;
    }
    
    if ( $("#username").val().length == 0 ){
        $("#usernameAvailability").html("Username is required");
        $("#usernameAvailability").css("color", "red");
        valid = false;
    }
    
    if ( $("#password").val().length == 0 ){
        $("#passwordFeedback").html("Password is required");
        $("#passwordFeedback").css("color", "red");
        valid = false;
    }
    
    if ( $("#password").val().length < 6 ){
        $("#passwordFeedback").html("Password is not strong enough");
        $("#passwordFeedback").css("color", "red");
        valid = false;
    }
    else{
         $("#passwordFeedback").html("");
    }
    
    if ( $("#confirmPassword").val().length == 0 ){
        $("#passwordConfirmFeedback").html("Password confirmation is required");
        $("#passwordConfirmFeedback").css("color", "red");
        valid = false;
    }
    
     if ( $("#confirmPassword").val() !== $("#password").val() ){
        $("#passwordConfirmFeedback").html("Passwords do not match");
        $("#passwordConfirmFeedback").css("color", "red");
        valid = false;
    }
    else{
        $("#passwordConfirmFeedback").html("");
    }
    return valid;
}