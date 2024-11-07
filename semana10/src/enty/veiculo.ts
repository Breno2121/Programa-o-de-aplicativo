import { v4 as uuid } from 'uuid'

export default class Veiculo {
    private id: string;
    private modelo: string;
    private cor: string;
    private ano: number;
    private preco: number;
    private imagem: string;


    constructor(modelo: string, cor: string, ano: number, preco: number, imagem: string, id?: string) {
        this.id = id === undefined ? uuid() : id;
        this.modelo = modelo;
        this.cor = cor;
        this.ano = ano;
        this.preco = preco;
        this.imagem = imagem;
    }

    public getid() {
        return this.id
    }
    public getmodelo() {
        return this.modelo
    }
    public getcor() {
        return this.cor
    }
    public getano() {
        return this.ano
    }
    public getpreco() {
        return this.preco
    }
    public getimagem() {
        return this.imagem
    }

}