import { Client } from "pg";
import Veiculo from "src/enty/veiculo";

export default class VeiculoRepository {
    private connection: Client
    constructor() {
        if (!this.connection) {
            this.connection = new Client({
                host: 'localhost',
                port: 5432,
                database: 'revenda',
                user: 'postgres',
                password: 'senai'
            })
        }
    }
    async save(veiculo: Veiculo) {
        try {
            this.connection.connect();
            const sql = "INSERT INTO veiculo (id, modelo, cor, ano, preco, imagem) VALUES ($1, $2, $3, $4, $5, $6)";
            const values = [veiculo.getid(), veiculo.getmodelo(), veiculo.getcor(), veiculo.getano(), veiculo.getpreco(), veiculo.getimagem()];
            await this.connection.query(sql, values);
        } catch (error) {
            console.log(error)
        } finally {
            this.connection.end();
            this.connection = null;
        }
    }

    async findAll() {
        try {
            this.connection.connect();
            const sql = "SELECT * FROM veiculo";
            const result = await this.connection.query(sql);
            if (result.rows.length > 0) {
                return result.rows;
            } else {
                console.log("nao foi encontrado nenhum valor!")
                return [];
            }
        } catch (error) {
            console.log(error)
            return [];
        } finally {
            this.connection.end();
        }
    }

    async findbyid(id: string) {
        try {
            this.connection.connect;
            const sql = "SELECT * FROM veiculo WHERE id = $1";
            const values = [id];
            const result = await this.connection.query(sql, [id]);
            return result.rows;
        } catch (error) {
            console.log(error)
            return []
        } finally {
            this.connection.end();
            this.connection = null;
        }
    }

    async delete (id: String) {
        try {
            this.connection.connect();
            const sql = "DELETE FROM veiculo WHERE id = $1";
            await this.connection.query(sql, [id])
        } catch (error) {
            console.log(error)
        } finally {
            this.connection.end()
            this.connection = null;
        }
    }
}