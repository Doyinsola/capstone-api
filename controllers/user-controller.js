const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

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

        const isMatch = await bcrypt.compare(password, userData.password)
        console.log(isMatch);
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

}

module.exports = {
    loginUser,
    getUser,
}