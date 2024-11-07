/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import'./reset.css';
import './index.css';
import Tarefa from './Tarefa';
import Swal from 'sweetalert2';

var tarefas: Tarefa[] = [];

function addPeloEnter(evento: KeyboardEvent){
    if(evento.key === 'Enter'){
        console.log("Entrouu")
        adicionarTarefa();
    }
}

function adicionarTarefa() {
    const input = document.getElementById("tarefa-text") as HTMLInputElement;
    const tarefaTexto = input.value.trim();

    if (tarefaTexto === '') {
       Swal.fire("VOCÊ TENTOU ADICIONAR UMA TAREFA SEM TEXTO");
        return;
    }

    const novaTarefa = new Tarefa(tarefaTexto);
    tarefas.push(novaTarefa);
    
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    render()
    input.value = "";
    input.focus();
}

function render(){
    const listaTarefas = document.getElementById("lista-tarefa") as HTMLUListElement;
    listaTarefas.innerHTML = "";

    for (var i = 0; i < tarefas.length; i++) {
        const li = document.createElement("li");
        if (tarefas[i].getCompleted() === true) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = tarefas[i].getText();

        const concluir = document.createElement("button");
        concluir.textContent = "done_all"
        concluir.classList.add("check");
        concluir.classList.add("material-symbols-outlined")
        concluir.setAttribute("onclick", `trocaConcluir(${tarefas[i].getid()})`);

        const edit = document.createElement("button");
        edit.textContent = "edit";
        edit.classList.add("edit");
        edit.classList.add("material-symbols-outlined")
        edit.setAttribute("onclick", `editarTarefa(${tarefas[i].getid()})`)

        const deletar = document.createElement("button");
        deletar.textContent = "delete";
        deletar.classList.add("delete");
        deletar.classList.add("material-symbols-outlined");
        deletar.setAttribute("onclick", `deletarTarefa(${tarefas[i].getid()})`)

        const div = document.createElement("div");

        div.appendChild(concluir)
        div.appendChild(edit)
        div.appendChild(deletar)

        li.appendChild(span);
        li.appendChild(div);

        listaTarefas.appendChild(li);
    }
}

function trocaConcluir(id: number){
    const index = tarefas.findIndex(tarefas => tarefas.getid() === id);
    const valorAtual = tarefas[index].getCompleted();
    tarefas[index].setCompleted(!valorAtual);
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    render();
}

//.trim() => Remove espacos no inicio e no fim do texto

async function editarTarefa(id: number){
    const index = tarefas.findIndex(tarefas => tarefas.getid() === id);
   
    const { value } = await Swal.fire({
        title: "Editar tarefa",
        input: "text",
        inputLabel: "Edite o texto da tarefa",
        inputValue: tarefas[index].getText(),
        showCancelButton: true       
      });

    if(value !== null && value.trim() !== ''){
        tarefas[index].setText(value.trim());
        localStorage.setItem("tarefas", JSON.stringify(tarefas))
        render();
    }
}

function deletarTarefa(id: number){
     tarefas = tarefas.filter(tarefas => tarefas.getid() !== id);
     localStorage.setItem("tarefas", JSON.stringify(tarefas))
     render();
}

window.addPeloEnter = addPeloEnter;
window.adicionarTarefa = adicionarTarefa;
window.trocaConcluir = trocaConcluir;
window.editarTarefa = editarTarefa;
window.deletarTarefa = deletarTarefa;
