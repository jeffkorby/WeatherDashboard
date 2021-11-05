var openWeatherApiUrl = "https://api.openweathermap.org";
var weatherAPIKey = "36853f5425e1423af25312e6af9503a6";
var searchHistoryList = [];

var searchHistory = document.querySelector("#history");
var searchInput = document.querySelector("#searchCity");
var searchBtn = document.querySelector("#search-btn");
var searchForm = document.querySelector("#search-form")
var currentWeather = document.querySelector("#current-weather")
var futureForecast = document.querySelector("#future-forecast")

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// view the UV index-- I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
function todaysWeather(searchCity, timezone) {
    console.log(searchCity);
    var date = dayjs().tz(timezone).format("M/D/YY");
    var queryAPI = //`${openWeatherApiUrl}/data/2.5/weather?q=${searchCity}+&units=imperial&appid=+${weatherAPIKey}`;
    "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial&appid=" + weatherAPIKey;
    
    

    fetch(queryAPI)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            var city = data.name;
            var weatherIconUrl = `https://wwww.openweathermap.org/img/w/${data.weather[0].icon}.png`;
            weatherIcon = data.weather[0].icon;
            var temp = data.main.temp;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;

            var card = document.createElement("div");
            var cardBody = document.createElement("div");
            var heading = document.createElement("h3");
            var tempEL = document.createElement("p");
            var windSpeedEL = document.createElement("p");
            var humidityEL = document.createElement("p");
            var weatherIconEL = document.createElement("img");
    
            console.log(data);
            card.setAttribute("class", "card is-flex-grow-1");
            cardBody.setAttribute("class", "card-content is-fluid is-full");
            heading.setAttribute("class", "card-header-title");
            
            console.log(city)
            console.log(date)
            heading.textContent = `Weather in ${city} on ${date}`;

            console.log(temp);
            tempEL.setAttribute("class", "card-content");
            tempEL.textContent = `Temp: ${temp} °F`;

            console.log(windSpeed)
            windSpeedEL.setAttribute("class", "card-content");
            windSpeedEL.textContent = `Wind: ${windSpeed} MPH`;

            console.log(humidity)
            humidityEL.setAttribute("class", "card-content");
            humidityEL.textContent = `Humidity: ${humidity}%`;

            weatherIconEL.setAttribute("class", "card-image")
            weatherIconEL.setAttribute("src", weatherIconUrl);

            cardBody.append(heading, weatherIconEL, tempEL, windSpeedEL, humidityEL);
            card.append(cardBody);

            currentWeather.textContent = "";
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


                uvIndexEL.setAttribute("class", "card-content");
                uvIndexEL.textContent = `UV Index: `;
                uvIndexBadgeEL.setAttribute("class", "card-content");
                uvIndexBadgeEL.classList.add("button", "is-small", "is-rounded");

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

    function getFutureForecast(data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var forecastAPI = `${openWeatherApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current,alerts&units=imperial&appid=${weatherAPIKey}`;

       
        
        fetch(forecastAPI)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            var daily = data.daily;
            console.log(data);
            console.log(daily);
            console.log(daily.length);

            
    
            var fiveDayHeading = document.createElement("div");
            var heading = document.createElement("div");
            var col = document.createElement("div");
            var card = document.createElement("div");
            var cardTitle = document.createElement("h4");
            var cardBody = document.createElement("div");
            var tempEL = document.createElement("p");
            var windSpeedEL = document.createElement("p");
            var humidityEL = document.createElement("p");
            var weatherIconEL = document.createElement("img");

            for (let i = 0; i < 5; i++) {
                var weatherIconUrl = `https://openweathermap.org/img/w/${daily[i].weather[0].icon}.png`;
                var weatherIcon = data.daily[i].weather[0].icon;
                var weatherIconDesc = data.daily[i].weather[0].description;
                var temp = data.daily[i].temp.day;
                var humidity = data.daily[i].humidity;
                var windSpeed = data.daily[i].wind_speed;

                fiveDayHeading.setAttribute("class", "is-flex");
                heading.textContent = "5-Day Forecast";
                fiveDayHeading.append(heading);

                col.append(card);
                card.append(cardBody);
                cardBody.append(cardTitle, weatherIconEL, tempEL, windSpeedEL, humidityEL);

                col.setAttribute("class", "col is-one-fifth");
                col.classList.add("forecast-card");
                card.setAttribute("class", "card is-full is-flex is-justify-content-space-between px-2");
                cardTitle.setAttribute("class", "card-header card-header-title")
                cardBody.setAttribute("class", "card-content is-fluid is-full");
                tempEL.setAttribute("class", "card-content");
                windSpeedEL.setAttribute("class", "card-content");
                humidityEL.setAttribute("class", "card-content");

                cardTitle.textContent = dayjs().add(i, "day").format("MMM/D/YY");
               // weatherIcon.setAttribute("src", weatherIconUrl);
               // weatherIcon.setAttribute("alt", weatherIconDesc);
                tempEL.textContent = `Temp: ${temp} °F`;
                windSpeedEL.textContent = `Wind: ${windSpeed} MPH`;
                humidityEL.textContent = `Humidity: ${humidity}%`;

                futureForecast.innerHTML = "";
                futureForecast.append(col);
            }
            futureForecast = "";

        })
    }
}

function handleSubmit(event) {
   
    if (!searchInput.value) {
        return;
    }

    event.preventDefault();
    
    var citySearch = searchInput.value.trim();
    console.log(citySearch);
    
    todaysWeather(citySearch);
}

searchBtn.addEventListener("click", handleSubmit);




