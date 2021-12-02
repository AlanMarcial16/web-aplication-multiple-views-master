const url = new URL(window.location.href);
const userName = url.searchParams.get("username");
const token = window.localStorage.getItem("token");

async function setUser(e) {
  e.preventDefault();

  const body = JSON.stringify({
    newUser: `${e.target.querySelector('[name="newUser"]').value}`,
    newPass: `${e.target.querySelector('[name="newPass"]').value}`,
  });

  let Response = await fetch(
    "https://wsrecursoshumanos.azurewebsites.net/api/usuarios",
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
    window.location.href = "/dashboard2.html";
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
  .addEventListener("submit", async (e) => await setUser(e));