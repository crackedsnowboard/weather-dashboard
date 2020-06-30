$(document).ready(function () {

    var citiesList = []




    // "citylistener"

    $("#add-city").on("click", function (event) {
        event.preventDefault();
        var cityRequest = $("#weatherQuery").val();
        citiesList.push(cityRequest)
        // citiesList.remove[0]
        // console.log(cityRequest);
        // console.log(citiesList);
        $("#rememberCities").prepend("<p>" + cityRequest)
        localStorage.setItem("cities", JSON.stringify(citiesList))
        // for (var i=0; i < citiesList.length; i++) {
        // pushed redundant list FIX!
        // $("#rememberCities").prepend("<p>" + citiesList[i])
        // }
        for (var i = 0; i < citiesList.length; i++) {
            $("#rememberCities").text(JSON.parse(localStorage.getItem("cities")));
        }

        var APIkey = "1d03add06e3b9b27f2404028156445b9";
        var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityRequest + "&units=imperial" + "&appid=" + APIkey;
        console.log(queryURLforecast);


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
            console.log(iconCode);
            var iconURL = ("http://openweathermap.org/img/w/" + iconCode + ".png")
            console.log(iconURL);


            $("#wicon").attr("src", iconURL);
            $("#city").text(cityCurrent + " (" + date + ") ");
            // console.log(response.city.name);
            // $("#city").append(icon)
            $("#currentTemp").text("Temp: " + parseInt(response.list[0].main.temp) + "°F")
            // console.log(parseInt(response.list[0].main.temp));

            $("#currentHumidity").text("Hum: " + (response.list[0].main.humidity) + "%")
            // console.log(response.list[0].main.humidity);
            $("#currentWindSpeed").text("Wind Speed: " + response.list[0].wind.speed + " MPH")
            // console.log(response.list[0].wind.speed);


            // day one of five forecast
            // for (var i = 1; i < 5; i++) {
            var msec1 = Date.parse(response.list[8].dt_txt);
            // console.log(msec1);

            var date1 = new Date(msec1);
            var dateformat1 = date1.toLocaleDateString()
            // console.log(date1);
            // console.log(dateformat1);

            var dayOneIconCode = response.list[8].weather[0].icon
            console.log(dayOneIconCode);

            var dayOneIcon = ("http://openweathermap.org/img/w/" + dayOneIconCode + ".png")
            console.log(dayOneIcon);


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
                    $("#currentUV").removeClass("btn-success");
                    $("#currentUV").addClass("btn-warning");
                }
                if (UVrating > 10) {
                    $("#currentUV").removeClass("btn-success");
                    $("#currentUV").addClass("btn-danger");
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


    // Separate AJAX call









});