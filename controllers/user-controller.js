const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

function isValidEmail(email) {
    if (!email.includes('@') || !email.includes('.')) {
        return false;
    }

    if (email.lastIndexOf('.') <= email.indexOf('@')) {
        return false;
    }

    const atIndex = email.indexOf('@');
    if (email[atIndex - 1] === ' ' || email[atIndex + 1] === ' ') {
        return false;
    }

    if (atIndex === 0 || email.lastIndexOf('.') === email.length - 1) {
        return false;
    }
    return true;
}



const signUpUser = async (req, res) => {
    let { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).send("Please enter the required fields");
    };

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Please input a valid email." });
    }

    password = bcrypt.hashSync(password, 10);
    const newUser = {
        first_name,
        last_name,
        email,
        password
    };

    try {
        await knex("user")
            .insert(newUser);

        res.status(201).send("User registered successfully!");
    } catch (error) {
        console.log(error);
        res.status(400).send("User registration failed!");
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Please enter the required fields" });
    }
    try {
        const userData = await knex("user")
            .where("user.email", email)
            .first();

        if (!userData) {
            return res.status(404).json({
                message: `User with email ${email} not found`
            });
        }

        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(400).send("Invalid password");
        };

        const token = jwt.sign(
            { id: userData.id, email: userData.email }, process.env.SECRET_KEY, { expiresIn: "1h" }
        )
        res.status(201).send({ token });
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Error logging in user' })
    }
};

const getUser = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Please log in");
    };

    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];
    console.log(authHeader)
    try {
        const decodeToken = jwt.verify(authToken, process.env.SECRET_KEY);

        const user = await knex("user").where({ id: decodeToken.id }).first();
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(401).send("Invalid auth token");
    }
}

module.exports = {
    signUpUser,
    loginUser,
    getUser,
}