var getUserCity = function(city) {

    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=be07904f882bd167195a95d2de0638d5";
    
        fetch(apiUrl).then(function(response) {
          response.json().then(function(data) {
              console.log(data);
        });
    });
};
  
  getUserCity("youngstown");