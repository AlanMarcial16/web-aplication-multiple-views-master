const url = new URL(window.location.href);
const username = url.searchParams.get("username");
const token = window.localStorage.getItem("token");

document.querySelector("#username").value = username;
document.querySelector(
  "#back-btn"
).href = `/infoUsuario.html?username=${username}`;

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

function displayUserInfo(userInfo = {}) {
  document.querySelector("#nombre").value = userInfo.nombre;
  document.querySelector("#correo").value = userInfo.correo;
  document.querySelector("#telefono").value = userInfo.telefono;
  document.querySelector("#rol").value = userInfo.rol;
}

async function updateUserInfo(e) {
  e.preventDefault();

  let usuarioInfo = {
    nombre: `${e.target.querySelector('[name="nombre"]').value}`,
    correo: `${e.target.querySelector('[name="correo"]').value}`,
    telefono: `${e.target.querySelector('[name="telefono"]').value}`,
    rol: `${e.target.querySelector('[name="rol"]').value}`,
  };
  const body = JSON.stringify({
    searchedUser: username,
    userInfoJSON: JSON.stringify(usuarioInfo),
  });

  let Response = await fetch(
    "https://wsrecursoshumanos.azurewebsites.net/api/usuariosinfo",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    }
  );

  Response = await Response.json();

  if (Response.status == "success") {
    await Swal.fire({
      title: "Éxito",
      text: Response.message,
      icon: "success",
    });
    window.location.href = `/infoUsuario.html?username=${username}`;
  } else {
    Swal.fire({
      title: "Error",
      text: Response.message,
      icon: "warning",
    });
  }
}

requestUserInfo();
document
  .querySelector("form")
  .addEventListener("submit", async (e) => await updateUserInfo(e));
