const API_KEY = "🤫secret🤫";
const searchButton = document.querySelector(".search");
const countryButtons = document.querySelectorAll(".select-country button");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function selectCountry(element) {
  const country = document.querySelector(`.${element}`);
  country.classList.add("selected");
}

function createWeatherIcon(time, weather) {
  const celsiusTempDiv = document.querySelector(".celsius-temp");
  const img = document.createElement("img");

  const imgToRemove = document.querySelector(".weather-icon");
  if (imgToRemove) {
    imgToRemove.remove();
  }

  if (time === "day") {
    if (weather === "rainy") {
      img.src = "assets/rain.png";
      img.alt = "An icon with a rainy cloud";
    } else if (weather === "cloudy") {
      img.src = "assets/cloudy-day-icon.png";
      img.alt = "An icon of a cloud and the sun behind";
    } else {
      img.src = "assets/sun-icon.png";
      img.alt = "A sun icon";
    }
  } else {
    if (weather === "rainy") {
      img.src = "assets/rain.png";
      img.alt = "An icon with a rainy cloud";
    } else if (weather === "cloudy") {
      img.src = "assets/cloudy-night-icon.png";
      img.alt = "An icon with a cloud and the moon behind";
    } else {
      img.src = "assets/moon-icon.png";
      img.alt = "A moon icon";
    }
  }
  img.classList.add("weather-icon");
  celsiusTempDiv.appendChild(img);
}

function setAPI() {
  const cityName = document.querySelector(".city-input").value;
  const countryCode = document.querySelector(".selected").id;
  const link = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&APPID=${API_KEY}&lang=en_us`;
  initializeAPI(link);
}

function changeBgAndIcon(weather) {
  const hours = new Date().getHours();
  document.body.style.backgroundColor = "none";

  if ((hours >= 6) & (hours <= 18)) {
    if (weather === "Rain") {
      document.body.style.backgroundImage = `url('../assets/rainy-day.jpg')`;
      createWeatherIcon("day", "rainy");
    } else if ((weather === "Clouds") | (weather === "Mist")) {
      document.body.style.backgroundImage = `url('../assets/cloudy-day.jpg')`;
      createWeatherIcon("day", "cloudy");
    } else {
      document.body.style.backgroundImage = `url('../assets/day.jpg')`;
      createWeatherIcon("day", "clean");
    }
  } else {
    if (weather === "Rain") {
      document.body.style.backgroundImage = `url('../assets/rainy-night.jpg')`;
      createWeatherIcon("night", "rainy");
    } else if ((weather === "Clouds") | (weather === "Mist")) {
      document.body.style.backgroundImage = `url('../assets/cloudy-night.jpg')`;
      createWeatherIcon("night", "cloudy");
    } else {
      document.body.style.backgroundImage = `url('../assets/night.jpg')`;
      createWeatherIcon("night", "clean");
    }
  }
}

function getAPIData(data) {
  const nameCity = data.name;
  const temp = parseInt(data.main.temp - 273.15); //°F -459.67
  const maxTemp = parseInt(data.main.temp_max - 273.15); //°F -459.67
  const minTemp = parseInt(data.main.temp_min - 273.15); //°F -459.67
  const description = capitalize(data.weather[0].description);
  const weatherMain = capitalize(data.weather[0].main);
  // const weather = [nameCity, `${temp}°C`, `${maxTemp}°C`, ${minTemp}°C`, weatherMain, description,];
  // console.log(weather);
  document.getElementById("temperature").textContent = temp;
  document.getElementById("city-name").textContent = nameCity;

  changeBgAndIcon(weatherMain);
}

function initializeAPI(link) {
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      getAPIData(data);
    })
    .catch((error) => {
      alert(`ERROR: Check if city name is spelled correctly.`);
      if (error instanceof fetch.HttpResponseError) {
        console.log(`HTTP error occurred: ${error.message}`);
      } else {
        console.log(`Other error occurred: ${error.message}`);
      }
    });
}

// changeBgAndIcon();

countryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCountry = document.querySelector(".selected");
    selectedCountry.classList.remove("selected");
    selectCountry(button.classList.value);
  });
});

searchButton.addEventListener("click", setAPI);
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    setAPI();
  }
});
