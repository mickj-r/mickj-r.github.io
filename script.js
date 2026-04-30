const botao = document.getElementById("toggleTema")

botao.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
})