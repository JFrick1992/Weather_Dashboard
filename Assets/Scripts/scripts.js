

let dataDone = false
let citysFound = []
function getSeachInfo() {
    let searchText = document.getElementById('icon_prefix2').value
    document.getElementById('icon_prefix2').value = ""
    if (searchText.length > 0) {
        getCityData(searchText)
    }
}
function addButton(city) {
    let div = document.createElement('div')
    div.classList.add('row')
    div.innerHTML = `<button class="col s10 offset-s1 btn red" value="${city}">${city}</button>`
    document.getElementById('button-row').append(div)
}
function formatDate(date) {
    let dateArray = date.split('-')
    return `${parseInt(dateArray[1])}/${parseInt(dateArray[2])}/${dateArray[0]}`
}
function getUVColor(uv) {
    //red organge yellow green
    if(uv <= 2) {
        return 'green'
    } else if(uv <= 5) {
        return 'yellow'
    } else if (uv <= 7) {
        return 'orange'
    } else {
        return 'red'
    }
}
function getCityData(city) {
    let url = `https://api.weatherapi.com/v1/forecast.json?key=ff4f207a8ae5485cb4320106200402&q=${city}&days=6`
    fetch(url)
        .then(r => r.json())
        .then(cityData => {
            if (typeof cityData.error !== 'undefined') {
                console.log(cityData.error)
            } else {
                if (!citysFound.includes(cityData.location.name)) {
                    addButton(cityData.location.name)
                    citysFound.push(cityData.location.name)
                }
                let forecast = cityData.forecast.forecastday
                document.getElementById('temp').innerHTML = `Temperature: ${cityData.current.temp_f}&#176F`
                document.getElementById('uv-index').innerHTML = `UV Index: <span class="${getUVColor(parseFloat(cityData.current.uv))}">${cityData.current.uv}</span>`

                document.getElementById('humidity').innerText = `Humidity: ${cityData.current.humidity}%`
                document.getElementById('wind-speed').innerText = `Wind Speed: ${cityData.current.wind_mph} MPH`
                document.getElementById('city-name').innerHTML = `${cityData.location.name}(${formatDate(forecast[0].date)})<img src="${`https:${cityData.current.condition.icon}`}" alt="cityData.current.condition.text">`
                forecast.shift()
                let html = ''
                forecast.forEach(el => {
                    html += `
                    <div class="col xl2 l3 m5 s12">
                        <div class="col-content blue mt-10">
                            <div class="ml-10">
                                <h5 id="date-day-1">${formatDate(el.date)}</h5>
                                <img src="https:${el.day.condition.icon}" alt="" id="img-day-1">
                                <p id="temp-day-1">Temperature high: ${(el.day.maxtemp_f)}&#176F</p>
                                <p id="temp-day-1">Temperature low: ${(el.day.mintemp_f)}&#176F</p>
                            </div>
                        </div>
                    </div>
                    `
                })
                document.getElementById('forecast-row').innerHTML = html
                document.getElementById('no-city').classList.add('hide')
                document.getElementById('city-data').classList.remove('hide')
            }
        })
        .catch(e => {

        })
}

document.getElementById('icon_prefix2').addEventListener('keydown', (event) => {
    if (event.keyCode === 13 || event.which === 13) {
        getSeachInfo()
    }
})
document.addEventListener('click', ({ target }) => {
    if (target.id === 'search-icon') {
        getSeachInfo()
    } else if (target.type === 'submit') {
        getCityData(target.value)
    }
})

