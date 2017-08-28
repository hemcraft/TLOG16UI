var d = new Date();
var shift = 0;
var id = "";

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
    shift = dayOfTheWeek + 1;
    
    for(i = shift; i < maximumDayMonth + shift; i++){      
        $("#" + "d" + i).text(i-shift+1); 
        $("#" + "x" + i).text("");
        $("#" + "" + i).css("background-color", "white");
        $("#" + "d" + i).css("background-color", "white");
        $("#" + "x" + i).css("background-color", "white");
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
    $(document).on("click", ".center.cell", function () {
        id = "";
        id = $(this).attr("id");
        $('#' + id).css("background-color", "yellow");
        $('#x' + id.substr(1)).css("background-color", "yellow");
        document.getElementById("usr").value = id.substr(1) - shift + 1;
        $('#x' + id.substr(1)).append("Extra hours: ");
    });
});
 $(document).ready(function(){
    $("#btn1div").click(function(event){
        event.preventDefault();
        activate();
    });
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
        data: myJSON,
        success: function(response) {
            alert("succes1");
        },
        error: function (req, status, err) {
            alert("error1");
            alert(status);
            alert(req);
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
    var answer = "r";

    var jsonData = { "year": year, "month": month, "day": Number(day), "requiredHours": 60*Number(hours) };
    var myJSON = JSON.stringify(jsonData);

    $.ajax({
        url: "http://localhost:8080/timelogger/workmonths/updateStatistics",
        type: "POST",
        contentType: "application/json",
        data: myJSON,
        success: function (data) {
            alert("succces2");
        },
        error: function (req, status, err) {
            alert("error2");
            alert(status);
            alert(req);
        }
    });
    //$("#s1").text(answer);  
    $("#s2").text("succes");
    $('#x' + id.substr(1)).append(340);
 }

