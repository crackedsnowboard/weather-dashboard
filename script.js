$(document).ready(function () {

    var citiesList = []
    $("#rememberCities").text(JSON.parse(localStorage.getItem("cities")))
    $("#weatherQuery").val(JSON.parse(localStorage.getItem("cities")));


    // "citylistener"

    $("#add-city").on("click", function (event) {
        event.preventDefault();
        var cityRequest = $("#weatherQuery").val();
        console.log(citiesList.includes(cityRequest));
        

        if (!citiesList.includes(cityRequest)) {
            citiesList.push(cityRequest)
        }

        for (var i = 0; i < citiesList.length; i++) {
            $("#rememberCities").prepend("<li>" + cityRequest)
        }
        
        localStorage.setItem("cities", JSON.stringify(citiesList))
        
        var APIkey = "1d03add06e3b9b27f2404028156445b9";
        var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityRequest + "&units=imperial" + "&appid=" + APIkey;
        
        $.ajax({
            url: queryURLforecast,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var cityCurrent = response.city.name
            var msec0 = Date.parse(response.list[0].dt_txt)
            var date0 = new Date(msec0);
            var date = date0.toLocaleDateString();
            var iconCode = response.list[0].weather[0].icon
            var iconURL = ("http://openweathermap.org/img/w/" + iconCode + ".png")
            
            $("#wicon").attr("src", iconURL);
            $("#city").text(cityCurrent + " (" + date + ") ");
            $("#currentTemp").text("Temp: " + parseInt(response.list[0].main.temp) + "°F")
            $("#currentHumidity").text("Hum: " + (response.list[0].main.humidity) + "%")
            $("#currentWindSpeed").text("Wind Speed: " + response.list[0].wind.speed + " MPH")
            
            // day one of five forecast
            var msec1 = Date.parse(response.list[8].dt_txt);
            var date1 = new Date(msec1);
            var dateformat1 = date1.toLocaleDateString()
            var dayOneIconCode = response.list[8].weather[0].icon
            var dayOneIcon = ("http://openweathermap.org/img/w/" + dayOneIconCode + ".png")

            $("#day1Date").text(dateformat1);
            $("#day1Icon").attr("src", dayOneIcon);
            $("#day1Temp").text("Temp: " + parseInt(response.list[1].main.temp) + "°F");
            $("#day1Humidity").text("Humidity: " + response.list[1].main.humidity + "%");

            // Saving lat and long from current API feed to be able to consume second API to get UV Data
            var latitude = response.city.coord.lat
            var longitude = response.city.coord.lon
          
            var queryURLforUVdata = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey;
    
            $.ajax({
                url: queryURLforUVdata,
                method: "GET"
            }).then(function (response) {
                // console.log(response);
                var UVrating = response.current.uvi
                $("#currentUV").text("UV rating: " + UVrating)

                if (6 < UVrating < 10) {
                    $("#currentUV").removeClass("badge-success");
                    $("#currentUV").addClass("badge-warning");
                }
                if (UVrating > 10) {
                    $("#currentUV").removeClass("btn-success");
                    $("#currentUV").addClass("badge-danger");
                }
            });

            // day 2 forecast
            var msec2 = Date.parse(response.list[16].dt_txt);
            var date2 = new Date(msec2);
            var dateformat2 = date2.toLocaleDateString()
            var dayTwoIconCode = response.list[16].weather[0].icon
            var dayTwoIcon = ("http://openweathermap.org/img/w/" + dayTwoIconCode + ".png")

            $("#dayTwoDate").text(dateformat2);
            $("#dayTwoIcon").attr("src", dayTwoIcon);
            $('#dayTwoTemp').text("Temp: " + parseInt(response.list[16].main.temp) + "°F");
            $("#dayTwoHumidity").text("Humidity: " + response.list[16].main.humidity + "%");

            // Day 3 forecast
            var msec3 = Date.parse(response.list[24].dt_txt);
            var date3 = new Date(msec3);
            var dateformat3 = date3.toLocaleDateString()
            var dayThreeIconCode = response.list[24].weather[0].icon
            var dayThreeIcon = ("http://openweathermap.org/img/w/" + dayThreeIconCode + ".png")

            $("#dayThreeDate").text(dateformat3);
            $("#dayThreeIcon").attr("src", dayThreeIcon);
            $('#dayThreeTemp').text("Temp: " + parseInt(response.list[24].main.temp) + "°F");
            $("#dayThreeHumidity").text("Humidity: " + response.list[24].main.humidity + "%");

            // Day 4 forecast
            var msec4 = Date.parse(response.list[32].dt_txt);
            var date4 = new Date(msec4);
            var dateformat4 = date4.toLocaleDateString()
            var dayFourIconCode = response.list[32].weather[0].icon
            var dayFourIcon = ("http://openweathermap.org/img/w/" + dayFourIconCode + ".png")

            $("#dayFourDate").text(dateformat4);
            $("#dayFourIcon").attr("src", dayFourIcon);
            $('#dayFourTemp').text("Temp: " + parseInt(response.list[32].main.temp) + "°F");
            $("#dayFourHumidity").text("Humidity: " + response.list[32].main.humidity + "%");

            // Day 5 forecast
            var msec5 = Date.parse(response.list[39].dt_txt);
            var date5 = new Date(msec5);
            var dateformat5 = date5.toLocaleDateString()
            var dayFiveIconCode = response.list[39].weather[0].icon
            var dayFiveIcon = ("http://openweathermap.org/img/w/" + dayFiveIconCode + ".png")

            $("#dayFiveDate").text(dateformat5);
            $("#dayFiveIcon").attr("src", dayFiveIcon);
            $('#dayFiveTemp').text("Temp: " + parseInt(response.list[39].main.temp) + "°F");
            $("#dayFiveHumidity").text("Humidity: " + response.list[39].main.humidity + "%");

        });
    })
});