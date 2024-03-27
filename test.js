async function getCityWeatherJSON(city="clifton", region = "nj") {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=88f3717edad9490ca56141650242403&q=${city},${region}`
    );
  
    const json = await response.json();
    console.log(json);
  }

  getCityWeatherJSON();