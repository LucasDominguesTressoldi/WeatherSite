# WeatherSite 🌦️

🎯 A website that will show you how the weather is. It was made for me to understand how the APIs work and test my knowledge

❗To access the site's features, follow these steps:

👉🏼 Access the **OpenWeather** website through the link below 👇🏼 and log in (register if necessary):  
🔗 https://home.openweathermap.org/api_keys

👉🏼 After that, create your **API_KEY** and click generate

👉🏼 Then perform a **'git clone'** of this repository and replace the value of **API_KEY**, located into the **app.js** file, inside the **const link** at **setAPI function**, with ***your API key*** (Ex.: **API_KEY** to **12ab34d5c6d'**)  

const link = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&APPID=${12ab34d5c6d}&lang=en_us`;

👉🏼 You're done!🥳

✉️ **Feel free to contact me if you want to**

🔗 Access the website here: https://main--weatherprojectsite.netlify.app/  

### WeatherJson 💻

⁉️ Another project that consumes the **OpenWeather API**, but in this project, the focus is only on the *BackEnd*

🎯 Using PHP, I create a local server and make a request for OpenWeather to return, *in .json file format*, the data for a specific city around the world

🔗 Repository link: https://github.com/LucasDominguesTressoldi/WeatherJson
