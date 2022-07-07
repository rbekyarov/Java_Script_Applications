document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name').trim();
    const img = formData.get('img');
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');

    const token = sessionStorage.getItem('accessToken');
    if (token == null) {
        throw new Error('pleas login')
        window.location = '/5.Remote%20Data%20and%20Authentication/cookbook/login.html';
        return;
    }
    try {


        const response = await fetch('http://localhost:3030/data/recipes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },

            body: JSON.stringify({
                name,
                img,
                ingredients,
                steps
            })
        });

        if (response.ok == false) {
            const error = await response.json();
            throw Error(error.message);
        }

        const data = await response.json();


        window.location = '/5.Remote%20Data%20and%20Authentication/cookbook/index.html'

    } catch (error) {
        alert(error.message);
    }

}