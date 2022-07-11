let loadButton = document.getElementById('loadBooks');

loadButton.addEventListener('click', loadData);
let url = 'http://localhost:3030/jsonstore/collections/books/'
let tbody = document.querySelector('tbody');
let form = document.querySelector('form');
async function loadData(e) {
    e.preventDefault();
    try {

        //tbody.innerHTML = '';
        tbody.replaceChildren();
        let res = await fetch(url);
        const dbData = await res.json();
        let arr = Object.entries(dbData);
        debugger
        for (let [key, { author, title }] of arr) {

            let tr = document.createElement('tr');
            tbody.appendChild(tr);
            let td1 = document.createElement('td');
            td1.textContent = author;
            tr.appendChild(td1);
            let td2 = document.createElement('td');
            td2.textContent = title;
            tr.appendChild(td2);
            let tdButtons = document.createElement('td');
            let btnEdit = document.createElement('button');
            btnEdit.textContent = 'Edit';
            let btnDelete = document.createElement('button');
            btnDelete.textContent = 'Delete';
            tdButtons.appendChild(btnEdit)
            tdButtons.appendChild(btnDelete)
            tr.appendChild(tdButtons);

        }

        console.log('Data Returned');
    } catch (err) {

        console.log(err)

    }
    let submitBtn = document.querySelector('form button');
    //debugger
    submitBtn.addEventListener('click', addBook);

    async function addBook(e) {
        // e.preventDefault();

        const formData = new FormData(form);
        const author = formData.get('author').trim();
        const title = formData.get('title').trim();
        if (title == '' || author == '') {
            return
        }

        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    author,
                    title
                })
            });
            if (response.ok == false) {
                const error = await response.json();
                throw Error(error.message);
            }
            const data = await response.json();



        } catch (error) {
            alert(error.message);
        }
        loadData();

    }
    tbody.addEventListener('click', manipulation)

    async function manipulation(e) {
        let currentID = e.target.id;
        //debugger
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
            } else if (e.target.textContent == 'Edit') {
                document.querySelectorAll('form input')[0].value = e.target.parentElement.parentElement.querySelectorAll('td')[0].textContent
                document.querySelectorAll('form input')[1].value = e.target.parentElement.parentElement.querySelectorAll('td')[1].textContent

                const response = await fetch(`${url}/${currentID}`, {
                    method: 'put'

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