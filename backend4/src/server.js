const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const ClientesController = require("./controllers/ClientesController");
const ComputadoresController = require("./controllers/ComputadoresController");
const MonitoresController = require("./controllers/MonitoresController");

app.get('/', (req, res) => {
    res.json({ message: 'Aula 4' });
});

app.get('/clientes', ClientesController.index);
app.get('/clientes/:id', ClientesController.show);
app.post('/clientes', ClientesController.store);
app.put('/clientes/:id', ClientesController.update);
app.delete('/clientes/:id', ClientesController.destroy);

/////////////////////////////////////////////////////////////

app.get('/computadores', ComputadoresController.index);
app.get('/computadores/:id', ComputadoresController.show);
app.post('/computadores', ComputadoresController.store);
app.put('/computadores/:id', ComputadoresController.update);
app.delete('/computadores/:id', ComputadoresController.destroy);
///////////////////////////////////////////////////////////

app.get('/monitores', MonitoresController.index);
app.get('/monitores/:id', MonitoresController.show);
app.post('/monitores', MonitoresController.store);
app.put('/monitores/:id', MonitoresController.update);
app.delete('/monitores/:id', MonitoresController.destroy);


app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`)
});