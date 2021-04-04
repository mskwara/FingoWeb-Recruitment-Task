const express = require("express");
const app = express();
const port = 8000;
const axios = require("axios");
const cors = require("cors");

app.use(cors());

app.get("/:link", async (req, res) => {
    const igcRes = await axios.get(req.params.link);
    res.send(igcRes.data);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
