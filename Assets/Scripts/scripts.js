

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
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ad7c955ef09cff110010cc7dc458217`

    fetch(url)
        .then(r => r.json())
        .then(cityData => {
            if (cityData.cod == '404') {
                console.log(cityData.cod)
            } else if (cityData.cod == '200') {
                console.log(cityData.cod)
                if(!citysFound.includes(cityData.name)) {
                    addButton(cityData.name)
                    citysFound.push(cityData.name)
                }
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
document.addEventListener('click', ({ target }) => {
    if (target.id === 'search-icon') {
        getSeachInfo()
    }
})


