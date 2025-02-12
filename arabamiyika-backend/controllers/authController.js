const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Kullanıcı girişi
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kullanıcıyı veritabanından bulma
        const user = await User.findOne({
            where: { email },
            attributes: ['id', 'email', 'password']  // Gereksiz alanları dışarda bırakabilirsiniz
        });

        if (!user) {
            return res.status(400).json({ message: 'Kullanıcı bulunamadı!' });
        }

        // Şifreyi doğrulama
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Şifre hatalı!' });
        }
        console.log('Veritabanına gönderilen email:', email);

        const jwt = require('jsonwebtoken');

        // JWT token oluşturma
        const token = jwt.sign(
            { userId: user.id, email: user.email },    // Payload
            process.env.JWT_SECRET,                 // Çevresel değişkenden güvenli anahtar
            { expiresIn: '1h' }                        // Token geçerlilik süresi
        );


        // Token'ı kullanıcıya gönderme
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Sunucu hatası!', details: error.message });
    }
};
