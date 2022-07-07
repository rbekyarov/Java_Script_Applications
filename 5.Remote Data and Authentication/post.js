function post() {
    debugger

    const data = { body: 'RADO2', title: 'Test' };
    let url = 'http://localhost:3030/jsonstore/blog/posts'
    fetch(url, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
    });
}

post();