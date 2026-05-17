const botao = document.getElementById("toggleTema")

if (localStorage.getItem("tema") === "claro"){
    document.body.classList.add("light-mode");
}
if(botao) {
    botao.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("tema", "claro");
        } else {
            localStorage.setItem("tema", "escuro");
        }
        
    });
}

const elementosReveal = document.querySelectorAll(".reveal");

function mostrarElementos() {
    elementosReveal.forEach((elemento) => {
        const posicao = elemento.getBoundingClientRect().top;
        const alturaTela = window.innerHeight * 0.85;

        if (posicao < alturaTela) {
            elemento.classList.add("ativo")
        }
    });
}

window.addEventListener("scroll", mostrarElementos);
window.addEventListener("load", mostrarElementos);