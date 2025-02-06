const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    businessName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    businessEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    businessPhone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    businessAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    referanceCode: {
        type: DataTypes.STRING,
        unique: true,
    },
}, {
    hooks: {
        // Şifreyi hash'lemeden kaydetme
        beforeSave: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10); // 10 salt rounds
            }
        }
    }
});

module.exports = User;
