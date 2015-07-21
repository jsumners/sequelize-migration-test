'use strict';

let sq = {};
let DT = {};
let Role = {};

function associate(models) {}

module.exports = function(sequelize, DataTypes) {
  sq = sequelize;
  DT = DataTypes;

  const modelDescription = {
    id: {
      type: DT.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DT.STRING,
      unique: true
    }
  };

  const modelOptions = {
    classMethods: {
      associate: associate
    },
    comment: 'Roles that can be used for permissions'
  };

  Role = sequelize.define('Role', modelDescription, modelOptions);
  return Role;
};