const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const path = require("path");

app.use(cors());

app.get("/:link", async (req, res) => {
    const igcRes = await axios.get(req.params.link);
    res.send(igcRes.data);
});

app.use(express.static(path.join(__dirname, "../../build")));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
