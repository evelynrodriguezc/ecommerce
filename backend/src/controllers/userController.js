const User = require("../config/dataBasePostgres");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.registerUser = async(req, res) => {
    const { name, email, password, address, phoneNumber, role} = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await pool.query(
            "INSERT INTO users (name, email, password, address, phoneNumber, role) VALUES ($1, $2. $3, $4, $5, $6) RETURNING *",
            [name, email, password, address, phoneNumber, role || "client"]
        )
        res.status(201).json({ message: "User registered", user: result.rows[0]})
    } catch (error) {
        res.status(500).json({message: "Error creating the user", error: error.message});
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [correo])
        const user = result.rows[0]

        if(!user){
            return res.status(404).json({ message: "User not found" })
        }

        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid){
            return res.status(401).json({ message: "Incorrect password" })
        }

        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(200).json({ message: "Login successful", token})
    } catch (error) {
        res.status(500).join({ message: "Error login user", error: error.message})
    }
};

exports.obtainUserProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await pool.query
        ("SELECT ID, name, email, address, phoneNumber, role FROM users where id = $1", [userId])

        if (result.rows.length === 0){
            return res.status(400).json({ message: "User not found"})
        }
        res.status(500).json({ user: result.row[0]});
    } catch (error){
        res.status(500).json({ message: "Error obtaining the user profile", error: error.message})
    }
}
