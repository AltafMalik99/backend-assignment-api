const fs = require("fs");
const bcrypt = require("bcrypt");

const filePath = "./users.json";

async function login(email, password) {
    

    const data = fs.readFileSync(filePath, "utf-8");

    const users = JSON.parse(data);

    const user = users.find(user => user.email === email);

    if (!user) {
        return {
            
            success: false,
            message: "Invalid email or password"
        };
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        return {
            success: false,
            message: "Invalid email or password"
        };
    }

    return {
        success: true,
        message: "Login successful"
    };
}

module.exports = login;
