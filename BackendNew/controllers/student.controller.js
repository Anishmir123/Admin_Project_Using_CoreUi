

/*------------------------------------------------------------------------------------*/

const mysql = require('../config/db.mysql.config');
const i18n = require('i18n');
const { generateToken } = require('../utils/jwt.utils');
const bcrypt = require('bcryptjs');
const { validateStudent } = require('../validations/student.validation');
const studentAuthTokenOrmModel = require('../models/orm/studentAuthToken.orm.model');
const studentImage = require('../models/orm/studentImage.orm.model');

// const upload = require('../middlewares/imgaeUploads.middleware');

// use for post api upload.single('image'),
const studentCreateForm = async (req, res) => {
  try {
    const {
      username ,
      email ,
      password ,
      address ,
      address2 ,
      city ,
      country ,
      gender,
      hobbies ,
      price ,
      time ,
      description ,
      text ,
    } = req.body;

    // Use req.file for the imageName if multer is used for file upload
    const imageName = req.file ? req.file.filename : null;

    const hobbiesArray = Array.isArray(hobbies) ? hobbies : (hobbies ? hobbies.split(',') : []);
    const connection = await mysql.getConnection();
    await connection.beginTransaction();

    try {
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

      const [result] = await connection.execute(
        `INSERT INTO student_form 
         (username, email, password, address, address2, city, country, gender, hobbies, price, time, description, text, imageName)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          username,
          email,
          hashedPassword,
          address,
          address2,
          city,
          country,
          gender,
          hobbiesArray.join(', '),
          price,
          time,
          description,
          text,
          imageName,
        ]
      );

      const user = { id: result.insertId, email };
      const token = generateToken(user);
      const expiresAt = new Date(Date.now() + 3600 * 1000);
      await studentAuthTokenOrmModel.create(
        { adminId: user.id, token, expires_at: expiresAt },
        { transaction: connection }
      );

      await connection.commit();

      return res.status(201).json({
        status: 1,
        msg: 'Successfully created form',
        data: { formId: result.insertId, token },
      });
    } catch (error) {
      await connection.rollback();
      console.error('Transaction Error:', error);
      throw error;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('General Error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// This is an get api calling

const getStudentFormData = async (req, res) => {
  try {
    const connection = await mysql.getConnection();
    const [rows] = await connection.execute('SELECT * FROM student_form');

    connection.release();
 
    console.log('Database rows:',rows);

  
    return res.status(200).json({
      status: 1,
      msg: 'Data fetched successfully',
      data: rows || [],// Return the data
    });
  } catch (error) {
    console.error('Error fetching form data:', error);
    return res.status(500).json({ 
      status:0,
      msg:'Internal server message',
      error:error.message,
     });
  }
};


// for use delete colums in buttons
// also delete api use 

const deleteStudentFormData = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the route parameter
    const connection = await mysql.getConnection();

    const [result] = await connection.execute('DELETE FROM student_form WHERE id = ?', [id]);

    connection.release();

    if (result.affectedRows > 0) {
      return res.status(200).json({
        status: 1,
        msg: 'Record deleted successfully',
      });
    } else {
      return res.status(404).json({
        status: 0,
        msg: 'Record not found',
      });
    }
  } catch (error) {
    console.error('Error deleting record:', error);
    return res.status(500).json({
      status: 0,
      msg: 'Server error',
      error: error.message,
    });
  }
};

// use for put API 
// PUT API for updating student form data
const updateStudentFormData = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the route parameter
    const {
      username,
      email,
      address,
      address2,
      city,
      country,
      gender,
      hobbies,
      price,
      time,
      description,
      text,
    } = req.body;

    const connection = await mysql.getConnection();
    await connection.beginTransaction(); // Start the transaction

    try {
      const [result] = await connection.execute(
        `UPDATE student_form 
        SET username = ?, email = ?, address = ?, address2 = ?, city = ?, 
            country = ?, gender = ?,  price = ?, time = ?, 
            description = ?, text = ? 
        WHERE id = ?`,
        [
          username,
          email,
          address,
          address2,
          city,
          country,
          gender,
        
          price,
          time,
          description,
          text,
          id,
        ]
      );

      if (result.affectedRows > 0) {
        await connection.commit(); // Commit the transaction
        return res.status(200).json({
          status: 1,
          msg: 'Record updated successfully',
        });
      } else {
        await connection.rollback(); // Rollback if no rows affected
        return res.status(404).json({
          status: 0,
          msg: 'Record not found',
        });
      }
    } catch (error) {
      await connection.rollback(); // Rollback on error
      console.error('Transaction Error:', error);
      throw error;
    } finally {
      connection.release(); // Release the connection
    }
  } catch (error) {
    console.error('General Error:', error);
    return res.status(500).json({
      status: 0,
      msg: 'Server error',
      error: error.message,
    });
  }
};

//extra add for table 

// upload api

const uploadExcelData = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    // Log the received data for debugging
    console.log('Received data:', data);

    const connection = await mysql.getConnection();
    await connection.beginTransaction(); // Start the transaction

    try {
      const insertPromises = data.map(async (row) => {
        // Log each row of data before insertion
        console.log('Inserting row:', row);

        // Validate the row to ensure all required fields are present
        if (!row.username || !row.email || !row.city || !row.country || !row.password) {
          console.error('Missing required fields in row:', row);
          throw new Error('Missing required fields');
        }

        // Hash the password before inserting it
        const hashedPassword = await bcrypt.hash(row.password, 10);

        return connection.execute(
          'INSERT INTO student_form (username, email, password, address, city, country, gender, price, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            row.username || 'Unknown', // Default if missing
            row.email || 'N/A',
            hashedPassword, // Use the hashed password
            row.address || 'N/A',
            row.city || 'N/A',
            row.country || 'N/A',
            row.gender || 'N/A',
            row.price || 0, // Default if missing
            row.description || 'N/A',
          ]
        );
      });

      // Wait for all insert operations to complete
      await Promise.all(insertPromises);
      await connection.commit(); // Commit the transaction
      res.status(201).json({ message: 'Data uploaded successfully' });
    } catch (err) {
      console.error('Error inserting data:', err);
      await connection.rollback(); // Rollback on error
      res.status(500).json({ message: 'Error inserting data', error: err.message });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



module.exports = { studentCreateForm, getStudentFormData ,deleteStudentFormData,updateStudentFormData,uploadExcelData};







