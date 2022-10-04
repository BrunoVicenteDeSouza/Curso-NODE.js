require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

const UserController = require("./controllers/UserController");
const ConsolesController = require("./controllers/ConsolesController");
const JogosController = require("./controllers/JogosController");
const authMiddleware = require("./middlewares/authMiddleware");

app.get("/", (req, res) => {
  return res.json({ message: "Backend 6" });
});

app.post("/user/register", UserController.register);
app.post("/user/authenticate", UserController.authenticate);

app.get("/consoles", authMiddleware, ConsolesController.index);
app.get("/consoles/:id", authMiddleware, ConsolesController.show);
app.post("/consoles", authMiddleware, ConsolesController.store);
app.put("/consoles/:id", authMiddleware, ConsolesController.update);
app.delete("/consoles/:id", authMiddleware, ConsolesController.destroy);

app.get("/jogos", authMiddleware, JogosController.index);
app.get("/jogos/:id", authMiddleware, JogosController.show);
app.post("/jogos", authMiddleware, JogosController.store);
app.put("/jogos/:id", authMiddleware, JogosController.update);
app.delete("/jogos/:id", authMiddleware, JogosController.destroy);

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
