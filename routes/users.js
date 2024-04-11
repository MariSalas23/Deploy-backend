const express = require("express");
const usersInfo = require("../assets/names");
const router = express.Router();

// /users
router.post("/", (req, res) => {
    const {name,lastName,email,city="Bogotá",country="Colombia"} = req.body;
    if (!name || !lastName || !email) {
        return res.send("Los campos de nombre, apellido y correo electrónico son obligatorios. Ciudad y país opcionales.");
    }

    const user = {
        name,
        lastName,
        email,
        city,
        country
    };
    usersInfo.push(user);
    res.json(user);
});

// /count?sort=ASC|DESC
router.get("/:count", async (req, res) => {
    const count = parseInt(req.params.count);
    const sort = req.query.sort || "ASC";

    // Validar cont y sort
    if (count <= 0 || count >= 30 || isNaN(count)) {
        return res.send("Cont debe ser un número de 1 a 29.");
    }
    if (sort !== "ASC" && sort !== "DESC") {
        return res.send("Sort debe ser 'ASC' o 'DESC'.");
    }

    // Mostrar la lista de nombres
    let listUsers = usersInfo.slice();
    if (sort === "ASC") {
        // A a Z
        listUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
    } else {
        // Z a A
        listUsers.sort((a, b) => b.lastName.localeCompare(a.lastName));
    }

    listUsers = listUsers.slice(0, count).map(user => `${user.lastName} ${user.name}`);
    res.send(listUsers);
});

module.exports = router;