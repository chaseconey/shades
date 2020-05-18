const { hooks } = require('@adonisjs/ignitor')
const sortBy = require('lodash.sortby');

hooks.after.providersBooted(() => {
  const View = use('View')
  View.global('isSecret', isSecret);
  View.global('sortBy', sortBy);
});

function isSecret(string) {
  const secrets = ['PASS', 'TOKEN', 'KEY', 'SECRET', 'RSA_', '_PW', '_PWD'];
  const whitelist = [];

  return (
    secrets.some(secret => string.toLowerCase().includes(secret.toLowerCase())) &&
    !whitelist.some(secret => string.toLowerCase() == secret.toLowerCase())
  );
}
