const multer = require('multer');
const path = require('path');

const uploadImagePath = './uploads/images';

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadImagePath); // Ensure this path exists and is correct    
  },
  filename: function(req, file, cb) {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`; // Format: YYYY-MM-DD
    cb(null, `${file.fieldname}_${formattedDate}_${Date.now()}_${file.originalname}`);
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

module.exports = upload;


