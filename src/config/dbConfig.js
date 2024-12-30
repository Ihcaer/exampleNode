import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_NAME, process.env.DB_PASSWD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  timezone: 'Europe/Warsaw',
});

export default sequelize;
