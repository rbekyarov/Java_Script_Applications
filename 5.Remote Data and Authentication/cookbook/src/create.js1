const form = document.querySelector('form');
const url = 'http://localhost:3030/data/recipes';

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    const name = formData.get('name');
    const img = formData.get('img');
    const ingredients = formData.get('ingredients').split('\n');
    const steps = formData.get('steps').split('\n');

    const data = {
        name,
        img,
        ingredients,
        steps
    };

    const token = sessionStorage.getItem('authToken');
    if (token == null) {
        return window.location = 'index.html';
    }

    try {
        const response = await fetch('http://localhost:3030/data/recipes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            data
        });

        if (response.ok) {
            window.location = 'index.html';
        } else {
            throw new Error(await response.json());
        }
    } catch (err) {
        console.error(err.message);
    }
});