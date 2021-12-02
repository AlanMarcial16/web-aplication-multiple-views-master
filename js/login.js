async function login(e){
    e.preventDefault()

    const body = JSON.stringify({
        user: `${e.target.querySelector('[name="user"]').value}`,
        password: `${e.target.querySelector('[name="password"]').value}`
    })

    let Response = await fetch('https://authorization-biblioteca.azurewebsites.net/login', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body
    })

    Response = await Response.json() 
    
    if(Response.message){
        Swal.fire({
            title: 'Datos erroneos',
            text: Response.message,
            icon: 'warning'
        })
    }
    else{
        window.localStorage.setItem("token", Response.access_token)

            await Swal.fire({
                title: 'Autenticado',
                icon: 'success'
            })
            
            window.location.href="/dashboard.html"

    }

}

document.querySelector('form').addEventListener('submit',async e => await login(e))