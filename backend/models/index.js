const Business = require("./Business");
const User = require("./User");
const Customer = require("./Customer");
const Appointment = require("./Appointment");
const Service = require("./Service");

// İlişkiler
Business.hasMany(User, { onDelete: "CASCADE" }); // İşletmenin birden fazla kullanıcısı olabilir
User.belongsTo(Business); // Her kullanıcı bir işletmeye bağlıdır

Business.hasMany(Service, { onDelete: "CASCADE" }); // İşletmenin sunduğu birçok hizmet olabilir
Service.belongsTo(Business); // Her hizmet bir işletmeye aittir

Business.hasMany(Appointment, { onDelete: "CASCADE" }); // İşletmenin birden fazla randevusu olabilir
Appointment.belongsTo(Business); // Her randevu bir işletmeye aittir

Customer.hasMany(Appointment, { onDelete: "CASCADE" }); // Her müşteri birden fazla randevuya sahip olabilir
Appointment.belongsTo(Customer); // Her randevu bir müşteriye bağlıdır

module.exports = { Business, User, Customer, Appointment, Service };
