'use strict';

module.exports = {
  up: function (queryInterface, DT) {
    return queryInterface
      .createTable(
        'Persons',
        {
          id: {
            type: DT.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          givenName: {
            type: DT.STRING,
            allowNull: false
          },
          surName: {
            type: DT.STRING,
            allowNull: false
          },
          email: {
            type: DT.STRING,
            allowNull: false,
            unique: true
          },
          username: {
            type: DT.STRING,
            allowNull: false,
            unique: true
          },
          createdAt: {
            type: DT.DATE,
            allowNull: false
          },
          updatedAt: {
            type: DT.DATE,
            allowNull: false
          }
        }
      );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Persons');
  }
};
