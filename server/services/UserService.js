const User = require("../models/User")
const jwt = require("jsonwebtoken")

class UserService {
    static async signup(name, email, password, role) {
        const existingUser = await User.getUserByEmail(email);
        
        if (existingUser) throw new Error("Email already registered");
        
        if (role != 'user' && role != 'organizer' && role != 'admin')
            throw new Error("Invalid role");

        const userId = await User.createUser(name, email, password, role);
        const token = jwt.sign({ userId, role }, process.env.SECRET_KEY, {expiresIn: '1h'} );
        return token;
    }

    static async signin(email, password) {
        const user = await User.getUserByEmail(email);
        if (!user) throw new Error("Invalid email or password");
        
        const validPassword = await User.validatePassword(password, user.password);
        if(!validPassword) throw new Error("Invalid email or password");

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY, {expiresIn: '1h'});
        return token;
    }
}

module.exports = UserService