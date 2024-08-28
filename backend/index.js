const express = require('express');
const { PrismaClient } = require('@prisma/client');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next();
});

app.get('/test', async(req, res) => {
    try {
        res.status(200).json({message: 'API is working'});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

app.get('/users', async(req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

app.get('/users/:id', async(req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});