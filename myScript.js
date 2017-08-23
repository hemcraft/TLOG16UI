var d = new Date();


function changeDate(value) {
    for(i = 1; i < 43; i++){  
        $("#" + "d" + i).text("");   
    }

    d.setDate(1);
    d.setMonth(d.getMonth() + value);
    var month = parseInt(d.getUTCMonth()) + 1;
    document.getElementById("date").innerHTML = d.getUTCFullYear() + " " + month;
    drawCells(d);
}

function drawCells(date){
    var dayOfTheWeek = d.getDay();
    var dayOfTheMonth = d.getDate();
    var maximumDayMonth = daysInMonth(date);
    var shift = dayOfTheWeek + 1;
    
    for(i = shift; i < maximumDayMonth + shift; i++){      
        $("#" + "d" + i).text(i-shift+1);  
    }
}

function daysInMonth(anyDateInMonth) {
    return new Date(anyDateInMonth.getYear(), 
                    anyDateInMonth.getMonth()+1, 
                    0).getDate();}

$(document).ready(function(){
    changeDate(0);
});

 /*function activate(){
    var jsonData = { "year": 2016, "month": 10, "day": 4, "requiredHours": 8 };
    var myJSON = JSON.stringify(jsonData);

    $.ajax({
        url: "http://localhost:8080/timelogger/workmonths/workdays",
        type: "POST",
        crossDomain: true,
        contentType: "application/json",
        data: myJSON,
        dataType: "json",
        success: function(response) {
            $("#btn1").text("succes");  
        }
    });
 }*/

 function activate(){
    $("#btn1").text("activated"); 
    $.ajax({
        url: 'http://localhost:8080/timelogger/workmonths/deleteall',
        type: 'PUT',
        success: function(response) {
            $("#btn1").text("succes");  
        }
    });
 }