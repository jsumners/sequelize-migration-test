'use strict';

let config = {};

const db        = {};
const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';

function loaderPromise(resolve, reject) {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );

  fs.readdir(__dirname, function dirRead(err, files) {
    if (err) {
      return reject(err);
    }

    for (let f of files) {
      // Import all model files in the models directory
      if (f.slice(-3) !== '.js' ||
          path.basename(f) === basename ||
          f.indexOf('.') === 0)
      {
        continue;
      }

      const model = sequelize.import(path.join(__dirname, f));
      db[model.name] = model;
    }

    for (let m of Object.keys(db)) {
      // Run model associations if a model has an association method
      if ('associate' in db[m]) {
        db[m].associate(db);
      }
    }

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return resolve(db);
  });
}

module.exports = function modelLoader($config) {
  if (!$config) {
    throw new Error('Must supply a configuration object');
  }

  if (!$config[env]) {
    throw new Error(`Configuration object must have a '${env}' property`);
  }

  config = $config[env];

  return new Promise(loaderPromise);
};
