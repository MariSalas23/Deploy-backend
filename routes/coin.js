const express = require("express");
const axios = require("axios");

const router = express.Router();

// /coin
router.get("/", (req, res) => {
    res.send("Busca una moneda. Prueba con: /coin/bitcoin");
});

// /coin/coinName
router.get("/:coinName", async (req, res) => {
  const coinName = req.params.coinName.toLowerCase();

  // Fetch de la API de monedas
  try {
    const response = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`);
    const data = response.data;
    if (data.data) {
        const price = data.data.priceUsd;
        res.send(`El precio en dólares de la moneda para el día de hoy es ${price}`);
    }
    else {
        res.send(`El nombre de la moneda no fue encontrado en la base de datos`);
    }
  } 

  catch (error) {
    console.error('Error consultando la API', error);
    res.send('El nombre de la moneda no fue encontrado en la base de datos');
  }
});

module.exports = router;