const Validator = require('validatorjs');
// const validator = require('validator');
console.log(Validator);
const i18n = require('i18n');
// const userOrmModel = require('../models/orm/user.orm.model');

// Define a custom validation rule for uniqueness
// Validator.register('unique', async function (value, attribute, message, args, context, opts) {
// //   const [table] = args; // In this case, we're checking uniqueness in the "users" table
//   // try {
//     const user = await userOrmModel.findOne({ where: { email: value } });
//     console.log(user);
//     if (user) {
//       context.addFailure(message || `The ${attribute} has already been taken.`);
//     }
//   // } catch (err) {
//   //   context.addFailure('An error occurred while checking uniqueness.');
//   // }
// }, 'The :attribute has already been taken.');

// Validator.register('unique', async function (value, attribute, message, args) {
//   // const [table] = args;

//   try {
//     const user = await userOrmModel.findOne({ where: { email: value } });

//     // console.log('Checking uniqueness for:', value, 'Found user:', user);

//     if (user) {
//       return true;
//       // return message || `The ${attribute} has already been taken.`;
//     }
//     return true;
//   } catch (err) {
//     return 'An error occurred while checking uniqueness.';
//   }
// }, 'The :attribute has already been taken.');



// Validation function


const validateRegister = async (data, locale) => {
  i18n.setLocale(locale);

  const rules = {
    username: 'required|max:10',
    email: 'required|email',
    password: 'required|min:6',

  };

  const validation = new Validator(data, rules, i18n.__('validation'));
  return validation;
};

const validateLogin = async (data, locale) => {
  i18n.setLocale(locale);

  const rules = {
    email: 'required',
    password: 'required',

  };

  const validation = new Validator(data, rules, i18n.__('validation'));
  return validation;
};

module.exports = { validateRegister, validateLogin };
