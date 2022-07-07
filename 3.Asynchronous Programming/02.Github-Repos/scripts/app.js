async function loadRepos() {
    let input = document.getElementById('username');
    let ulE = document.getElementById('repos');
    ulE.innerHTML = "";
    let url = `https://api.github.com/users/${input.value}/repos`;

    try {
        let res = await fetch(url);
        const data = await res.json();
        data.forEach(element => {
            let li = document.createElement('li');
            li.textContent = element.full_name;
            ulE.appendChild(li);
        });

    } catch (err) {
        let li = document.createElement('li');
        err.message = 'Not Found'
        li.textContent = err.message;
        ulE.appendChild(li);
    }

}