async function getWeather() {
    var city = document.getElementById("city_name").value;
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4148d2698bbd49ea1a75ca9bbbb0245b&units=metric`;
  const response = await fetch(api);
  const data = await response.json();
  console.log(data);
  console.log(data.main.temp);
  document.querySelector(".temp").innerText = data.main.temp + "°C";
  document.querySelector(".city").innerText = data.name + ", " + data.sys.country;
  document.querySelector(".humidity").innerText = data.main.humidity + "%";
  document.querySelector(".wind").innerText = data.wind.speed + " m/s";
  let img = document.querySelector(".weather-icon");
  let range = data.weather[0].id;
  console.log(range);
  if(range >= 200 && range <= 232) {
    img.src = "images/rain.png";
}
else if(range >= 300 && range <= 321) {
    img.src = "images/drizzle.png";
}
else if(range >= 500 && range <= 531) {
    img.src = "images/rain.png";
}
else if(range >= 600 && range <= 622) {
    img.src = "images/snow.png";
}
else if(range == 701 && range <= 781) {
    img.src = "images/mist.png";
}
else if(range == 800) {
    img.src = "images/clear.png";
}
else if(range >= 801 && range <= 804) {
    img.src = "images/clouds.png";
}
}

document.getElementById("city_name").addEventListener("change", function() {
    getWeather();
});
window.onload = getWeather();