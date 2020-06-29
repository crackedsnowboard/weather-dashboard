$(document).ready(function() {

var citiesList = []
    

$("#add-city").on("click", function(event) {
    event.preventDefault();
    var cityRequest = $("#weatherQuery").val();
    // citiesList.push(cityRequest)
    // citiesList.remove[0]
    // console.log(cityRequest);
    // console.log(citiesList);
    $("#rememberCities").prepend("<p>" + cityRequest)

    // for (var i=0; i < citiesList.length; i++) {
        // pushed redundant list FIX!
        // $("#rememberCities").prepend("<p>" + citiesList[i])
    // }
    
    
    var APIkey = "1d03add06e3b9b27f2404028156445b9";
    var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityRequest + "&units=imperial" + "&appid=" + APIkey;
    // console.log(queryURLforecast);
    

    $.ajax({
        url:queryURLforecast,
        method: "GET"
    }).then(function(response) {
    console.log(response);
    var cityCurrent = response.city.name
    var msec0 = Date.parse(response.list[0].dt_txt)
    var date0 = new Date(msec0);
    var date = date0.toLocaleDateString();
    var iconCode = response.list[0].weather[0].icon
    console.log(iconCode);
    var iconURL = JSON.stringify("http://openweathermap.org/img/wn/" + iconCode + "@2x.png")
    console.log(iconURL);
    var icon = $("<img>");
    $("#city").append(icon)
    icon.attr("src", iconURL);
    console.log(icon);
    

    $("#city").text(cityCurrent + " (" + date + ") ");    
    // console.log(response.city.name);
    // $("#city").append(icon)
    $("#currentTemp").text("Temperature: " + parseInt(response.list[0].main.temp) + "°F")
    // console.log(parseInt(response.list[0].main.temp));
    
    $("#currentHumidity").text("Humidity: " + (response.list[0].main.humidity) + "%")
    // console.log(response.list[0].main.humidity);
    $("#currentWindSpeed").text("Wind Speed: " + response.list[0].wind.speed + " MPH")
    // console.log(response.list[0].wind.speed);
    
    
    // for (var i = 1; i < 5; i++) {
        var msec1 = Date.parse(response.list[1].dt_txt);
        // console.log(msec1);
        
        var date1 = new Date(msec1);
        var dateformat1 = date1.toLocaleDateString()
        // console.log(date1);
        // console.log(dateformat1);
        
        $("#day1Date").text(dateformat1);
        $("#day1Temp").text("Temperature: " + parseInt(response.list[1].main.temp) + "°F");
        $("#day1Humidity").text("Humidity: " + response.list[1].main.humidity + "%");

        var latitude = response.city.coord.lat
        // console.log(latitude);
        
        var longitude = response.city.coord.lon
        // console.log(longitude);

        var queryURLforUVdata = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey;
        // console.log(queryURLforUVdata);
        
        $.ajax({
            url:queryURLforUVdata,
            method: "GET"
        }).then(function(response) {
        // console.log(response);
        var UVrating = response.current.uvi
        $("#currentUV").text("UV rating: " + UVrating)
        
        if (2 < UVrating < 6) {
            $("#currentUV").removeClass("btn-success");
            $("#currentUV").addClass("btn-warning");
        }
        if (UVrating > 5) {
            $("#currentUV").removeClass("btn-success");
            $("#currentUV").addClass("btn-danger");
        }
        });

        // day 2 forecast
        var msec2 = Date.parse(response.list[8].dt_txt);
        // console.log(msec2);
        
        var date2 = new Date(msec2);
        var dateformat2 = date2.toLocaleDateString()
        // console.log(date2);
        // console.log(dateformat2);

        $("#dayTwoDate").text(dateformat2);
        $('#dayTwoTemp').text("Temperature: " + parseInt(response.list[8].main.temp) + "°F");
        $("#dayTwoHumidity").text("Humidity: " + response.list[8].main.humidity + "%");



    // }
    


    });


})


// Separate AJAX call









});