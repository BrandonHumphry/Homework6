$(document).ready(function(){
var city = null;
var lat = ' ';
var lon = ' ';
var key = '&appid=ea3229d583947e23c0ad68c4233587d7&units=imperial';


$('#submitWeather').click(function(){
    showWeather(city);
    showForecast();
});

function showWeather(city){
        city = $('#city').val();

        if(city != ' '){
            $('#error').html(' ');

            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + key,
                type: 'GET',
                dataType: 'json', 

                success: function(data){
                    console.log(data);  
                    $('#show').html(show(data));                   
                    $('#city').val(' ');   
                    lon = data.coord.lon;
                    lat = data.coord.lat;
                } 
            });            
        } else {
            $('#error').html('Field cannot be empty');}        
    }

function showForecast(){
    // $("#forecastDiv").attr();    
    $.ajax({
        url: 
        'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + key,
        type: 'GET',
        dataType: 'json',

    success: function(data2){
    console.log(data2);
    // $("#show").html(showForecast(data2));
    }
    });
} 


});


function show(data){
    return "<h2>" + data.name + "</h2>" +
           "<h3><strong>Temp</strong>:"+ Math.floor(data.main.temp) +"</h3>" +
           "<h3><strong>Humidity</strong>:"+ data.main.humidity + "</h3>" +
           "<h3><strong>Wind Speed</strong>:"+ data.wind.speed + "</h3>" +
           "<h3><strong>lon</strong>:"+ data.coord.lon + "</h3>" +
           "<h3><strong>lat</strong>:"+ data.coord.lat + "</h3>" +
           "<img src="+'http://openweathermap.org/img/w/' + data.weather[0].icon + ".png>";
};

