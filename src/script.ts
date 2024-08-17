// Abre a rota pública
import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';



dotenv.config();

const app = express();
app.use(express.json());
//import User from './model/User';
import User from './User';
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;


    app.get('/', (req: Request, res: Response) => {
        res.status(200).json({ msg: 'Bem vindo ao Banco de Dados' });
    });
    app.post("/auth/register", async (req: Request, res: Response)=> {
        const {name, email, senha} = req.body

    //validações de dados
    if(!name){
        return res.status(422).json({msg: "O nome é obrigatório"})
    }
    if(!email){
        return res.status(422).json({msg: "O email é obrigatório"})
    }
    if(!senha){
        return res.status(422).json({msg: "A senha é obrigatória"})
    }
    })
    const novoUsuario = new User({
        nome: 'Ryan',
        email: 'ryan@gmail.com',
        senha: 'rakjf'
    })
    novoUsuario.save()
        .then(() =>
        console.log('Usuario salvo'));
    try {
        mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@dblogin.cvr34.mongodb.net/?retryWrites=true&w=majority&appName=DBLOGIN`
        );
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
        console.log('Conectou ao Banco');
    } catch (err) {
        console.error('Erro ao conectar ao banco: ', err);
    }
