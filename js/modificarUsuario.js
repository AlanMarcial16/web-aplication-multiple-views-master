const url = new URL(window.location.href);
const username = url.searchParams.get("username");
const token = window.localStorage.getItem("token");

async function updateUsers(e) {
  e.preventDefault();

  const body = JSON.stringify({
    oldUser: `${e.target.querySelector('[name="oldUser"]').value}`,
    newUser: `${e.target.querySelector('[name="newUser"]').value}`,
    newPass: `${e.target.querySelector('[name="newPass"]').value}`,
  });

  let Response = await fetch(
    "https://wsrecursoshumanos.azurewebsites.net/api/usuarios",
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

  console.log(Response);
  if (Response.status == "success") {
    await Swal.fire({
      title: "Éxito",
      text: Response.message,
      icon: "success",
    });
    window.location.href = "/dashboard.html";
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
  .addEventListener("submit", async (e) => await updateUsers(e));
document.querySelector("#oldUser").value = username;
