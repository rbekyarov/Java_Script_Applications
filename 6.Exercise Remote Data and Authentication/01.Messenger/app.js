function attachEvents() {

    let areaMessages = document.getElementById('messages');
    let url = 'http://localhost:3030/jsonstore/messenger';

    readData();
    document.getElementById('refresh').addEventListener('click', () => {
        readData();
    })
    async function readData() {
        areaMessages.textContent = '';
        try {
            let res = await fetch(url);
            const data = await res.json();

            let arr = Object.values(data);

            for (let massage of arr) {
                areaMessages.textContent += `${massage.author}: ${massage.content}\n`
            }
        } catch (err) {

            console.log(err)
        }
    }
    document.getElementById('submit').addEventListener('click', async(event) => {
        event.preventDefault();
        let inputArr = Array.from(document.querySelectorAll('#controls input'));
        let author = inputArr[0].value;
        let content = inputArr[1].value;
        try {
            const response = await fetch('http://localhost:3030/jsonstore/messenger', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ author, content })
            });

            if (response.ok == false) {
                const error = await response.json();
                throw Error(error.message);
            }
            const data = await response.json();
            debugger
            readData();
            inputArr[0].value = '';
            inputArr[1].value = '';
        } catch (error) {
            alert(error.message);
        }

    });
}
attachEvents();