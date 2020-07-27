$(document).ready(function () {
  var city = null;
  var lat = " ";
  var lon = " ";
  var key = "&appid=ea3229d583947e23c0ad68c4233587d7&units=imperial";

  var storage = localStorage.getItem("storage")
    ? JSON.parse(localStorage.getItem("storage"))
    : [];

  localStorage.setItem("person", JSON.stringify({ name: "brandon" }));
  // when the user hits the enter key or submit icon, run the following
  $(".searchContainer").on("submit", function (e) {
    e.preventDefault();
    handleStorageAndSearch();
  });
  // same code as above but for clicking the button
  $("#submitWeather").on("click", function (e) {
    handleStorageAndSearch();
  });

  function handleStorageAndSearch(val = $("#city").val().trim()) {
    showWeather(val);
  }

  function searchBtns() {
    $("#storage").html("");
    storage.forEach(item =>
      $("#storage").append(
        `<button class="historyCity" "row-sm-3 id="1">${item}</button>`
      )
    );
  }

  $("#storage").on("click", ".historyCity", function () {
    handleStorageAndSearch($(this).text());
  });
  searchBtns();

  function showWeather(city) {
    if (city != " ") {
      $("#error").html(" ");
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + key,
        type: "GET"
        // dataType: "json",
      }).then(function (data) {
        if (!storage.includes(city)) {
          storage.push(city);
          localStorage.setItem("storage", JSON.stringify(storage));
        }

        searchBtns();
        // use spread operator to access both API calls 
        $("#show").html(show({ ...data, ...data.main }));
        $("#city").val(" ");
        lon = data.coord.lon;
        lat = data.coord.lat;

        $.ajax({
          url:
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lat +
            "&lon=" +
            lon +
            key,
          type: "GET",
          dataType: "json",

          success: function (data2) {
            console.log(data2);

            for (var i = 1; i < 6; i++) {
              $(`#day${i}`).html(show({ ...data2.daily[i] }));
            }
          }
        });
      });
    } else {
      $("#error").html("Field cannot be empty");
    }
  }
});

// function to show current day info for city searched
function show(data) {
  return (
    // city name that the user typed in
    "<h2><strong>" +
    (data.name || "") +
    "</strong></h2>" +
    "<img src=" +
    "https://openweathermap.org/img/w/" +
    data.weather[0].icon +
    ".png>" +
    "<p><strong>Temp</strong>: " +
    Math.floor(data.temp?.day || data.temp) +
    "</p>" +
    "<p><strong>Humidity</strong>:" +
    data.humidity +
    "</p>" +
    "<p><strong>Wind Speed</strong>:" +
    (data.wind_speed || data.wind.speed) +
    "</p>"
  );
}
