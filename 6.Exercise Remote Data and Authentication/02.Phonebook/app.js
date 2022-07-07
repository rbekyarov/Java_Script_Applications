function attachEvents() {
    let bookArea = document.getElementById('phonebook');
    let btnLoad = document.getElementById('btnLoad');
    let btnCreate = document.getElementById('btnCreate');

    let url = 'http://localhost:3030/jsonstore/phonebook'

    btnLoad.addEventListener('click', loadData);
    async function loadData(e) {

        try {

            bookArea.innerHTML = '';
            let res = await fetch(url);
            const dbData = await res.json();
            let arr = Object.values(dbData);

            for (let element of arr) {
                let li = document.createElement('li');
                let btnDelete = document.createElement('button');
                btnDelete.textContent = 'Delete';
                btnDelete.setAttribute('id', element._id)
                li.textContent = `${element.person}: ${element.phone}`
                li.appendChild(btnDelete);
                bookArea.appendChild(li);

            }

            console.log('Data Returned');
        } catch (err) {

            console.log(err)

        }
    }
    btnCreate.addEventListener('click', addContact);
    async function addContact(e) {
        e.preventDefault();
        let person = document.getElementById('person').value;
        let phone = document.getElementById('phone').value;
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ person: `${person}`, phone: `${phone}` })
        });
        //debugger

        if (response.ok == false) {
            const error = await response.json();
            throw Error(error.message);
        }
        const data = await response.json();
        loadData();

        document.getElementById('person').value = '';
        document.getElementById('phone').value = '';
    }
    bookArea.addEventListener('click', removeContact);

    async function removeContact(e) {

        let currentID = e.target.id;
        try {
            if (e.target.textContent == 'Delete') {
                const response = await fetch(`${url}/${currentID}`, {
                    method: 'delete'

                });
                loadData();
                if (response.ok == false) {
                    const error = await response.json();
                    throw Error(error.message);
                }
                const data = await response.json();
            }

        } catch (error) {
            console.log(err)
        }

    }
}
attachEvents();