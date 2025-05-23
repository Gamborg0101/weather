require("./style.css");

const API_KEY =
  "WFGRQQUH947TD839JRKPSHXNB"; /* THIS DATA SHOULD BE HIDDEN - but since it's a public API, it does not really matter*/
const location = "aarhus";

/* Get input from user */
async function getInfo() {
  const userCityInput = document.getElementById("city-search");
  const submitButton = document.getElementById("get-weather-btn");

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let userInput = userCityInput.value;
    getData(userInput);
  });
}

getInfo();

/* Call API with userinput */
async function getData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;
  try {
    const reponse = await fetch(url);
    const dataJSON = await reponse.json();

    const weatherTempToday = dataJSON.currentConditions.temp;
    const weatherTempTomorrow = dataJSON.days[1].temp;
    const todayRise = dataJSON.currentConditions.sunrise;
    const todaySunset = dataJSON.currentConditions.sunset;

    displayForUser(
      weatherTempToday,
      weatherTempTomorrow,
      todayRise,
      todaySunset
    );
  } catch (error) {
    console.error(error);
  }
}

function convertToCelcius(temp) {
  const convTemp = (temp - 32) * (5 / 9);
  return convTemp.toFixed(2);
}

function displayForUser(tempToday, tempTomorrow, sunrise, sunset) {
  const convTempToday = convertToCelcius(tempToday);
  const convTempTomorrow = convertToCelcius(tempTomorrow);

  const dataCurrent = document.getElementById("weather-data-current");
  const dataTomorrow = document.getElementById("weather-data-tomorrow");
  const dataSunrise = document.getElementById("weather-data-sunrise");
  const dataSunset = document.getElementById("weather-data-sunset");

  dataCurrent.append(` ${convTempToday} celcius`);
  dataTomorrow.append(` ${convTempTomorrow} celcius`);
  dataSunrise.append(`${sunrise}`);
  dataSunset.append(`${sunset}`);
}

getData();
