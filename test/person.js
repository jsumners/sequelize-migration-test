'use strict';

const Lab = require('lab');
const Code = require('code');
const lab = exports.lab = Lab.script();
const expect = Code.expect;

lab.suite('person', function personTestSuite() {
  const Sequelize = require('sequelize');
  let sequelize = {};

  lab.beforeEach(function be(done) {
    sequelize = new Sequelize(null, null, null, {dialect: 'sqlite'});
    done();
  });

  lab.afterEach(function ae(done) {
    sequelize.drop();
    done();
  });

  lab.test('names can have apostrophes', function apos(done) {
    const Person = require('../models/person')(sequelize, Sequelize);

    sequelize.sync({force: true}).then(function doTest() {
      Person
        .create({
          givenName: `Patrick`,
          surName: `O'reilly`,
          email: 'poreilly@example.com',
          username: 'poreilly'
        })
        .then(function created(person) {
          expect(person.surName, `O'reilly`);
          done();
        });
    });
  });
});
