const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const PCController = require('./controllers/PCController');
const ComponentesController = require('./controllers/ComponentesController');
const VendaController = require('./controllers/VendaController');

app.get('/', (req, res) => {
    res.json({ message: 'Aula 5 reborn'})
});

app.get('/Componentes', ComponentesController.index);
app.get('/Componentes/:id', ComponentesController.show);
app.post('/Componentes', ComponentesController.store);
app.put('/Componentes/:id', ComponentesController.update);
app.delete('/Componentes/:id', ComponentesController.destroy);

app.get('/PC', PCController.index);
app.get('/PC/:id', PCController.show);
app.post('/PC', PCController.store);
app.put('/PC/:id', PCController.update);
app.delete('/PC/:id', PCController.destroy);

app.get('/Venda', VendaController.index);
app.get('/Venda/:id', VendaController.show);
app.post('/Venda', VendaController.store);
app.put('/Venda/:id', VendaController.update);
app.delete('/Venda/:id', VendaController.destroy);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});