const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.sequelize.config');

const UploadedImage = sequelize.define(
  'UploadedImage',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      // Optional: If images are linked to specific users
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    imageName: {
      type: DataTypes.STRING,
      allowNull: false, // The original file name
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false, // The storage path of the image
    },
    fileSize: {
      type: DataTypes.BIGINT,
      allowNull: true, // Optional: Size of the image in bytes
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: true, // Optional: Type of the file (e.g., 'image/png')
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  {
    tableName: 'uploaded_images',
  }
);

module.exports = UploadedImage;
