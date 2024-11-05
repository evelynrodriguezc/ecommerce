const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secure_key_jwt";

//register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, address, phoneNumber } = req.body;

        //verifies if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //hash the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        //create a new user
        const newUser = new User({
            name,
            email,
            password: encryptedPassword,
            address,
            phoneNumber
        });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

//login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //verify if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //verify the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};