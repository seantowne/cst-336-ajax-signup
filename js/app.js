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

var r;
$("#state").on("change", function(){
    $.ajax({
       method: "GET",
       url: "https://itcdland.csumb.edu/~milara/ajax/countyList.php?",
       dataType: "json",
       data: { "state": $("#state").val() },
       success: function(result, status){
           r = result;
           for ( let i = 0; i < result.length; i ++ ){
               county = result[i].county.split(' ')[0];
               $("#county").append("<option value=''>Select County</option>");
               $("#county").append("<option value='"+county+"'>" + county + "</option>");
           }
       },
    });
});


$("#c")