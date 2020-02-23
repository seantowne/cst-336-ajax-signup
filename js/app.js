console.log("hello");

$("#zip").on("change", function(){
    if ( $("#zip").val() === "" )return;
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