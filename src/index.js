import "./reset.css";
import "./style.css";

async function getCityWeatherJSON(city, region = "") {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=88f3717edad9490ca56141650242403&q=${city},${region}&days=1`
  );

  return await response.json();
}

function extractData(jsonOBJ) {
  const todayOBJ = {
    condition: jsonOBJ.current.condition.text,
    conditionURL: jsonOBJ.current.condition.icon.slice(2),
    city: jsonOBJ.location.name,
    region: jsonOBJ.location.region,
    country: jsonOBJ.location.country,
    temp_f: jsonOBJ.current.temp_f,
    feelsLike: jsonOBJ.current.feelslike_f,
    windMPH: jsonOBJ.current.wind_mph,
    humidity: jsonOBJ.current.humidity,
  };

  const tomorrowOBJ = {
    date: jsonOBJ.forecast.forecastday[0].date,
    condition: jsonOBJ.forecast.forecastday[0].day.condition.text,
    conditionURL: jsonOBJ.forecast.forecastday[0].day.condition.icon.slice(2),
    averageTemp: jsonOBJ.forecast.forecastday[0].day.avgtemp_f,
  };

  return [todayOBJ, tomorrowOBJ];
}

(async () => {
  const json = await getCityWeatherJSON("New York");
  const data = extractData(json);
  fillTodayBox(data[0]);
  fillTomorrowBox(data[1]);
  console.log(data);
})();

const form = document.querySelector("form");
const inputField = document.querySelector("input");
const divs = document.querySelectorAll("div");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const [city, region] = inputField.value.split(",");
  const json = await getCityWeatherJSON(city, region);
  const data = extractData(json);
  fillTodayBox(data[0]);
  fillTomorrowBox(data[1]);
  console.log(data);

  form.reset();
});

const label = document.querySelector("label");
inputField.addEventListener("focus", () => {
  label.classList.add("focused");
});

inputField.addEventListener("blur", function () {
  label.classList.remove("focused");
});

function fillTodayBox(data) {
  const box = document.querySelector(".today");
  box.querySelector(".location").textContent = `${data.city}, ${data.country}`;
  box.querySelector(".condition-text").textContent = data.condition;
  box.querySelector(
    ".condition-icon > img"
  ).src = `https://${data.conditionURL}`;
  box.querySelector(".temp-box").textContent = `${data.temp_f}°F`;
  box.querySelector(
    ".feels-like"
  ).textContent = `Feels like: ${data.feelsLike}°F`;
  box.querySelector(
    ".wind-speed"
  ).textContent = `Wind Speed: ${data.windMPH}MPH`;
  box.querySelector(".humidity").textContent = `Humidity: ${data.humidity}g/Kg`;
}
function fillTomorrowBox(data) {
  const box = document.querySelector(".tomorrow");
  //   box.querySelector(".day-of-week").textContent = `${data.date}`;
  box.querySelector(
    ".card-condition-icon > img"
  ).src = `https://${data.conditionURL}`;
  box.querySelector(".card-condition-text").textContent = `${data.condition}`;
  box.querySelector(".forecast-temp").textContent = `${data.averageTemp}°F`;
}
