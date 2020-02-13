

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
function getCityData(city) {
    let url = `https://api.weatherapi.com/v1/forecast.json?key=ff4f207a8ae5485cb4320106200402&q=${city}&days=6`
    fetch(url)
        .then(r => r.json())
        .then(cityData => {
            if(typeof cityData.error !== 'undefined' ) {
                console.log(cityData.error)
            } else {
                if(!citysFound.includes(cityData.location.name)) {
                    addButton(cityData.location.name)
                    citysFound.push(cityData.location.name)
                }
                console.log(cityData)
                document.getElementById('no-city').classList.add('hide')
                document.getElementById('city-data').classList.remove('hide')
            }
        })
        .catch(e => {
            console.log("Hello")
        })
}

document.getElementById('icon_prefix2').addEventListener('keydown', (event) => {
    if (event.keyCode === 13 || event.which === 13) {
        getSeachInfo()
    }
})
document.addEventListener('click', ({target}) => {
    if (target.id === 'search-icon') {
        getSeachInfo()
    } else if(target.type === 'submit') {
        getCityData(target.value)
    }
})

