const pool = require("../config/dataBasePostgres");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async(req, res) => {
    const { name, email, password, address, phoneNumber, role} = req.body;
    try {
        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }

         // Check if user already exists
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO users (name, email, password, address, phoneNumber, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [name, email, hashedPassword, address, phoneNumber, role || "client"]
        );
        // Remove password from response
        const { password: _, ...userWithoutPassword } = result.rows[0];
        return res.status(201).json({
            message: "User registered",
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: "Error creating the user", error: error.message });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        const user = result.rows[0];
        if(!user){
            return res.status(404).json({ message: "User not found" })
        }

        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid){
            return res.status(401).json({ message: "Incorrect password" })
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Login successful", token});
    } catch (error) {
        return res.status(500).json({ message: "Error logging user", error: error.message});
    }
};

exports.obtainUserProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await pool.query
        ("SELECT id, name, email, address, phoneNumber, role FROM users where id = $1",
            [userId]
        );

        if (result.rows.length === 0){
            return res.status(404).json({ message: "User not found"})
        }
        res.status(200).json({ user: result.rows[0]});
    } catch (error){
        res.status(500).json({ message: "Error obtaining the user profile", error: error.message});
    }
};

//Update user profile
exports.updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, email, address, phoneNumber, role } = req.body;
    try {
        if (email) {
            const existingUser = await pool.query(
                "SELECT * FROM users WHERE email = $1 AND id != $2",
                [email, userId]
            );

            if (existingUser.rows.length > 0) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        const result = await pool.query(
            "UPDATE users SET name = $1, email = $2, address = $3, phoneNumber = $4, role = $5 WHERE id = $6 RETURNING id, name, email, address, phonenumber, role",
            [name, email, address, phoneNumber, role, userId]
        );
        if (result.rows.length === 0){
            return res.status(404).json({ message: "User not found"})
        }

        return res.status(200).json({ message: "Profile updated", user: result.rows[0]});
    } catch (error){
        console.log("Profile update error:", error);
        return res.status(500).json({ message: "Error updating the user profile", error: error.message})
    }
};
