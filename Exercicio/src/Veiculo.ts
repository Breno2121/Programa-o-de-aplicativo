import leia, { keyInSelect } from 'readline-sync'


export default class Veiculo{
    private veiculos: Veiculo[] = [];

    constructor(){
        this.marca = leia.question("Digite a marca do veiculo: ");
        this.modelo = leia.question("Digite o modelo do veiculo: ");
        this.ano = leia.questionInt("Digite o ano do veiculo: ");
        this.valor = leia.questionInt("Digite o valor do veiculo: ");
        var disp = leia.question("O veiculo esta disponivel: ");
        if(disp === "sim"){
            this.disponivel = true;
        } else{
            this.disponivel = false;
        }
    }

    public marca: string;
    public modelo: string;
    public ano: number;
    public valor: number;
    public disponivel: boolean;


    public addAccount() {
        var marca = leia.question("Digite a marca: ");
        var modelo = leia.question("Digite o modelo: ");
        var ano = leia.questionInt("Digite o ano: ");
        var valor = leia.questionInt("Digite o valor: ");
        var dispo = leia.question("O veiculo esta disponivel: ");
        if(dispo === "sim"){
            this.disponivel = true;
        } else{
            this.disponivel = false;
        }
    }

    public transferirveiculo(){
        console.log("Opcao indisponivel no momento, volte mais tarde...");
    }

    public mostrarveiculo(){
        console.table(this.veiculos)
    }

}

