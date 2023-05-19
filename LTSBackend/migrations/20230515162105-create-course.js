'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Course Name',
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull : false,
        defaultValue: 'Course Description',
      },
      status: {
        type: Sequelize.STRING,
        validate: {
          isIn: [['Free', 'Subscription', 'Locked', 'Paid']],
        },
        allowNull: false,
      },
      teacher: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      video_link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};