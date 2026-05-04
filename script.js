const botao = document.getElementById("toggleTema")

if(botao) {
    botao.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
}