const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt.utils');
const mysql = require('../config/db.mysql.config');
const sequelize = require('../config/db.sequelize.config');
const i18n = require('i18n');
const adminAuthTokenOrmModel = require('../models/orm/adminAuthToken.orm.model');
const { validateRegister, validateLogin } = require('../validations/auth.validation');

// Register page 
const register = async (req, res) => {
  console.log('Request Body:', req.body); // Log request body
  // res.status(200).json({ message: 'Route hit successfully!' });
  const locale = req.headers['locale'] || 'en';
  i18n.setLocale(locale); // Set the locale for translations

  const { username, email, password } = req.body;

  try {
    // Step 1: Validate Request Data
    const validation = await validateRegister(req.body, locale);
    console.log('Validation Errors:', validation.errors.all()); // Log validation errors
    if (!(await validation.passes())) {
      const errors = validation.errors.all();
      const firstErrorMessage = Object.values(errors).flat()[0] || 'Validation error occurred';
      return res.status(400).json({
        msg: i18n.__('message.vErr'),
        errors: firstErrorMessage,
      });
    }

    // Step 2: Check if User Already Exists
    const [existingUser] = await mysql.execute(
      'SELECT id FROM admins WHERE email = ? LIMIT 1',
      [email]
    );
    console.log('Existing User:', existingUser); // Log if the user exists
    if (existingUser.length > 0) {
      return res.status(400).json({
        msg: i18n.__('message.vErr'),
        errors: i18n.__('validation.uniqueEmail'),
      });
    }

    // Step 3: Hash the Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword); // Log hashed password

    // Step 4: Insert User into Database
    const [result] = await mysql.execute(
      'INSERT INTO admins (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    console.log('DB Insert Result:', result); // Log database insert result

    // Step 5: Respond with Success
    return res.status(201).json({
      status: 1,
      msg: i18n.__('message.registerSuccess'),
      data: { userId: result.insertId },
    });
  } catch (err) {
    console.error('Error in Register Function:', err.message); // Log error message
    console.error('Stack Trace:', err.stack); // Log stack trace for debugging

    // Step 6: Handle Errors
    return res.status(500).json({
      message: i18n.__('message.serverError'),
      error: err.message,
    });
  }
};


/*----------------------------------*/

// Login page
const login = async (req, res) => {
  const locale = req.headers['locale'] || 'en';
  i18n.setLocale(locale);

  const { email, password } = req.body;

  // Validate request data
  if (!email || !password) {
    return res.status(400).json({
      msg: i18n.__('message.vErr'),
      errors: 'Email and Password are required.',
    });
  }

  const transaction = await sequelize.transaction();

  try {
    // Fetch user from database
    const validation = await validateLogin(req.body, locale);
    const query = 'SELECT id, email, password FROM admins WHERE email = ?';
    const [rows] = await mysql.execute(query, [email]);
    const user = rows[0];

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        status: 0,
        msg: i18n.__('message.invalidCredentials'),
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 0,
        msg: i18n.__('message.invalidCredentials'),
      });
    }

    // Generate a new JWT token
    const token = generateToken(user);
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1-hour expiration

/*----------------------------------------------------------*/
    // Remove all previous tokens for the user
    // await adminAuthTokenOrmModel.destroy({   
    //   where: { adminId: user.id },
    //   transaction,
    // });


    // Save the new token
    await adminAuthTokenOrmModel.create(
      { adminId: user.id, token, expires_at: expiresAt },
      { transaction }
    );
    
/*-------------------------------------------------------------*/
    // Commit the transaction
    await transaction.commit();

    // Respond with success
    return res.status(200).json({
      status: 1,
      msg: i18n.__('message.loginSuccess'),
      payload: {
        userId: user.id,
        token,
        expiresAt, // Include token expiration time in the response
      },
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    if (transaction) await transaction.rollback();

    console.error('Error during Login:', error.message);

    // Respond with an error
    return res.status(500).json({
      msg: i18n.__('message.serverError'),
      error: error.message,
    });
  }
};




/*---------------------------------------------*/


// Logout page
const logout = async (req, res) => {
  console.log(req.body); // Log the incoming request body to check if it's empty or malformed
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized: Token missing' });
  }

  try {
    // Step 1: Delete Auth Token
    const [result] = await mysql.execute('DELETE FROM admin_auth_tokens WHERE token = ?', [token]);

    // Check if the token was deleted successfully
    if (result.affectedRows === 0) {
      return res.status(400).json({ msg: 'Token not found or already deleted' });
    }

    // Step 2: Respond with Success
    return res.status(200).json({
      status: 1,
      msg: i18n.__('logout Successful'),
    });
  } catch (error) {
    console.error('Error during Logout:', error.message); // Log error message
    console.error('Stack Trace:', error.stack); // Log stack trace for debugging

    // Step 3: Handle Errors
    return res.status(500).json({
      status: 0,
      msg: i18n.__('message.serverError'),
      error: error.message,
    });
  }
};


module.exports = {
  register,
  login,
  logout,
};
