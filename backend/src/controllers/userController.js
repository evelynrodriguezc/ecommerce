const User = require("../config/dataBasePostgres");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.createUser = async(req, res) => {
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

exports.login = async (req, res) => {
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
        res.status(500).join({ message: "Error creating the user", error: error.message})
    }
};

exports.obtainUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Error when obtaining users", error: error.message});
    }
};

exports.getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Error when obtaining user", error: error.message});
    }
};

exports.updateUser = async(req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: "Error when updating user", error: error.message});
    }
};

exports.deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error when deleting user", error: error.message});
    }
};