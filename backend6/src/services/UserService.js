const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async generateHash(value) {
        return await bcrypt.hash(value, 8);
    },

    async compareHash(password, hashPassword) {
        return await bcrypt.compare(password, hashPassword);
    },

    generateToken(user) {
        return jwt.sign({ id: user.id }, process.env.JWT_KEY, {
            expiresIn: '1d'
        })
    }
}