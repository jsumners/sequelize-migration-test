'use strict';

let sq = {};
let DT = {};
let Person = {};

function associate(models) {
  const Role = model.Role;
  Person.belongsToMany(Role, {through: 'PersonRoles'});
  Role.belongsToMany(Person,  {through: 'PersonRoles'});
}

module.exports = function(sequalize, DataTypes) {
  sq = sequalize;
  DT = DataTypes;

  const validNameChars = /[a-z\s']/i;

  const modelDescription = {
    id: {
      type: DT.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    givenName: {
      type: DT.STRING,
      allowNull: false,
      validate: {
        is: validNameChars
      }
    },
    surName: {
      type: DT.STRING,
      allowNull: false,
      validate: {
        is: validNameChars
      }
    },
    email: {
      type: DT.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DT.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true
      }
    }
  };

  const modelOptions = {
    classMethods: {
      associate: associate
    }
  };

  Person = sq.define('Person', modelDescription, modelOptions);
  return Person;
};
