require("./style.css");

const API_KEY =
  "WFGRQQUH947TD839JRKPSHXNB"; /* THIS DATA SHOULD BE HIDDEN - but since it's a public API, it does not really matter*/
const location = "aarhus";
const fetchAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;

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
  location = "aarhus";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;
  try {
    const reponse = await fetch(url);
    const dataJSON = await reponse.json();
    const weatherTemperature = dataJSON.currentConditions.temp;
    convertToCelcius(weatherTemperature);
  } catch (error) {
    console.error(error);
  }
}

function convertToCelcius(temp) {
  const convertedTemperatur = (temp - 32) * (5 / 9);
  displayForUser(convertedTemperatur);
}

function displayForUser(temp) {
  console.log(temp);
  document.body.append(temp);
}

getData(fetchAPI);
