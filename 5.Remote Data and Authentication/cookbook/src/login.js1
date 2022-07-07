const form = document.querySelector('form');
const url = 'http://localhost:3030/users/login';

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');

    onSubmit(email, password);
});

async function onSubmit(email, password) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
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