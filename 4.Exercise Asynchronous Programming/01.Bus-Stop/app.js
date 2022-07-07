function getInfo() {
    let input = document.getElementById('stopId')

    let areaStopName = document.getElementById('stopName')
    let areaResult = document.getElementById('buses')
    areaResult.innerHTML = '';

    let busId = input.value;
    let url = `http://localhost:3030/jsonstore/bus/businfo/${busId}`

    fetch(url)
        .then(result => result.json())
        .then(data => {

            for (let bus in data.buses) {
                let listBuss = document.createElement('li');
                listBuss.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
                areaResult.appendChild(listBuss);
            }

            areaStopName.textContent = `${data.name}`

        })
        .catch(function(error) { areaStopName.textContent = 'Error' });

    input.value = '';

}