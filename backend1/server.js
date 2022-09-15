const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Aula 1');
});

app.get('/nomecompleto', (req, res) =>{
    const nome = (req.query.nome);
    const sobrenome = (req.query.sobrenome);
    const nomecompleto = `${nome} ${sobrenome}`;

    res.send(`O nome completo é ${nomecompleto}`);
});

app.get('/multiplicacao', (req, res) =>{
    const num1 = parseInt(req.query.num1);
    const num2 = parseInt(req.query.num2);
    const num3 = parseInt(req.query.num3);
    const resultado = num1 * num2 * num3;

    res.send(`O Resultado é ${resultado}`);
});

app.get('/maior', (req, res) =>{
    const num1 = parseInt(req.query.num1)
    const num2 = parseInt(req.query.num2)
    const maior = Math.max(num1, num2)

    res.send(`O Maior é ${maior}`);
});

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`)
});