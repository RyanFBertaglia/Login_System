import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// Abre a rota pública
async function opennet() {
    app.get('/', (req: Request, res: Response) => {
        res.status(200).json({ msg: 'Bem vindo ao Banco de Dados' });
    });

    try {
        await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@dblogin.cvr34.mongodb.net/?retryWrites=true&w=majority&appName=DBLOGIN`
        );
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
        console.log('Conectou ao Banco');
    } catch (err) {
        console.error('Erro ao conectar ao banco: ', err);
    }
}

opennet();
