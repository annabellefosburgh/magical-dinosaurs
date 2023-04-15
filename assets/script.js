//assigning variables
var currentDate = dayjs().format('MMMM, DD, YYYY');
var todayDate = document.getElementById('today-date');
var searchHistoryEl = document.getElementById('history-list');
var city = null;
var lat = null;
var lon = null;
var searchInput = document.getElementById('cityInput');
var APIkey = "a94f0ec5491fe1aee8e7914a2c495498";
var searchBtn = document.getElementById('searchbtn');
var currentContainer = document.getElementById('forecast-current');
var dayOne = document.getElementById('dayone')
var dayTwo = document.getElementById('daytwo')
var dayThree = document.getElementById('daythree')
var dayFour = document.getElementById('dayfour')
var dayFive = document.getElementById('dayfive')


function refetchWeather(e) {
    if(e.target.matches('li')) {
        var cityLat = e.target.dataset.lat;
        var cityLon = e.target.dataset.lon;
        getOneCall(cityLat, cityLon);
    }
}

function getGeocodeInfo() {
    city = searchInput.value;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit={1}&appid=${APIkey}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log('data is', data);
        lat = data[0]["lat"];
        lon = data[0]["lon"];
        getCurrent(lat, lon)
        addCityToSearchHistory(lat, lon, city);
    })
}
//adding fetch for all the weather data needed
function getOneCall(lat, lon) {
    var currentURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=[minutely,hourly,alerts]&appid=${APIkey}`
    fetch(currentURL) 
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var currentTemp = document.createElement('p');
                var currentWind = document.createElement('p');
                var currentHumidity = document.createElement('p');
                currentTemp.textContent(data[i].current.temp)
                currentWind.textContent(data[i].current.wind)
                currentHumidity.textContent(data[i].current.humidity)   
                currentContainer.append(currentTemp)
                currentContainer.append(currentWind)
                currentContainer.append(currentHumidity)

                var dayOneDate = document.createElement('h2');
                var dayTwoDate = document.createElement('h2');
                var dayThreeDate = document.createElement('h2');
                var dayFourDate = document.createElement('h2');
                var dayFiveDate = document.createElement('h2');

                dayOneDate.textContent = currentDate.add(1, 'day')
                dayTwoDate.textContent = currentDate.add(2, 'day')
                dayThreeDate.textContent = currentDate.add(3, 'day')
                dayFourDate.textContent = currentDate.add(4, 'day')
                dayFiveDate.textContent = currentDate.add(5, 'day')
                dayOne.append(dayOneDate)
                dayTwo.append(dayTwoDate)
                dayThree.append(dayThreeDate)
                dayFour.append(dayFourDate)
                dayFive.append(dayFiveDate)

            }
        })
}  

//adding suggestions to search bar dropdown


//displaying search history
function addCityToSearchHistory(lat, lon, city) {
    //event.preventDefault();
    //var searchItem = $('input[name="searchbar"]').val();
    searchHistoryEl.append(`<li data-lat="${lat}" data-lon="${lon}">${city}</li>`)
    $('input[name="searchbar"]').val('');
}

//adding event listeners for buttons at the bottom
searchBtn.addEventListener('click', getGeocodeInfo);
searchHistoryEl.addEventListener('click', refetchWeather)