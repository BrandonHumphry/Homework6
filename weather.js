$(document).ready(function(){
var city = null;
var lat = " ";
var lon = " ";
var key  = '&appid=ea3229d583947e23c0ad68c4233587d7&units=imperial'

$('#submitWeather').click(function(){
    showWeather(city);
})

    function showWeather(city){
        city = $("#city").val();
        if(city != ''){
            $("#error").html(' ');
                $.ajax({
                    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + key,
                    type: 'GET',
                    dataType: 'json', 

                    success: function(data){
                        console.log(data);  

                        $("#show").html(show(data));                   
                        $("#city").val(" ");   
                        lon = data.coord.lon;
                        lat = data.coord.lat;
                        
                        $.ajax({
                            url: 
                            'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + key,
                            type: 'GET',
                            dataType: 'json',

                            success: function(data2){
                            console.log(data2);
                           

                            for (var i=0; i<5; i++){
                                let card = $("<div>").addClass("card")
                                let body = $("<div>").addClass("card-body")
                                let title = $("<h1>").addClass("card-title").text(Math.floor(data2.daily[i].temp.day))
                                let humidity = $("<p>").addClass(data2.daily[i].humidity)

                                // card.append(title, humidity)
                                $("#forecast").append(title, humidity)
                                
                                }

                            }
                        });
                    } 
                });            
        } else {
            $("#error").html('Field cannot be empty');}        
}});

function show(data){
    return "<h2>" + "Current Weather:" + data.name + "</h2>" +
           "<h3><strong>Temp</strong>:"+ Math.floor(data.main.temp) + "</h3>" +
           "<h3><strong>Humidity</strong>:"+ data.main.humidity + "</h3>" +
           "<h3><strong>Wind Speed</strong>:"+ data.wind.speed + "</h3>" +
           "<img src="+'https://openweathermap.org/img/w/' + data.weather[0].icon + ".png>";
}


