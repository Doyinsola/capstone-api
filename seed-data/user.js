const bcrypt = require('bcrypt');
module.exports = [
    {
        id: 1,
        first_name: "Jude",
        last_name: "Abaga",
        email: "jabaga@test.com",
        password: bcrypt.hashSync("1ncr3d!Ble", 10)
    },
    {
        id: 2,
        first_name: "Harry",
        last_name: "Potter",
        email: "chosen_one@test.com",
        password: bcrypt.hashSync("wh0L!v3d", 10)
    },
    {
        id: 3,
        first_name: "Jack",
        last_name: "Sparrow",
        email: "blackpearl@test.com",
        password: bcrypt.hashSync("Rumdr1nk3r", 10)
    },
    {
        id: 4,
        first_name: "Merdith",
        last_name: "Grey",
        email: "grey.mer@gmail.com",
        password: bcrypt.hashSync("ch00s3m3", 10)
    },
    {
        id: 5,
        first_name: "Derek",
        last_name: "Shepherd",
        email: "mcdreamy@gmail.com",
        password: bcrypt.hashSync("Br@!nguy", 10)
    },
    {
        id: 6,
        first_name: "Gregory",
        last_name: "House",
        email: "biggreg@test.com",
        password: bcrypt.hashSync("l0v3sCuddy!", 10)
    },
]