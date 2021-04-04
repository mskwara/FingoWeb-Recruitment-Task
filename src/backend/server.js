const express = require("express");
const app = express();
const port = 8000;
const fetch = require("node-fetch");
const cors = require("cors");

app.use(cors());

app.get("/:link", async (req, res) => {
    const igcData = await (await fetch(req.params.link)).text();
    res.send(igcData);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
