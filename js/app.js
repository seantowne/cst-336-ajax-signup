console.log("hello");

$("#zip").on("change", function(){
    $.ajax({
        method: "GET",
        url: "https://cst336.herokuapp.com/projects/api/cityInfoAPI.php",
        dataType: "json",
        data: { "zip" : $("#zip").val()},
        success: function(result, status){
            alert(result);
        }
    });
});