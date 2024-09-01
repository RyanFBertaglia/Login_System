import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import User from "./model/User";
import cors from 'cors';
import bcrypt from 'bcrypt';

dotenv.config();
const app = express();
app.use(cors());
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

}catch (err){
    console.error('Erro ao conectar ao banco: ', err);
};
    app.post("/auth/register", async (req: Request, res: Response)=> {
        const {name, email, senha} = req.body
    if(!name){
        return res.status(422).json({msg: "O nome é obrigatório"});
    }
    if(!email){
        return res.status(422).json({msg: "O email é obrigatório"});
    }

    const testaUser = await User.findOne({ email });
        if (testaUser) {
            return res.status(422).json({ msg: "Usuário existente" });
        }

    if(!senha){
        return res.status(422).json({msg: "A senha é obrigatória"});
    }
    
    try{
        const novoUsuario = new User({ name, email, senha });
        await novoUsuario.save();
        res.status(201).json({ msg: 'Usuário criado com sucesso!' });
    }catch (err){
        res.status(500).json({ msg: 'Erro ao criar usuário', error: err });
    }});


    app.post("/auth/login", async (req: Request, res: Response)=>{
        const {email, senha} = req.body;
        const procUser = await User.findOne({'email': req.body.email});
        const temNoBancoOuNão = await bcrypt.compare(req.body.senha, procUser.senha);
        if(!temNoBancoOuNão){
            return res.status(422).json({ msg: "Usuário ou senha não coincidem" });
        }
        else{
            res.status(201).json({msg: "Seja bem vindo!"});
        }
    })

