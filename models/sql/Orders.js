import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/dbMySql.js';

export const Order = sequelize.define('Order', {
  userId: { type: DataTypes.STRING, allowNull: false },
  total: { type: DataTypes.FLOAT, allowNull: false }
}, {
  indexes: [
    {
      fields: ['userId']
    }
  ]
});
