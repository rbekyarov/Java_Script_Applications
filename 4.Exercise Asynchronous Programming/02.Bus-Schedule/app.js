function solve() {
    let greenArea = document.querySelector('.info')
    let buttonDepart = document.getElementById('depart');
    let buttonArrive = document.getElementById('arrive');

    let url = 'http://localhost:3030/jsonstore/bus/schedule'
    let nextStop = '';
    let nameStop = 'Depot';
    let arr = [];

    function depart() {
        buttonDepart.disabled = true;
        buttonArrive.disabled = false;


        fetch(url)
            .then(result => result.json())
            .then(data => {
                //debugger
                arr = Object.values(data)
                let firstStop = arr.find(x => x.name == nameStop)
                nextStop = firstStop.next
                nameStop = firstStop.name
                greenArea.textContent = `Next stop ${nameStop}`


            })
            .catch(function(error) { areaStopName.textContent = 'Error' });
    }

    function arrive() {

        buttonDepart.disabled = false;
        buttonArrive.disabled = true;

        fetch(url)
            .then(result => result.json())
            .then(data => {

                arr = Object.entries(data)


                let searchStop = arr.find(x => x[0] == nextStop)
                nameStop = searchStop[1].name
                greenArea.textContent = `Arriving at ${nameStop}`

            })
            .catch(function(error) { areaStopName.textContent = 'Error' });



    }

    return {
        depart,
        arrive
    };
}

let result = solve();