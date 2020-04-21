const bcrypt = require('bcrypt');

const saltRounds = 10;
const pass = 'secret';

bcrypt.hash(pass, saltRounds, function(err, hash) {
  console.log(hash);
});

const hashPass = '$2b$10$l8c4CAfPddleiS4Zcp7TUOZ95U7UCs6tTgSCwazzDZtPqY.4bJ2Na';

bcrypt.compare(pass, hashPass, function(err, result) {
  console.log(result);
});

// $2b$10$l8c4CAfPddleiS4Zcp7TUOZ95U7UCs6tTgSCwazzDZtPqY.4bJ2Na
// $2b$10$ctOT/F4Fp/3WAyh8xQAAAeaKxiGUja9NDezfw83fnYgTCMHxBtBBi