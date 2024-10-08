import ContaBancaria from "./ContaBancaria";
import Titular from "./Titular";

export default class ContaCorrente extends ContaBancaria{
    private limite: number;

    constructor (titular: Titular, chavepix: string){
        super(titular, chavepix);
        this.limite = 1000;
    }
    public getLimite(): number{
        return this.limite;
    }
    public override sacar(valor: number): void {
        var valordisponivel = this.getSaldo() + this.limite;
        if(valor <= 0 || valor > valordisponivel){
            console.log("Saldo/limite INSUFICIENTE PARA SAQUE!!");
        return;
        }
        if (valor > this.getSaldo()){
            var aux = valor - this.getSaldo();
            this.limite = this.limite - aux;
            this.setSaldo(0);
            console.log(`Saldo de R$ ${valor} realizado com sucesso!!`);
            console.log(`Seu Saldo e R$ ${this.getSaldo()}!!`);
            console.log(`Seu limite e R$ ${this.limite}`);           
            return;
        }
        var saldo = this.getSaldo();
        this.setSaldo(saldo - valor);

        console.log(`Saldo de R$ ${valor} realizado com sucesso!!`);
        console.log(`Seu Saldo e R$ ${this.getSaldo()}!!`);
        console.log(`Seu limite e R$ ${this.limite}`);
    }

}
