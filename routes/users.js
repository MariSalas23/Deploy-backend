const express = require("express");
const usersData = require("../assets/names");
const router = express.Router();

// /users
router.get("/", async (req, res) => {
    return res.send("Crear usuario");
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
    let listUsers = usersData.slice();
    if (sort === "ASC") {
        // A a Z
        listUsers.sort((a, b) => (a.surname > b.surname ? 1 : -1));
    } else {
        // Z a A
        listUsers.sort((a, b) => (a.surname < b.surname ? 1 : -1));
    }

    listUsers = listUsers.slice(0, count).map(user => `${user.surname} ${user.name}`);
    res.send(listUsers);
});

module.exports = router;