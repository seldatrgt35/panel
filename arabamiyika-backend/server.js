const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/auth', authRoutes); // Auth (Register/Login)
sequelize.sync()
    .then(() => console.log('✅ Veritabanı Bağlantısı Başarılı'))
    .catch(err => console.error('❌ Veritabanı Bağlantı Hatası:', err));

app.get('/', (req, res) => {
    res.send('🚀 API Çalışıyor!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server ${PORT} portunda çalışıyor`));
