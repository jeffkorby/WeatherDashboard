var openWeatherApiUrl = "https://api.openweathermap.org";
var weatherAPIKey = "36853f5425e1423af25312e6af9503a6";
var searchHistoryList = [];

var searchHistory = document.querySelector("#history");
var searchInput = document.querySelector("#searchCity");
var searchBtn = document.querySelector("#search-btn");
var searchForm = document.querySelector("#search-form")
var currentWeather = document.querySelector("#current")
var futureForecast = document.querySelector("#future")

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// view the UV index-- I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
function todaysWeather(searchCity, timezone) {
    console.log(searchCity);
    var date = dayjs().tz(timezone).format("MMM/D/YY");
    var queryAPI = `${openWeatherApiUrl}/data/2.5/weather?q=${searchCity}+&units=imperial&appid=+${weatherAPIKey}`;
    
    

    fetch(queryAPI)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            var city = data.name;
            var weatherIconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            var temp = data.main.temp;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.wind.speed;

            var card = document.createElement("div");
            var cardBody = document.createElement("div");
            var heading = document.createElement("h3");
            var tempEL = document.createElement("p");
            var windSpeedEL = document.createElement("p");
            var humidityEL = document.createElement("p");
            var weatherIconEL = document.createElement("img");
            console.log(data);
            card.setAttribute("class", "card");
            cardBody.setAttribute("class", "card-content");
            heading.setAttribute("class", "card-header-title");

            console.log(city)
            console.log(date)
            heading.textContent = `${city} (${date})`;

            console.log(temp);
            tempEL.setAttribute("class", "card-content");
            tempEL.textContent = `Temp: ${temp} degrees F`;

            console.log(windSpeed)
            windSpeedEL.setAttribute("class", "card-content");
            windSpeedEL.textContent = `Wind: ${windSpeed} MPH`;

            console.log(humidity)
            humidityEL.setAttribute("class", "card-content");
            humidityEL.textContent = `Humidity: ${humidity}%`;

            weatherIcon = data.weather[0].icon;
            weatherIconEL.setAttribute("src", weatherIconUrl);

            cardBody.append(heading, weatherIconEL, tempEL, windSpeedEL, humidityEL);
            card.append(cardBody);

            currentWeather.innerHTML = "";
            currentWeather.append(card);
            
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var forecastAPI = `${openWeatherApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current,alerts&units=imperial&appid=${weatherAPIKey}`;
            fetch(forecastAPI)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                console.log(data);
                var uvIndex = data.daily[0].uvi;
                var uvIndexEL = document.createElement("p");
                var uvIndexBadgeEL = document.createElement("button");

                uvIndexEL.textContent = "UV Index: ";
                uvIndexBadgeEL.classList.add("button", "is-small");

                console.log(uvIndex);
                if (uvIndex < 3) {
                    uvIndexBadgeEL.classList.add("is-success");
                } else if (uvIndex < 7) {
                    uvIndexBadgeEL.classList.add("is-warning");
                } else {
                    uvIndexBadgeEL.classList.add("is-danger");
                }

                uvIndexBadgeEL.textContent = uvIndex;
                uvIndexEL.append(uvIndexBadgeEL);
                cardBody.append(uvIndexEL);

                currentWeather.innerHTML = "";
                currentWeather.append(card);
            });
            
            getFutureForecast(data)

        });
}


function handleSubmit(event) {
   
    if (!searchInput.value) {
        return;
    }
    
    var citySearch = searchInput.value.trim();
    console.log(citySearch);
    todaysWeather(citySearch);
}

searchBtn.addEventListener("click", handleSubmit);




