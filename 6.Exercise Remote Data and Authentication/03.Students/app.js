let tbody = document.querySelector('tbody');
window.addEventListener('load', loadInfoStudent)
let url = 'http://localhost:3030/jsonstore/collections/students'
let form = document.querySelector('form')

async function loadInfoStudent() {

    try {

        //tbody.innerHTML = '';
        tbody.replaceChildren();
        let res = await fetch(url);
        const dbData = await res.json();
        let arr = Object.values(dbData);

        for (let element of arr) {
            let tr = document.createElement('tr');
            tbody.appendChild(tr);
            let td1 = document.createElement('td');
            td1.textContent = element.firstName;
            tr.appendChild(td1);
            let td2 = document.createElement('td');
            td2.textContent = element.lastName;
            tr.appendChild(td2);
            let td3 = document.createElement('td');
            td3.textContent = element.facultyNumber;
            tr.appendChild(td3);
            let td4 = document.createElement('td');
            td4.textContent = element.grade;
            tr.appendChild(td4);

        }

        console.log('Data Returned');
    } catch (err) {

        console.log(err)

    }
    let submitBtn = document.querySelector('#submit');

    submitBtn.addEventListener('click', addStudent);

    async function addStudent(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const firstName = formData.get('firstName').trim();
        const lastName = formData.get('lastName').trim();
        const facultyNumber = formData.get('facultyNumber').trim();
        const grade = formData.get('grade').trim();

        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    facultyNumber,
                    grade
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
        loadInfoStudent();

    }
}