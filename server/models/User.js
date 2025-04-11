const db = require("../utils/db");
const bcrypt = require("bcrypt");

class User {
    static async createUser(name, email, password, role) {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const query = "INSERT INTO users SET ?"
            const user = {
                name,
                email,
                password: hashedPassword,
                role
            };
            const [result] = await db.query(query, user);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByEmail(email) {
        try {
            const query = "SELECT * FROM users WHERE email = ?";
            const [result] = await db.query(query, email);
            return result[0];
        } catch (error) {
            throw error;
        }
    }

    static async validatePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    static async getUserRoleById(userId) {
        try {
            const query = "SELECT role FROM users WHERE id = ?";
            const [result] = await db.query(query, userId);
            return result[0].role;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User