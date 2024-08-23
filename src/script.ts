/*
import mongoose from "mongoose";
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import User from "./model/User";

dotenv.config();
const app = express();
app.use(express.json());

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

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

    app.get('/', (req: Request, res: Response) => {
        res.status(200).json({ msg: 'Bem vindo ao Banco de Dados' });
    });
    app.post("/auth/register", async (req: Request, res: Response)=> {
        const {name, email, senha} = req.body

    if(!name){
        return res.status(422).json({msg: "O nome é obrigatório"})
    }
    if(!email){
        return res.status(422).json({msg: "O email é obrigatório"})
    }
    const testaUser = await User.findOne({email: email});
        
    if(testaUser != email){
        return res.status(422).json({msg: "Usuário existente"});
    }
    if(!senha){
        return res.status(422).json({msg: "A senha é obrigatória"})
    }
    
    try {
        const novoUsuario = new User({ name, email, senha });
        await novoUsuario.save();
        res.status(201).json({ msg: 'Usuário criado com sucesso!' });
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao criar usuário', error: err });
    }})

    function Login(){
    app.get("/auth/login", async (req: Request, res: Response)=>{
        const {email, senha} = req.body;
        const procUser = await User.where(email).equals(email).where(senha).equals(senha);
        
        if(!procUser){
            res.status(500).json({msg: "Usuário ou senha não coincidem"});
        }
        else{
            res.status(201).json({msg: "Seja bem vindo!"});
        }
    })}*/
        import express, { Request, Response } from 'express';
        import mongoose from 'mongoose';
        import dotenv from 'dotenv';
        import User from "./model/User";
        
        dotenv.config();
        const app = express();
        app.use(express.json());
        
        const dbUser = process.env.DB_USER;
        const dbPassword = process.env.DB_PASS;
        
        // Conexão com o banco de dados MongoDB
        mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@dblogin.cvr34.mongodb.net/?retryWrites=true&w=majority&appName=DBLOGIN`
        ).then(() => {
            console.log('Conectado ao Banco de Dados');
            app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
        }).catch(err => console.error('Erro ao conectar ao banco: ', err));
        
        // Rota para a página inicial
        app.get('/', (req: Request, res: Response) => {
            res.status(200).json({ msg: 'Bem-vindo ao Banco de Dados' });
        });
        
        // Rota de registro de usuário
        app.post("/auth/register", async (req: Request, res: Response) => {
            const { name, email, senha } = req.body;
        
            if (!name) {
                return res.status(422).json({ msg: "O nome é obrigatório" });
            }
            if (!email) {
                return res.status(422).json({ msg: "O email é obrigatório" });
            }
            if (!senha) {
                return res.status(422).json({ msg: "A senha é obrigatória" });
            }
        
            const testaUser = await User.findOne({ email });
        
            if (testaUser) {
                return res.status(422).json({ msg: "Usuário existente" });
            }
        
            try {
                const novoUsuario = new User({ name, email, senha });
                await novoUsuario.save();
                res.status(201).json({ msg: 'Usuário criado com sucesso!' });
            } catch (err) {
                res.status(500).json({ msg: 'Erro ao criar usuário', error: err });
            }
        });
        
        // Rota de login de usuário
        app.post("/auth/login", async (req: Request, res: Response) => {
            const { username, password } = req.body;
        
            const procUser = await User.findOne({ name: username, senha: password });
        
            if (!procUser) {
                return res.status(401).json({ msg: "Usuário ou senha não coincidem" });
            }
        
            res.status(200).json({ msg: "Login bem-sucedido! Seja bem-vindo!" });
        });
