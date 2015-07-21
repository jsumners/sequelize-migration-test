'use strict';

const _ = require('sequelize').Utils._;
let $config = require('./config/config.json');

exports = module.exports = function init(config) {
  $config = _.merge($config,  config || {});
  return require('./models')($config);
};

exports().then(function resolved(db) {
  db.Role.create({name: 'foobar'}).then(console.log);
});