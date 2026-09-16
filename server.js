const express = require("express");

const signup = require("./signup");


const login = require("./login");

const app = express();

app.use(express.json());



app.post("/signup", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email password  requried"
        });
    }

    const result = await signup(email, password);

    if (!result.success) {
        return res.status(409).json(result);
    }

    res.status(201).json(result);
});



app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email password are required"
        });
    }

    const result = await login(email, password);

    if (!result.success) {
        return res.status(401).json(result);
    }

    res.status(200).json(result);
});



app.listen(5000, () => {
    console.log("Server running on port 5000");
});
