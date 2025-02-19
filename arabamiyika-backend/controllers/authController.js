const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const User = require('../models/User');
require('dotenv').config();

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Kullanıcı bulunamadı.' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Geçersiz şifre.' });
        }

        const payload = { id: user.id, email: user.email };
        const token = jwt.encode(payload, process.env.JWT_SECRET);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Sunucu hatası.' });
    }
};

module.exports = { login };
