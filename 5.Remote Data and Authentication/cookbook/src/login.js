document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');


    try {
        if (email == '' || password == '') {
            throw new Error('празно поле')
        }


        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (response.ok == false) {
            const error = await response.json();
            throw Error(error.message);
        }

        const data = await response.json();

        sessionStorage.setItem('accessToken', data.accessToken)
        window.location = '/5.Remote%20Data%20and%20Authentication/cookbook/index.html'

    } catch (error) {
        alert(error.message);
    }

}