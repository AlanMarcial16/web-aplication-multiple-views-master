const signOutBtn = document.querySelector("#sign-out");

if (signOutBtn) {
  signOutBtn.addEventListener("click", (e) => {
    window.localStorage.removeItem("token")
    window.location.href = "/";
  });
}
