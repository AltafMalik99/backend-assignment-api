const fs = require("fs");
const bcrypt = require("bcrypt");

const filePath = "./users.json";

async function login(email, password) {

    // Users file read karo
    const data = fs.readFileSync(filePath, "utf-8");

    const users = JSON.parse(data);

    // Email se user find karo
    const user = users.find(user => user.email === email);

    // Agar user nahi mila
    if (!user) {
        return {
            success: false,
            message: "Invalid email or password"
        };
    }

    // Password compare karo
    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    // Password wrong hai
    if (!passwordMatch) {
        return {
            success: false,
            message: "Invalid email or password"
        };
    }

    // Login successful
    return {
        success: true,
        message: "Login successful"
    };
}

module.exports = login;