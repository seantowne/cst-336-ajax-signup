console.log("hello");

$("#zip").on("change", function(){
    $.ajax({
        method: "GET",
        url: "https://itcdland.csumb.edu/~milara/ajax/cityInfoByZip.php",
        dataType: "json",
        data: { "zip" : $("#zip").val()},
        success: function(result, status){
            alert(result);
        }
    });
});