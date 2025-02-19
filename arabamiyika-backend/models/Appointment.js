const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");

const Appointment = sequelize.define("Appointment", {
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "completed"),
        defaultValue: "pending",
    },
    service: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Appointment.belongsTo(Customer); // Appointment bir müşteriye bağlı
module.exports = Appointment;
