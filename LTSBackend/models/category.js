// Sequelize model for categories

const { DataTypes } = require('sequelize'); 

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  });

  Category.associate = (models) => {
    Category.hasMany(models.Course, { foreignKey: 'category_id' });
  };

  return Category;
};