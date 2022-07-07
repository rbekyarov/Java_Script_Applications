function loadCommits() {
    let username = document.getElementById('username');
    let repo = document.getElementById('repo');
    let ulArea = document.getElementById('commits')
    let url = `https://api.github.com/repos/${username.value}/${repo.value}/commits`;

    ulArea.innerHTML = '';

    let stat = '';
    fetch(url)

    .then(res => res.ok ? res.json() : stat = `${res.status}`)

    .then(commit => {

            let arrValue = Object.values(commit)
            for (let element of arrValue) {
                let li = document.createElement('li')
                li.textContent = `${element.commit.author.name}: ${element.commit.message}`
                ulArea.appendChild(li);
            }

        })
        .catch(function(err) {

            let li = document.createElement('li')
            li.textContent = `Error: ${stat} (Not Found)`
            ulArea.appendChild(li);
        });
}