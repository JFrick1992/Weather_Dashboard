

let dataDone = false
document.getElementById('icon_prefix2').addEventListener('keydown', (event) => {
    if (event.keyCode === 13 || event.which === 13) {
        let searchText = document.getElementById('icon_prefix2').value
        document.getElementById('icon_prefix2').value =""
        if(searchText.length > 0) {
            let div = document.createElement('div')
            div.classList.add('row')
            div.innerHTML= `<button class="col s10 offset-s1 btn red">${searchText}</button>`
            document.getElementById('button-row').append(div)
            
        }
    }
})
let j = null
const request = async () => {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=london&appid=0ad7c955ef09cff110010cc7dc458217')
    const json = await response.json()
    j = 1
    j =json

}

request()

