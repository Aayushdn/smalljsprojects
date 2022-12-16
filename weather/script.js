"use strict";
let tempreature = document.getElementById("temp");
let place = document.getElementById("place");
let weatherIcon = document.querySelector(".weatherIcon");
let weather = document.querySelector("#weather");
let temp = document.querySelector("#tempr");
let humidity = document.querySelector("#humidity");
let windspeed = document.querySelector("#wind");
let search = document.querySelector(".search");
let searchBox = document.querySelector(".search-box");
let APIKEY = "76e76683f341bcb918230a5ebd0b3b0e";
let detail_place = document.querySelector("#detPlace");
let detailSection = document.querySelector(".detail");

const getCoords = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve(pos.coords);
      },
      (err) => {
        reject(new Error(err));
      }
    );
  });
};

const getData = function (lat, long) {
  return Promise.all([
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}&units=metric`
    ).then((res) => res.json()),
    fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${APIKEY}`
    ).then((res) => res.json()),
  ]);
  //   return new Promise((resolve, reject) => {
  //     fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=76e76683f341bcb918230a5ebd0b3b0e&units=metric`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         resolve(data);
  //       });
  //   });
};

const locToCoords = function (location) {
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${APIKEY}`
  ).then((res) => res.json());
};

function displayData(weatherData,locationData) {
  weather.textContent = `${weatherData.weather[0].description}`;
  temp.textContent = `${weatherData.main.temp}`;
  humidity.textContent = `${weatherData.main.humidity}`;
  windspeed.textContent = `${weatherData.wind.speed}`;
  detail_place.textContent = `${locationData.name} - ${locationData.country}`;
}

const fetchData = function () {
  let lat, long;
  getCoords().then((coords) => {
    lat = coords.latitude;
    long = coords.longitude;
    getData(lat, long).then((values) => {
      // console.log(values)

      let [weatherData, [locationData]] = values;
      console.log(weatherData, locationData);
      tempreature.textContent = weatherData.main.temp;
      place.textContent = `${locationData.name} - ${locationData.country}`;
      weather.textContent = `${weatherData.weather[0].description}`;
      temp.textContent = `${weatherData.main.temp}`;
      humidity.textContent = `${weatherData.main.humidity}`;
      windspeed.textContent = `${weatherData.wind.speed}`;
      // weatherIcon.src =`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    });
  });
};

search.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(search);
  let location = data.get("location");
  locToCoords(location).then((data) => {
    let { lat, lon } = data[0];
    console.log(lat, lon);
    getData(lat, lon).then((values) => {
      let [weatherData, [locationData]] = values;
      console.log(weatherData)
      displayData(weatherData,locationData)
      detailSection.scrollIntoView({
        behavior:'smooth',
      })
    });
  });
});

fetchData();
