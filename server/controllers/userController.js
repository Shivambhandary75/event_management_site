const UserService = require("../services/UserService");

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const token = await UserService.signup(name, email, password, role);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await UserService.signin(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    signup,
    signin,
};
