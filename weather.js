$(document).ready(function(){
var city = null;
var lat = '';
var lon = '';

    $('#submitWeather').click(function(){

        city = $("#city").val();

        if(city != ''){

            $.ajax({

                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + 
                '&appid=ea3229d583947e23c0ad68c4233587d7&units=imperial',
                type: 'GET',
                dataType: 'json',
                
                success: function(data){
                    console.log(data);
                    
                    $("#show").html(show(data));
                    
                    $("#city").val(' ');
    
                    lon = data.coord.lon;
                    lat = data.coord.lat;

                $.ajax({
                    url: 
                    'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=ea3229d583947e23c0ad68c4233587d7',
                    type: 'GET',
                    dataType: 'json',

                    success: function(data){
                    console.log(data);
                    $("#show").html(showForecast(data));
                    }
                });

                }
                
            });
                    

        } else {

            $("#error").html('Field cannot be empty');
        
        }
            

    });

});

function show(data){
    return "<h2>" + data.name + "</h2>" +
           "<h3><strong>Temp</strong>:"+ data.main.temp +"</h3>" +
           "<h3><strong>Humidity</strong>:"+ data.main.humidity + "</h3>" +
           "<h3><strong>Wind Speed</strong>:"+ data.wind.speed + "</h3>";
        //    "<h2>" + data.current.uvi + "</h2>"; 
}

// function showForecast(data){
//     return "<h2>" + data.current.uvi + "</h2>"; 
// }
