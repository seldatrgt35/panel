const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Kullanıcı girişi
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kullanıcıyı veritabanından bulma
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Kullanıcı bulunamadı!' });
        }

        // Şifreyi doğrulama
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Şifre hatalı!' });
        }

        // JWT token oluşturma
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY, // Çevre değişkeni ile güvenlik sağlanır
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası!' });
    }
};
