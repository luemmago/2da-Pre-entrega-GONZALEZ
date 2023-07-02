document.getElementById('login_button').addEventListener('click', (event) => {
    event.preventDefault()
    let data = {
        mail: document.querySelector('#mail').value,
        password: document.querySelector('#password').value,
    }

    fetch(`/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            alert(res.message)
            window.location.replace('/')
        } else {
            alert(res.message)
        }
    })
})