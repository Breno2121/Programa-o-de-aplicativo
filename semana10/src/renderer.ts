import Veiculo from './enty/veiculo';
import './index.css';

var listaVeiculos: Veiculo[] = [];

document.getElementById("buton")?.addEventListener("click", (event: MouseEvent) => {
    event.preventDefault();

    var modeloinp = document.getElementById("modelo") as HTMLInputElement;
    var corinp = document.getElementById("cor") as HTMLInputElement;
    var anoinp = document.getElementById("ano") as HTMLInputElement;
    var precoinp = document.getElementById("preco") as HTMLInputElement;
    var imageminp = document.getElementById("imagem") as HTMLInputElement;
    
const novaCarro = new Veiculo (modeloinp.value, corinp.value, Number(anoinp.value), Number(precoinp.value), imageminp.value)
listaVeiculos.push (novaCarro);
(window as any).bancoAPI.createVeiculo(novaCarro)
render();

modeloinp.value = ""
corinp.value = ""
anoinp.value = ""
precoinp.value = ""
imageminp.value = ""

})
window.onload = async () => {
  const veiculo = await (window as any).bancoAPI.findAll();
  for( var i = 0; i < veiculo.length; i++){
    const veiculos = new Veiculo (veiculo[i].modelo, veiculo[i].cor, veiculo[i].ano, veiculo[i].preco, veiculo[i].imagem, veiculo[i].id);
  
    listaVeiculos.push (veiculos);
  }
  render();
}
function render (){
  var conteudo = document.getElementById("conteudo");
conteudo.innerHTML = "";

for(var i = 0; i < listaVeiculos.length; i++){
    conteudo.innerHTML += `
    <div class="card">
    <img src="${listaVeiculos[i].getimagem()}" alt="" srcset="">
    <div class="dados">
      <strong>${listaVeiculos[i].getmodelo()}</strong>
      <span>${listaVeiculos[i].getcor()}</span>
      <span>${listaVeiculos[i].getano()}</span>
      <span>${listaVeiculos[i].getpreco()}</span>
    </div>
    <div class="botao-card">
      <button id="botao-ver" onclick="irpagdetalhes('${listaVeiculos[i].getid()}')">Ver</button>
      <button id="botao-deletar" onclick="deletarVeiculo('${listaVeiculos[i].getid()}')">Deletar</button>
    </div>
  </div>`;
}
}

function deletarVeiculo(id: String){
  //CHAMA A FUNCAO DELETAR DO PRELOAD NO CONTEXTO DE'bancoAPI';
  (window as any).bancoAPI.deletarVeiculo(id);

  //FILTRA TODOS OS ITENS COM ID DIFERENTE DO ID QUE VEIO POR PARAMENTRO
  listaVeiculos = listaVeiculos.filter(veiculo => veiculo.getid() !== id);
  render()
}
function irpagdetalhes(id: String) {
  (window as any).bancoAPI.irpagdetalhes(id);
}

(window as any).deletarVeiculo = deletarVeiculo;
(window as any).irpagdetalhes = irpagdetalhes;