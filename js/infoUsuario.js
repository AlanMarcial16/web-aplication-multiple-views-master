const url = new URL(window.location.href);
const username = url.searchParams.get("username");
const token = window.localStorage.getItem("token");

document.querySelector(
  "#btn-crear-datos"
).href = `/formNuevosDatos.html?username=${username}`;
document.querySelector(
  "#btn-modificar-datos"
).href = `/formModificarDatos.html?username=${username}`;

function displayUserInfo(userInfo = {}) {
  document.querySelector("#username").innerHTML = username;
  document.querySelector("#nombre").innerHTML = userInfo.nombre;
  document.querySelector("#correo").innerHTML = userInfo.correo;
  document.querySelector("#telefono").innerHTML = userInfo.telefono;
  document.querySelector("#rol").innerHTML = userInfo.rol;
}

async function requestUserInfo() {
  let Response = await fetch(
    "https://wsrecursoshumanos.azurewebsites.net/api/usuariosinfo",
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
    const infoUsuario = usuarios[username];
    displayUserInfo(infoUsuario);
  } else {
    Swal.fire({
      title: "Error",
      text: Response.message,
      icon: "warning",
    });
  }
}

requestUserInfo();
