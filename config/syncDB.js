import { sequelize } from './dbMySql.js';

export async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced!');
  } catch (err) {
    console.error('Failed to sync database:', err);
    throw err;
  }
}
