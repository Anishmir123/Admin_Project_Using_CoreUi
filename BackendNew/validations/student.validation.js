const Validator = require('validatorjs');
const i18n = require('i18n');
const mysql = require('../config/db.mysql.config'); // Assuming you're using MySQL for your database

// Custom validation for unique email
const validateEmailUniqueness = async (email) => {
  const [rows] = await mysql.execute('SELECT * FROM student_form WHERE email = ?', [email]);
  return rows.length === 0; // Returns true if email is unique, false if already exists
};

// Register custom async rule for unique email
Validator.registerAsync('unique', async (value, attribute, req, passes) => {
  const isUnique = await validateEmailUniqueness(value);
  if (!isUnique) {
    passes(false, `The ${attribute} has already been taken.`); // Custom error message
  } else {
    passes(); // Validation passed
  }
});



// Register custom `date_format` rule
Validator.register('date_format', (value, requirement, attribute) => {
  const regex = new RegExp(
    requirement === 'H:i' ? /^([01]\d|2[0-3]):([0-5]\d)$/ : requirement // Example for `H:i` format
  );
  return regex.test(value);
}, 'The :attribute does not match the format :format.'); // Default error message




const validateStudent = async (data, locale) => {
  i18n.setLocale(locale);

  // Define validation rules
  const rules = {
    username: 'required|max:255',
    email: 'required|email|unique', // Email must be unique
    password: 'required|min:6',
    address: 'required|max:255',
    address2: 'max:255',
    city: 'required|max:255',
    country: 'required|max:255',
    gender: 'required|in:male,female,other',
    hobbies: 'array',
    price: 'required|integer|min:0',
    time: 'required|date_format:H:i', // Custom rule for time format
    description: 'required|max:500',
    text: 'required',
  };

  // Perform validation
  const validation = new Validator(data, rules, i18n.__('validation'));

  return new Promise((resolve, reject) => {
    validation.checkAsync(
      () => resolve(null), // No errors
      () => reject(validation.errors.all()) // Return validation errors
    );
  });
};

module.exports = { validateStudent };

