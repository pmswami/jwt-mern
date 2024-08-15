const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // console.log(name, email);
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exist, you can login", success: false });
        }
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201).json({ messsage: "Signup Successful", success: true });
    }
    catch (err) {
        // console.log(err);
        res.status(500).json({ messsage: "Internal Server Error Occurred", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(name, email);
        const user = await UserModel.findOne({ email });
        const message = "Auth Failed Email or password is wrong";
        if (!user) {
            return res.status(403).json({ message: "User does not Exist", success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: "Email or password is wrong", success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        return res.status(200).json({
            messsage: "Login Successful",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    }
    catch (err) {
        // console.log(err);
        res.status(500).json({ messsage: "Internal Server Error Occurred", success: false });
    }
};
module.exports = {
    signup, login
};