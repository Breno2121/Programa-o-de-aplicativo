import './index.css';

document.getElementById("botao-voltar").addEventListener("click", () => {
    (window as any).bancoAPI.irpaghome()
})