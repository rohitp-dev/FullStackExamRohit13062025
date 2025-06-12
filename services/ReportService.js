import { sequelize } from '../config/dbMySql.js';
import { Product } from '../models/mongo/Product.js';

export async function getDailyRevenue() {
  const [results] = await sequelize.query(`
    SELECT DATE(createdAt) as date, SUM(total) as revenue
    FROM Orders
    WHERE createdAt >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY DATE(createdAt)
    ORDER BY date DESC
  `);
  return results;
}

export async function getTopSpenders() {
  const [results] = await sequelize.query(`
    SELECT userId, SUM(total) as totalSpent
    FROM Orders
    GROUP BY userId
    ORDER BY totalSpent DESC
    LIMIT 3
  `);
  return results;
}

export async function getSalesByCategory() {
  const result = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        totalProducts: { $sum: 1 },
        totalStock: { $sum: '$stock' }
      }
    },
    { $sort: { totalStock: -1 } }
  ]);

  return result;
}
