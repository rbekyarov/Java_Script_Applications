function attachEvents() {
    let locationInput = document.getElementById('location');
    let butonSubmit = document.getElementById('submit');
    let url = 'http://localhost:3030/jsonstore/forecaster/locations';
    let sunny = '&#x2600';
    let partlySunny = '&#x26C5';
    let overcast = '&#x2601';
    let rain = '&#x2614';
    let degrees = '&#176';
    let icon = '';
    let forecast = document.getElementById('forecast')
    let conditionArea = document.querySelector('#current');

    let upcomingArea = document.querySelector('#upcoming');
    let conditionDiv = document.createElement('div');
    let upcomingDiv = document.createElement('div');

    butonSubmit.addEventListener('click', loadData);

    function loadData() {
        conditionDiv.innerHTML = '';
        upcomingDiv.innerHTML = '';
        let locationCode;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                //debugger
                data.forEach(element => {
                    if (element.name == locationInput.value) {
                        locationCode = `${element.code}`
                    }

                });

                let url = `http://localhost:3030/jsonstore/forecaster/today/${locationCode}`

                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        forecast.style = 'display:block;'
                        if (data.forecast.condition == 'Sunny') {
                            icon = sunny;
                        } else if (data.forecast.condition == 'PartlySunny') {
                            icon = partlySunny;
                        } else if (data.forecast.condition == 'Overcast') {
                            icon = overcast;
                        } else if (data.forecast.condition == 'Rain') {
                            icon = rain;
                        }
                        conditionDiv.className = 'forecast';

                        conditionDiv.innerHTML =
                            `
                        <span class = "condition symbol">${icon}</span>
                        <span slass = "condition">
                        <span class = "forecast-data">${data.name}</span>
                        <span class = "forecast-data">${data.forecast.low}${degrees}/${data.forecast.high}${degrees}</span>
                        <span class = "forecast-data">${data.forecast.condition}</span>
                        </span>
                        `
                        conditionArea.appendChild(conditionDiv)
                        console.log(data);
                    })

                let upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`

                fetch(upcomingUrl)
                    .then(res => res.json())
                    .then(data => {

                        let arr = Object.values(data)
                        upcomingDiv.className = 'forecast-info';
                        for (let e of arr[0]) {
                            if (e.condition == 'Sunny') {
                                icon = sunny;
                            } else if (e.condition == 'PartlySunny') {
                                icon = partlySunny;
                            } else if (e.condition == 'Overcast') {
                                icon = overcast;
                            } else if (e.condition == 'Rain') {
                                icon = rain;
                            }

                            upcomingDiv.innerHTML +=
                                `
                        <span class = "upcoming">
                        <span slass = "symbol">${icon}</span>
                        <span class = "forecast-data">${e.low}${degrees}/${e.high}${degrees}</span>
                        <span class = "forecast-data">${e.condition}</span>
                        </span>
                        `
                            upcomingArea.appendChild(upcomingDiv)
                        }
                    })
            })
            .catch((err) =>
                conditionArea.textContent = `${err}`)
    }
}

attachEvents();