$(document).ready(function() {


    

$("#add-city").on("click", function(event) {
    event.preventDefault();
    var cityRequest = $("#weatherQuery").val();
    console.log(cityRequest);
    
    var APIkey = "1d03add06e3b9b27f2404028156445b9";
    var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityRequest + "&units=imperial" + "&appid=" + APIkey;
    console.log(queryURLforecast);

    $.ajax({
        url:queryURLforecast,
        method: "GET"
    }).then(function(response) {
    console.log(response);

    $("#city").text(response.city.name);    
    console.log(response.city.name);
    $("#currentTemp").text("Temperature: " + response.list[0].main.temp)
    console.log(response.list[0].main.temp);
    $("#currentHumidity").text("Humidity: " + response.list[0].main.humidity)
    console.log(response.list[0].main.humidity);
    $("#currentWindSpeed").text("Wind Spped: " + response.list[0].wind.speed)
    console.log(response.list[0].wind.speed);
    
    // Separate AJAX call
    $("#currentUV")
    
    


    });


})






});