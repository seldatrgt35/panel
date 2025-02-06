const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler'); // Örnek hata middleware'i

dotenv.config(); // .env dosyasını yükle

const app = express();

// Middleware'ler
app.use(express.json()); // JSON gövdesini işlemek için
app.use(cors()); // CORS politikası
app.use(helmet()); // Güvenlik başlıkları ekler

// Auth routes (Register / Login)
app.use('/auth', authRoutes);

// API genel hata yönetimi middleware'i
app.use(errorHandler);

// Veritabanı bağlantısı
sequelize.sync()
    .then(() => console.log('✅ Veritabanı Bağlantısı Başarılı'))
    .catch(err => console.error('❌ Veritabanı Bağlantı Hatası:', err));

// Ana route
app.get('/', (req, res) => {
    res.send('🚀 API Çalışıyor!');
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server ${PORT} portunda çalışıyor`));
