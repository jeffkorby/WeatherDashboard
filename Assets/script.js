var openWeatherApiUrl = "https://api.openweathermap.org";
var weatherAPIKey = "53acd474deefdc618c8086440c163ffc";
var searchHistoryList = [];

var searchHistory = document.querySelector("#history");
var searchInput = document.querySelector("#search-input")
var citySearch = document.querySelector("#city-search")
var currentWeather = document.querySelector("#current-weather")
var futureForecast = document.querySelector("#future-forecast")

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);




