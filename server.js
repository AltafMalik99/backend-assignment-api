const express = require("express");

const signup = require("./signup");
const login = require("./login");

const app = express();

app.use(express.json());


// ================= SIGNUP =================

app.post("/signup", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const result = await signup(email, password);

    if (!result.success) {
        return res.status(409).json(result);
    }

    res.status(201).json(result);
});


// ================= LOGIN =================

app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const result = await login(email, password);

    if (!result.success) {
        return res.status(401).json(result);
    }

    res.status(200).json(result);
});


// ================= SERVER =================

app.listen(5000, () => {
    console.log("Server running on port 5000");
});