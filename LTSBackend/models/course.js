// sequelize model for courses

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Course Name',
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull : false,
      defaultValue: 'Course Description',
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['Free', 'Subscription', 'Locked', 'Paid']],
      },
      allowNull: false,
    },
    teacher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Course.associate = (models) => {
    Course.belongsTo(models.Category, { foreignKey: 'category_id' });
  };

  return Course;
};
