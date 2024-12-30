import sequelize from '../config/dbConfig.js';

export default class Database {
  static async initialize() {
    await this.testConnecion();
    await this.sync();
  }

  static async testConnecion() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  static async sync() {
    try {
      await sequelize.sync();
      console.log('The database has been synced successfully.');
    } catch (error) {
      console.error('Unable to sync the database:', error);
    }
  }
}
