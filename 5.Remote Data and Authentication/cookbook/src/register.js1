const form = document.querySelector('form');
const url = 'http://localhost:3030/users/register';

form.addEventListener('submit', (ev => {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');

    onSubmit(email, password);
}));

async function onSubmit(data) {
    if (data.password != data.rePass) {
        return console.error('Passwords don\'t match');
    }

    const body = JSON.stringify({
        email: data.email,
        password: data.password,
    });

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
        const data = await response.json();
        if (response.ok) {
            sessionStorage.setItem('authToken', data.accessToken);
            window.location.pathname = 'index.html';
        } else {
            throw new Error(data.message);
        }
    } catch (err) {
        console.error(err.message);
    }
}