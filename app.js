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

function setAPI() {
  const cityName = document.querySelector(".city-input").value;
  const countryCode = document.querySelector(".selected").id;
  const link = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&APPID=${API_KEY}&lang=en_us`;
  initializeAPI(link);
}

function changeBackgroundImage(weather) {
  const hours = new Date().getHours();

  if ((hours >= 6) & (hours <= 18)) {
    if (weather === "Rain") {
      document.body.style.backgroundImage = `url('../assets/rainy-day.jpg')`;
    } else if (weather === "Clouds") {
      document.body.style.backgroundImage = `url('../assets/cloudy-day.jpg')`;
    } else {
      document.body.style.backgroundImage = `url('../assets/day.jpg')`;
    }
  } else {
    if (weather === "Rain") {
      document.body.style.backgroundImage = `url('../assets/rainy-night.jpg')`;
    } else if (weather === "Clouds") {
      document.body.style.backgroundImage = `url('../assets/cloudy-night.jpg')`;
    } else {
      document.body.style.backgroundImage = `url('../assets/night.jpg')`;
    }
  }
}

function initializeAPI(link) {
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const name = data.name;
      const temp = parseInt(data.main.temp - 273.15);
      const maxTemp = parseInt(data.main.temp_max - 273.15);
      const minTemp = parseInt(data.main.temp_min - 273.15);
      const description = capitalize(data.weather[0].description);
      const weatherMain = capitalize(data.weather[0].main);
      const weather = [
        name,
        `${temp}°C`,
        `${maxTemp}°C`,
        `${minTemp}°C`,
        weatherMain,
        `${description}`,
      ];

      changeBackgroundImage(weatherMain);

      console.log(weather);
      document.getElementById("city-name").textContent = name;
      document.getElementById("temperature").textContent = `${temp}°C`;
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

changeBackgroundImage();

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
