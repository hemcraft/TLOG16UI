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

$(document).ready(function(){
    $("#" + 4).click(function() {
        $("#" + 4).text("fut");
    });


    for(i = 1; i < 43; i++){ 
        $("#" + i).click(function() {
            $("#" + i).css("background-color", "yellow");
            document.getElementById("usr").value = i;
            $("#x" + i).text("Extra hours: ");
        });
    }
});

 function activate(){
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = $('#usr').val();
    var hours = $('#usr2').val();

    var jsonData = { "year": year, "month": month, "day": Number(day), "requiredHours": 60*Number(hours) };
    var myJSON = JSON.stringify(jsonData);

    $.ajax({
        url: "http://localhost:8080/timelogger/workmonths/workdays",
        type: "POST",
        contentType: "application/json",
        crossDomain: true,
        data: myJSON,
        dataType: "json",
        success: function(response) {
            $("#btn1").text("succes");  
        }
    });
    
    updateStats();
 }

 function endHours(index){
    $("#" + i).text("Extra hours: ");
 }

 function updateStats(){
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = $('#usr').val();
    var hours = $('#usr2').val();

    var jsonData = { "year": year, "month": month, "day": Number(day), "requiredHours": 60*Number(hours) };
    var myJSON = JSON.stringify(jsonData);

    $.ajax({
        url: "http://localhost:8080/timelogger/workmonths/updateStatistics",
        type: "POST",
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        data: myJSON,
        success: function(response) {
            $("#s1").text("succes");  
            $("#s2").text("succes");
        }
    });
 }

