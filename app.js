const countryCode = "br";
const cityName = "mogi guacu";
const API_KEY = "🤫secret🤫";
const link = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&APPID=${API_KEY}&lang=pt_br`;

// ADICONAR Celsius e Fahrenheit

fetch(link)
  .then((response) => response.json())
  .then((data) => {
    const name = data.name;
    const temp = parseInt(data.main.temp - 273.15);
    const description = capitalize(data.weather[0].description);
    const weather = [name, `${temp}°C`, `${description}`];

    // Update the h1 and h2 elements
    document.getElementById("city-name").textContent = name;
    document.getElementById("temperature").textContent = `${temp}°C`;
    document.getElementById("main").style.backgroundColor = "lightblue";
    /* console.log(data);
    console.log("\n==========================\n");
    console.log(weather); */
  })
  .catch((error) => {
    if (error instanceof fetch.HttpResponseError) {
      console.log(`HTTP error occurred: ${error.message}`);
    } else {
      console.log(`Other error occurred: ${error.message}`);
    }
  });

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
