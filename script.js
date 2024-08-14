import mongoose from "mongoose";
import express, {Request, Response } from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

//Abre a rota pública
app.get('/', (req, res) => {
    res.status(200).json({msg: 'Bem vindo ao Banco de Dados'})
})

mongoose
    .connect('mongodb+srv://ryanfernandesbertaglia:${dbPassword}@dblogin.cvr34.mongodb.net/?retryWrites=true&w=majority&appName=DBLOGIN'
    )
    .then(() => {
        app.listen(3000)
        console.log('Conectou ao Banco')
    })
    .catch((err) => console.log('err'))