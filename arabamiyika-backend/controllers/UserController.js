const { User, Business } = require("../models");
const bcrypt = require("bcrypt");

// Kullanıcı Girişi
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const business = await Business.findByPk(user.BusinessId);
        res.json({ user, business });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
