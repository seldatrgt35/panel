const express = require("express");
const sequelize = require("./config/database");
const routes = require("./routes");

const app = express();

// Body parser yerine express.json() ve express.urlencoded() kullan
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes); // Tüm rotalar "/api" altına bağlanacak

// Veritabanını Senkronize Et ve Sunucuyu Başlat
sequelize.sync({ force: false }).then(() => {
    console.log("Database connected.");
    app.listen(5000, () => {
        console.log("Server is running on http://localhost:5000");
    });
});
