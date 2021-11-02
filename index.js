const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { signUpValidation, encryptPassword } = require("./helpers")

const app = express();

app.use(express.json())

const users = [];

app.post('/auth/register', async (req, res) => {
    const { error } = signUpValidation(req.body);
  
    if (error) return res.status(400).send({ message: error.details[0].message });
  
    const id = uuidv4();
  
    const { email, username, password, confirmpassword } = req.body;
    console.log(req.body)

    if(password !== confirmpassword) return res.status(203).send({ message: "Password mismatch" })
  
    const pass = await encryptPassword(password);
  
    try {
      users.push({id, email, username, pass});
  
      res.status(201).send({ message: "User registered successfully" });
      console.log(users);
    } catch (err) {
      res.status(500).send({ message: "Internal Server Error" });
    }
});

app.get('/users', (req, res) => {
    res.send({users});
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App running on port:${PORT}`)
})