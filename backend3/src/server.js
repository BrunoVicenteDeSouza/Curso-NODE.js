const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const clientesController = require("./controllers/clientesController");
const computadoresController = require("./controllers/computadoresController");
const monitoresController = require("./controllers/monitoresController");

app.get("/", (req, res) => {
  res.send("Aula 2");
});

app.get("/clientes", clientesController.index);
app.post("/clientes", clientesController.store);
app.put("/clientes/:id", clientesController.update);
app.delete("/clientes/:id", clientesController.destroy);

app.get("/computadores", computadoresController.index);
app.post("/computadores", computadoresController.store);
app.put("/computadores/:id", computadoresController.update);
app.delete("/computadores/:id", computadoresController.destroy);

app.get("/monitores", monitoresController.index);
app.post("/monitores", monitoresController.store);
app.put("/monitores/:id", monitoresController.update);
app.delete("/monitores/:id", monitoresController.destroy);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
