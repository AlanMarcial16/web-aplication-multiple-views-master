const url = new URL(window.location.href);
const username = url.searchParams.get("username");
const token = window.localStorage.getItem("token");

document.querySelector("#username").value = username;
document.querySelector(
  "#back-btn"
).href = `/infoUsuario.html?username=${username}`;

async function setUserInfo(e) {
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
      method: "POST",
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

document
  .querySelector("form")
  .addEventListener("submit", async (e) => await setUserInfo(e));
