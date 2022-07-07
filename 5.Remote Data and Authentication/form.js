function post() {


    let inputPerson = document.getElementById('person');
    let inputPhone = document.getElementById('phone');
    let content = document.getElementById('content');
    let btnSubmit = document.getElementById('submit');
    let url = 'http://localhost:3030/jsonstore/phonebook'


    fetch(url)
        .then(res => res.json())
        .then(data => {
            //debugger
            let arr = Object.values(data);
            for (let person of arr) {
                content.textContent += `${person.person} - ${person.phone}\n`
            }

        })
    btnSubmit.addEventListener('click', onLoad);

    function onLoad(ev) {
        ev.preventDefault();
        let inputData = { person: `${inputPerson.value}`, phone: `${inputPhone.value}` }
        fetch(url, {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(inputData),
        });
        fetch(url)
            .then(res => res.json())
            .then(data => {
                //debugger
                let arr = Object.values(data);
                for (let person of arr) {
                    content.textContent += `${person.person} - ${person.phone}\n`
                }

            })
    }

}
post();