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
    
    $("#s1").text("");
    $("#s2").text("");
    updateMonth();
    
    drawCells(d);
    updateDays();
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
        url: "http://localhost:9090/tlog-backend/timelogger/workmonths/workdaysweekend",
        type: "POST",
        contentType: "application/json",
        data: myJSON,
        dataType: "json",
        async: false,
        success: function(response) {
        },
        statusCode: {
            406: function() {
                if (confirm('Are you sure about working on weekend?')) {
                    $.ajax({
                        url: "http://localhost:9090/tlog-backend/timelogger/workmonths/workdays",
                        type: "POST",
                        contentType: "application/json",
                        data: myJSON,
                        dataType: "json",
                        async: false,
                        success: function(response) {
                        },
                        error: function (req, status, err) {
            
                        }
                    });
                }
            }
        },
        error: function (req, status, err) {           
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
        url: "http://localhost:9090/tlog-backend/timelogger/workmonths/updateStatistics",
        type: "POST",
        contentType: "application/json",
        data: myJSON,
        dataType: "text",
        async: false,
        success: function (response) {
            //alert(response);
            var res = response.split(" ");        
            $("#s1").text(res[0]);
            $("#s2").text(res[1]);
            $('#x' + id.substr(1)).text("Extra minutes: " + res[2]);
            if (res[2] == '-') {
                $('#x' + id.substr(1)).css("background-color", "red");
            } else {
                $('#x' + id.substr(1)).css("background-color", "green");
}
        },
        error: function (req, status, err) {
            alert("error2");
            alert(status);
            alert(req);
        }
    });
 }
 
function updateMonth(){
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = 1;
    var hours = 0;

    var jsonData = { "year": year, "month": month, "day": Number(day), "requiredHours": 60*Number(hours) };
    var myJSON = JSON.stringify(jsonData);
     
     $.ajax({
        url: "http://localhost:9090/tlog-backend/timelogger/workmonths/updateStatistics",
        type: "POST",
        contentType: "application/json",
        data: myJSON,
        dataType: "text",
        async: false,
        success: function (response) {
             res = response.split(" ");        
            $("#s1").text(res[0]);
            $("#s2").text(res[1]);
        },
        error: function (req, status, err) {
            alert("error3");
            alert(status);
            alert(req);
        }
    });
 }
 
 function updateDays(){

    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = 1;
    var hours = 0;

    var jsonData = { "year": year, "month": month, "day": day, "requiredHours": 60*hours };
    var myJSON = JSON.stringify(jsonData);
     
     $.ajax({
        url: "http://localhost:9090/tlog-backend/timelogger/workmonths/updateDays",
        type: "POST",
        contentType: "application/json",
        data: myJSON,
        dataType: "text",
        async: false,
        success: function (response) {
            
            $(document).ready(function(){
                var res = response.split(" ");
            
                for(i = 1; i < 43; i++){  
                    $("#x" + i).text("");   
                }
            
                for(var i = 1; i < res.length; i++){
                    var part1 = res[i].split(':')[0];
                    var part2 = res[i].split(":").pop();
                    if(part2!=""){
                        var index = i + shift - 1;
                        $('#x' + index).text("Extra minutes: " + part2);
                        $('#x' + index).css("background-color", "green");
                    }
                }
            });
        },
        error: function (req, status, err) {
            alert("error4");
            alert(status);
            alert(req);
        }
    });
 }
    
 

