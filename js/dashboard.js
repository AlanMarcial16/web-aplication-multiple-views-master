const token = window.localStorage.getItem("token");

function displayUsers(user, pass) {
  let html = `<div class="col-lg-3 col-md-5 col-sm-11 shadow m-3 d-flex flex-column justify-content-between pl-0 pr-0">
    <img class="card-img-top" src="/img/user.jpg" alt="People">
    <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">${user}</h5>
        <p class="card-text"><strong>Contraseña: </strong> ${pass}</p>
        <a href="/infoUsuario.html?username=${user}" class="btn btn-dark mb-2">Ver usuario</a>
        <a href="/formModificarUsuario.html?username=${user}" class="btn btn-dark">Modificar usuario</a>
    </div>`;
  document.querySelector("#lista").innerHTML += html;
}

async function requestUsers() {
  let Response = await fetch(
    "https://wsrecursoshumanos.azurewebsites.net/api/usuarios",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  Response = await Response.json();

  if (Response.status == "success") {
    const usuarios = JSON.parse(Response.data);

    for (let key in usuarios) {
      displayUsers(key, usuarios[key]);
    }
  } else {
    Swal.fire({
      title: "Datos erroneos",
      text: Response.message,
      icon: "warning",
    });
  }
}

requestUsers();
