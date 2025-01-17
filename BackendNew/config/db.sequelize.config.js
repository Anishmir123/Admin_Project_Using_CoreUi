const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        timezone: '+05:30',
    }
);

sequelize.authenticate().then(() => {
  console.log('Connected to MySQL database.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;
