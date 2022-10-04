require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const errorHandler = require("./shared/error/errorHandler");

const UserController = require("./controllers/UserController");
const ConsoleController = require("./controllers/ConsoleController");
const JogoController = require("./controllers/JogoController");
const authMiddleware = require("./middlewares/authMiddleware");

app.get("/", (req, res) => {
  return res.json({ message: "Backend 7" });
});

app.post("/user/register", UserController.register);
app.post("/user/authenticate", UserController.authenticate);

app.get("/console", authMiddleware, ConsoleController.index);
app.get("/console/:id", authMiddleware, ConsoleController.show);
app.post("/console", authMiddleware, ConsoleController.store);
app.put("/console/:id", authMiddleware, ConsoleController.update);
app.delete("/console/:id", authMiddleware, ConsoleController.destroy);

app.get("/jogo", authMiddleware, JogoController.index);
app.get("/jogo/:id", authMiddleware, JogoController.show);
app.post("/jogo", authMiddleware, JogoController.store);
app.put("/jogo/:id", authMiddleware, JogoController.update);
app.delete("/jogo/:id", authMiddleware, JogoController.destroy);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
