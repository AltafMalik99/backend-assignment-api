const fs = require("fs");
const bcrypt = require("bcrypt");

const filePath = "./users.json";

async function signup(email, password) {

    const data = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(data);

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return {
            success: false,
            message: "Email already exist"
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: Date.now(),
        email: email,
        password: hashedPassword
    };

    users.push(newUser);

    fs.writeFileSync(
        filePath,
        JSON.stringify(users, null, 2)
    );

    return {
        success: true,
        message: "User registered successfully"
    };
}

module.exports = signup;
