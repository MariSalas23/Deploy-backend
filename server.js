const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true })); // Para acceder al body
app.use(express.json());

// Routes
const coinsRouter = require("./routes/coins");
app.use("/coins", coinsRouter);
app.use(logger);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
app.use(logger);

// URL - Callback
app.get("/", customLogger, (req, res) => {
    res.send("¡Bienvenido!<br><br>Busca el valor de una moneda. Por ejemplo: https://parcial-segundo-corte-five.vercel.app/coins/bitcoin<br>Busca en una lista de nombres. Por ejemplo: https://parcial-segundo-corte-five.vercel.app/users/10?sort=DESC<br>Crea un usuario con: https://parcial-segundo-corte-five.vercel.app/users");
  });  

// Ruta para cualquier otra URL
app.get("*", (req, res) => {
    res.send("Ruta no encontrada. Prueba con: /coins/bitcoin");
  });

// Middleware
function logger(req, res, next) {
  console.log(req.originalUrl + "from logger");
  next();
}

function customLogger(req, res, next) {
  console.log(req.originalUrl + "from custom logger");
  next();
}

// Para las pruebas
app.listen(3000, () => {
    console.log("Server running on port 3000");
});