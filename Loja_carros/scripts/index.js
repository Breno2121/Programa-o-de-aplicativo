var carros = [];

function adicionarVeiculo() {
    const input = document.getElementById("modelo-text");
    const veiculo = input.value.trim();

    if (veiculo === '') {
        alert("VOCÊ TENTOU ADICIONAR UMA TAREFA SEM TEXTO");
        return;
    }

    const textmodelo = document.getElementById("modelo-text").value.trim();
    const textcor = document.getElementById("cor-text").value.trim();
    const textano = document.getElementById("ano-text").value.trim();
    const textpreco = document.getElementById("preco-text").value.trim();
    const textfoto = document.getElementById("foto-text").value.trim();

    const novoVeiculo = {
        id: carros.length,
        modelo: textmodelo,
        cor: textcor,
        ano: textano,
        preco: textpreco,
        foto: textfoto
    };

    carros.push(novoVeiculo);
    render();
    document.getElementById("modelo-text").value = "";
    document.getElementById("cor-text").value = "";
    document.getElementById("ano-text").value = "";
    document.getElementById("preco-text").value = "";
    document.getElementById("foto-text").value = "";
    input.focus();
}

function render() {
    const listaCarros = document.getElementById("lista-carros");
    listaCarros.innerHTML = "";

    for (var i = 0; i < carros.length; i++) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = `${carros[i].modelo} - ${carros[i].cor} - ${carros[i].ano} - R$${carros[i].preco}`;

        const img = document.createElement("img"); 
        img.src = (carros[i].foto); 

        const button = document.createElement("button");
        button.textContent = "Remover";
        button.setAttribute("onclick", `deletarVeiculo(${carros[i].id})`)

        
        li.appendChild(span);
        li.appendChild(img);
        li.appendChild(button);
        listaCarros.appendChild(li);
    }
}

function deletarVeiculo(id){
    carros = carros.filter(carros => carros.id !== id);
    render();
}