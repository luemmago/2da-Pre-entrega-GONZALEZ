document.getElementById('login').addEventListener('click', (event) => {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log({email, password})

    let data = {
        email: document.querySeleSctor('#email').value,
        password: document.querySelector('#password').value,
    }

    fetch('/api/auth/signin', {
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
    .catch (err=>console.log(err))
})

document.getElementById('signout').addEventListener('click',(event)=> {
    event.preventDefault()
    fetch('/api/auth/signout',{
        method: 'POST'
    })
        .then(res=>res.json())
        .then(res=>alert(res.message))
        .catch(err=>console.log(err))
})