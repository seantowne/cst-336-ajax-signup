console.log("hello");

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

$("#state").on("change", function(){
    $.ajax({
       method: "GET",
       url: "https://itcdland.csumb.edu/~milara/ajax/countyList.php?",
       dataType: "json",
       data: { "state": $("#state").val() },
       success: function(result, status){
           alert(result);
       },
       error: function(status, error){
           console.log("could not load resource");
       } 
    });
});