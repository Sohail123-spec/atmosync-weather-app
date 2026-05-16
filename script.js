/* =========================
   API KEY
========================= */

const API_KEY =
"522b4028318547dd9b165236261605";

/* =========================
   ELEMENTS
========================= */

const cityInput =
document.getElementById(
  "cityInput"
);

const searchBtn =
document.getElementById(
  "searchBtn"
);

const locationBtn =
document.getElementById(
  "locationBtn"
);

const temp =
document.getElementById(
  "temp"
);

const condition =
document.getElementById(
  "condition"
);

const city =
document.getElementById(
  "city"
);

const date =
document.getElementById(
  "date"
);

const feelsLike =
document.getElementById(
  "feelsLike"
);

const humidity =
document.getElementById(
  "humidity"
);

const wind =
document.getElementById(
  "wind"
);

const pressure =
document.getElementById(
  "pressure"
);

const aqi =
document.getElementById(
  "aqi"
);

const uv =
document.getElementById(
  "uv"
);

const sunrise =
document.getElementById(
  "sunrise"
);

const sunset =
document.getElementById(
  "sunset"
);

const hourlyForecast =
document.getElementById(
  "hourlyForecast"
);

const dailyForecast =
document.getElementById(
  "dailyForecast"
);

const loading =
document.getElementById(
  "loading"
);

const error =
document.getElementById(
  "error"
);

const weatherEffects =
document.getElementById(
  "weatherEffects"
);

const weatherVisual =
document.getElementById(
  "weatherVisual"
);
/* =========================
   CHART
========================= */

let weatherChart;

/* =========================
   FETCH WEATHER
========================= */

async function getWeather(cityName){

  try{

    loading.style.display =
    "flex";

    error.style.display =
    "none";

    const response =
    await fetch(

      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=3&aqi=yes&alerts=yes`

    );

    if(!response.ok){

      throw new Error(
        "City not found"
      );

    }

    const data =
    await response.json();

    updateUI(data);

  }

  catch(err){

    error.style.display =
    "block";

  }

  finally{

    loading.style.display =
    "none";

  }

}

/* =========================
   UPDATE UI
========================= */

function updateUI(data){

  /* MAIN WEATHER */

  temp.textContent =
  `${Math.round(
    data.current.temp_c
  )}°C`;

  condition.textContent =
  data.current.condition.text;

  city.textContent =
  `${data.location.name},
  ${data.location.country}`;

  date.textContent =
  data.location.localtime;

  /* DETAILS */

  feelsLike.textContent =
  `${Math.round(
    data.current.feelslike_c
  )}°C`;

  humidity.textContent =
  `${data.current.humidity}%`;

  wind.textContent =
  `${data.current.wind_kph} km/h`;

  pressure.textContent =
  `${data.current.pressure_mb} mb`;

  /* AQI */

  aqi.textContent =
  Math.round(
    data.current.air_quality.pm2_5
  );

  /* UV */

  uv.textContent =
  data.current.uv;

  /* SUN */

  sunrise.textContent =
  data.forecast.forecastday[0]
  .astro.sunrise;

  sunset.textContent =
  data.forecast.forecastday[0]
  .astro.sunset;

  /* ICON */

  updateWeatherVisual(data);

  /* RENDER */

  renderHourlyForecast(data);

  renderDailyForecast(data);

  createWeatherChart(data);

  applyWeatherTheme(data);

}

/* =========================
   HOURLY FORECAST
========================= */

function renderHourlyForecast(data){

  hourlyForecast.innerHTML = "";

  const hours =
  data.forecast.forecastday[0]
  .hour;

  hours.forEach(hour => {

    const card =
    document.createElement(
      "div"
    );

    card.classList.add(
      "hour-card"
    );

    card.innerHTML = `

      <h3>
        ${hour.time.split(" ")[1]}
      </h3>

      <img
        src="https:${hour.condition.icon}"
      >

      <h2>
        ${Math.round(hour.temp_c)}°C
      </h2>

      <p>
        ${hour.condition.text}
      </p>

    `;

    hourlyForecast.appendChild(
      card
    );

  });

}

/* =========================
   DAILY FORECAST
========================= */

function renderDailyForecast(data){

  dailyForecast.innerHTML = "";

  data.forecast.forecastday.forEach(
    day => {

      const card =
      document.createElement(
        "div"
      );

      card.classList.add(
        "day-card"
      );

      card.innerHTML = `

        <h3>
          ${day.date}
        </h3>

        <img
          src="https:${day.day.condition.icon}"
        >

        <h2>
          ${Math.round(
            day.day.avgtemp_c
          )}°C
        </h2>

        <p>
          ${day.day.condition.text}
        </p>

      `;

      dailyForecast.appendChild(
        card
      );

    }
  );

}

/* =========================
   WEATHER CHART
========================= */

function createWeatherChart(data){

  const ctx =
  document.getElementById(
    "weatherChart"
  );

  const hours =
  data.forecast.forecastday[0]
  .hour;

  const labels =
  hours.map(hour =>
    hour.time.split(" ")[1]
  );

  const temps =
  hours.map(hour =>
    hour.temp_c
  );

  if(weatherChart){

    weatherChart.destroy();

  }

  weatherChart =
  new Chart(ctx, {

    type:"line",

    data:{

      labels,

      datasets:[{

        label:
        "Temperature",

        data:temps,

        borderColor:"#38bdf8",

        backgroundColor:
        "rgba(56,189,248,0.2)",

        fill:true,

        tension:0.4,

        pointBackgroundColor:
        "#38bdf8",

        pointRadius:4

      }]

    },

    options:{

      responsive:true,

      plugins:{

        legend:{

          labels:{

            color:"white"

          }

        }

      },

      scales:{

        x:{

          ticks:{

            color:"white"

          }

        },

        y:{

          ticks:{

            color:"white"

          }

        }

      }

    }

  });

}

/* =========================
   WEATHER THEMES
========================= */

function applyWeatherTheme(data){

  clearWeatherEffects();

  const condition =
  data.current.condition.text
  .toLowerCase();

  const isDay =
  data.current.is_day;

  /* NIGHT */

  if(!isDay){

    document.body.style.background =
    "linear-gradient(135deg,#020617,#0f172a,#1e293b)";

    createNightSky();

  }

  /* SNOW */

  if(
    condition.includes("snow")
    ||
    condition.includes("blizzard")
  ){

    document.body.style.background =
    "linear-gradient(135deg,#94a3b8,#cbd5e1,#64748b)";

    createSnowEffect();

  }

  /* RAIN */

  else if(
    condition.includes("rain")
    ||
    condition.includes("drizzle")
  ){

    document.body.style.background =
    "linear-gradient(135deg,#0f172a,#1e3a8a,#1e293b)";

    createRainEffect();

  }

  /* THUNDER */

  else if(
    condition.includes("thunder")
    ||
    condition.includes("storm")
  ){

    document.body.style.background =
    "linear-gradient(135deg,#020617,#111827,#1e293b)";

    createRainEffect();

    createLightningEffect();

  }

  /* CLOUDS */

  else if(
    condition.includes("cloud")
    ||
    condition.includes("overcast")
  ){

    document.body.style.background =
    "linear-gradient(135deg,#334155,#475569,#1e293b)";

    createCloudEffect();

  }

  /* FOG */

  else if(
    condition.includes("mist")
    ||
    condition.includes("fog")
  ){

    document.body.style.background =
    "linear-gradient(135deg,#475569,#64748b,#334155)";

    createFogEffect();

  }

  /* WIND */

  else if(
    condition.includes("wind")
  ){

    document.body.style.background =
    "linear-gradient(135deg,#0f172a,#334155,#1e293b)";

    createWindEffect();

  }

  /* SUNNY */

  else{

    document.body.style.background =
    "linear-gradient(135deg,#f59e0b,#f97316,#fb7185)";

    createSunnyEffect();

  }

}
/* =========================
   RAIN EFFECT
========================= */

function createRainEffect(){

  for(let i = 0; i < 120; i++){

    const drop =
    document.createElement(
      "div"
    );

    drop.classList.add(
      "rain-drop"
    );

    drop.style.left =
    Math.random() * 100
    + "vw";

    drop.style.animationDuration =
    Math.random() * 1
    + 0.5 + "s";

    drop.style.opacity =
    Math.random();

    weatherEffects.appendChild(
      drop
    );

  }

}

/* =========================
   CLEAR EFFECTS
========================= */

function clearWeatherEffects(){

  weatherEffects.innerHTML = "";

}

/* =========================
   SEARCH
========================= */

searchBtn.addEventListener(
  "click",
  () => {

    const cityName =
    cityInput.value.trim();

    if(cityName){

      getWeather(cityName);

    }

  }
);

/* =========================
   ENTER KEY
========================= */

cityInput.addEventListener(
  "keypress",
  e => {

    if(e.key === "Enter"){

      searchBtn.click();

    }

  }
);

/* =========================
   CURRENT LOCATION
========================= */

locationBtn.addEventListener(
  "click",
  () => {

    navigator.geolocation
    .getCurrentPosition(

      position => {

        const lat =
        position.coords.latitude;

        const lon =
        position.coords.longitude;

        getWeather(
          `${lat},${lon}`
        );

      }

    );

  }
);

/* =========================
   DEFAULT CITY
========================= */

getWeather("Hyderabad");
/* =========================
   CLOUD EFFECT
========================= */

function createCloudEffect(){

  for(let i = 0; i < 8; i++){

    const cloud =
    document.createElement(
      "div"
    );

    cloud.classList.add(
      "cloud"
    );

    cloud.style.top =
    Math.random() * 60
    + "vh";

    cloud.style.animationDuration =
    20 + Math.random() * 20
    + "s";

    cloud.style.opacity =
    0.2 + Math.random() * 0.5;

    weatherEffects.appendChild(
      cloud
    );

  }

}

/* =========================
   SUNNY EFFECT
========================= */



/* =========================
   LIGHTNING EFFECT
========================= */

function createLightningEffect(){

  const lightning =
  document.createElement(
    "div"
  );

  lightning.classList.add(
    "lightning"
  );

  weatherEffects.appendChild(
    lightning
  );

}

/* =========================
   SEARCH AUTOCOMPLETE
========================= */

const suggestions =
document.getElementById(
  "suggestions"
);

cityInput.addEventListener(
  "input",
  async () => {

    const query =
    cityInput.value.trim();

    if(query.length < 2){

      suggestions.innerHTML = "";

      return;

    }

    const response =
    await fetch(

      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`

    );

    const data =
    await response.json();

    suggestions.innerHTML = "";

    data.forEach(city => {

      const div =
      document.createElement(
        "div"
      );

      div.classList.add(
        "suggestion-item"
      );

      div.textContent =
      `${city.name},
      ${city.country}`;

      div.addEventListener(
        "click",
        () => {

          cityInput.value =
          city.name;

          suggestions.innerHTML =
          "";

          getWeather(city.name);

        }
      );

      suggestions.appendChild(div);

    });

  }
);
/* ===================================
   NIGHT SKY
=================================== */

function createNightSky(){

  const moon =
  document.createElement(
    "div"
  );

  moon.classList.add(
    "moon"
  );

  weatherEffects.appendChild(
    moon
  );

  for(let i = 0; i < 120; i++){

    const star =
    document.createElement(
      "div"
    );

    star.classList.add(
      "star"
    );

    star.style.left =
    Math.random() * 100
    + "vw";

    star.style.top =
    Math.random() * 100
    + "vh";

    star.style.animationDuration =
    1 + Math.random() * 3
    + "s";

    weatherEffects.appendChild(
      star
    );

  }

}

/* ===================================
   SNOW EFFECT
=================================== */

function createSnowEffect(){

  for(let i = 0; i < 120; i++){

    const snow =
    document.createElement(
      "div"
    );

    snow.classList.add(
      "snowflake"
    );

    snow.innerHTML = "❄";

    snow.style.left =
    Math.random() * 100
    + "vw";

    snow.style.animationDuration =
    4 + Math.random() * 6
    + "s";

    snow.style.opacity =
    Math.random();

    snow.style.fontSize =
    0.5 + Math.random() * 1.5
    + "rem";

    weatherEffects.appendChild(
      snow
    );

  }

}

/* ===================================
   FOG EFFECT
=================================== */

function createFogEffect(){

  for(let i = 0; i < 5; i++){

    const fog =
    document.createElement(
      "div"
    );

    fog.classList.add(
      "fog-layer"
    );

    fog.style.top =
    i * 120 + "px";

    fog.style.animationDuration =
    20 + Math.random() * 20
    + "s";

    weatherEffects.appendChild(
      fog
    );

  }

}

/* ===================================
   WIND EFFECT
=================================== */

function createWindEffect(){

  for(let i = 0; i < 40; i++){

    const wind =
    document.createElement(
      "div"
    );

    wind.classList.add(
      "wind-particle"
    );

    wind.style.top =
    Math.random() * 100
    + "vh";

    wind.style.animationDuration =
    2 + Math.random() * 4
    + "s";

    weatherEffects.appendChild(
      wind
    );

  }

}

/* ===================================
   SUNNY EFFECT
=================================== */

function createSunnyEffect(){

  const sun =
  document.createElement(
    "div"
  );

  sun.classList.add(
    "sun-rays"
  );

  weatherEffects.appendChild(
    sun
  );

}
/* ===================================
   PREMIUM WEATHER VISUAL
=================================== */

function updateWeatherVisual(data){

  const condition =
  data.current.condition.text
  .toLowerCase();

  const isDay =
  data.current.is_day;

  weatherVisual.className = "";

  /* NIGHT */

  if(!isDay){

    weatherVisual.innerHTML =
    "🌙";

    weatherVisual.classList.add(
      "night-weather"
    );

    return;

  }

  /* SUNNY */

  if(
    condition.includes("sun")
    ||
    condition.includes("clear")
  ){

    weatherVisual.innerHTML =
    "☀️";

    weatherVisual.classList.add(
      "sun-weather"
    );

    createSunnyParticles();

  }

  /* CLOUDY */

  else if(
    condition.includes("cloud")
    ||
    condition.includes("overcast")
  ){

    weatherVisual.innerHTML =
    "☁️";

    weatherVisual.classList.add(
      "cloud-weather"
    );

  }

  /* RAIN */

  else if(
    condition.includes("rain")
    ||
    condition.includes("drizzle")
  ){

    weatherVisual.innerHTML =
    "🌧️";

    weatherVisual.classList.add(
      "rain-weather"
    );

  }

  /* SNOW */

  else if(
    condition.includes("snow")
  ){

    weatherVisual.innerHTML =
    "❄️";

    weatherVisual.classList.add(
      "snow-weather"
    );

  }

  /* MIST */

  else if(
    condition.includes("mist")
    ||
    condition.includes("fog")
  ){

    weatherVisual.innerHTML =
    "🌫️";

    weatherVisual.classList.add(
      "mist-weather"
    );

  }

}

/* ===================================
   SUNNY PARTICLES
=================================== */

function createSunnyParticles(){

  for(let i = 0; i < 40; i++){

    const particle =
    document.createElement(
      "div"
    );

    particle.classList.add(
      "sun-particle"
    );

    particle.style.left =
    Math.random() * 100
    + "vw";

    particle.style.animationDuration =
    6 + Math.random() * 6
    + "s";

    particle.style.opacity =
    Math.random();

    weatherEffects.appendChild(
      particle
    );

  }

}