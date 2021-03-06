
var searchButton = $(".searchButton");

// local storage count
var keyCount = "";
// Click event for search button 
searchButton.click(function () {
    var searchInput = $(".searchInput").val();
    // current weather
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=be07904f882bd167195a95d2de0638d5&units=imperial";
    // 5 day forecast 
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=be07904f882bd167195a95d2de0638d5&units=imperial";

    if (searchInput == "") {
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {           
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            // Local storage
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;
            // Current Weather 
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            currentCard.append(currentName);
            // Adjust Date 
            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            // Add Temp 
            var currentTemp = currentName.append("<p>");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
             // Add Wind Speed: 
             currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
            // Add Humidity
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");

            // Get UV Index fron other API
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;
            // Add UV Index
            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {
                var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
            });
        });

        // 5-day forecast 
        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function (response) {
            // Array for 5-days 
            var day = [0, 8, 16, 24, 32];
            var fiveDayCard = $(".fiveDayCard").addClass("card-body");
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();
            // For each for 5 days
            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");
                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "</p>" + "Wind Speed: " + response.list[i].wind.speed + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" +"</div>");
            })
        });
    }
});