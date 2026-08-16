const fs = require("fs");
const bcrypt = require("bcrypt");

const filePath = "./users.json";

async function signup(email, password) {

    // users.json read karo
    const data = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(data);

    // Sirf same email check karo
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return {
            success: false,
            message: "Email already exists"
        };
    }

    // Password hash karo
    const hashedPassword = await bcrypt.hash(password, 10);

    // Naya user
    const newUser = {
        id: Date.now(),
        email: email,
        password: hashedPassword
    };

    // Purane users ko rakho + naya user add karo
    users.push(newUser);

    // File mein save karo
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