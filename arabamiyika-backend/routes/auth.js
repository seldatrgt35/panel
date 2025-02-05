const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// 📌 Kullanıcı Kayıt Olma (Register)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Kullanıcı zaten var mı?
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Bu e-posta zaten kullanılıyor.' });
        }

        // Şifreyi hashleyelim
        const hashedPassword = await bcrypt.hash(password, 10);

        // Kullanıcıyı veritabanına ekleyelim
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.json({ message: 'Kullanıcı başarıyla oluşturuldu!', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// 📌 Kullanıcı Giriş Yapma (Login)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcı var mı?
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
        }

        // Şifre kontrolü
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
        }

        // JWT Token oluştur
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Giriş başarılı!', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

module.exports = router;
