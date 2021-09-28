var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");


function myFunction () {
    var city = document.querySelector("#city").value;
}

// Fetch open weather map API
fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=&appid=be07904f882bd167195a95d2de0638d5"
  )
  // Convert the response to JSON
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
        console.log(response);
        // Use querySelector to get the ID of where the results will be displayed
       // var cityResultEl = document.querySelector('#cityResult');
    
        // Append the result element to the page
      //cityResultEl.appendChild();
    });
  
// clear old content
//cityResultEl.textContent = "";
// need to fix this next line
//repoSearchTerm.textContent = searchTerm;



var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getUserCity(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name.");
    }
    console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);
