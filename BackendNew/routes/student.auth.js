const express = require('express');
const router = express.Router();

// const upload1 = require('../public/assets/uploadImage');
const upload = require('../middlewares/imgaeUploads.middleware');
// const {studentController,getStudentFormData} = require('../controllers/student.controller');
const { studentCreateForm,deleteStudentFormData, getStudentFormData,updateStudentFormData ,uploadExcelData} = require('../controllers/student.controller');
;


router.post('/studentCreateForm',upload.single('image'),studentCreateForm);
router.get('/studentFormData', getStudentFormData);
router.delete('/studentFormData/:id', deleteStudentFormData);
router.put('/studentFormData/:id', updateStudentFormData);

router.post('/uploadExcelData', uploadExcelData);

module.exports = router; 