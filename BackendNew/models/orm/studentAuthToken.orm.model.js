// const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/db.sequelize.config');

// const studentAuthToken = sequelize.define('studentAuthToken', { 
//   id: {
//     type: DataTypes.BIGINT,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   adminId: {
//     type: DataTypes.BIGINT, 
//     allowNull: false,
//   },
//   token: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   expires_at: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     field: 'created_at'
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     field: 'updated_at' 
//   }
// }, {
//   tableName: 'student_auth_tokens' //admins
// });

// module.exports = studentAuthToken;

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.sequelize.config');

const studentAuthToken = sequelize.define(
  'studentAuthToken',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    adminId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: 'student_auth_tokens',
  }
);

module.exports = studentAuthToken;
