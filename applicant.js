const {connection} = require('../utils/connection');
const Sequelize = require('sequelize');
const User = require('./user');

const Applicant = connection.define("applicants", {
  applicantId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId : {
    type : Sequelize.INTEGER,
    allowNull : false,
    references : {
      model : User,
      key : "userId"
    }

  },
  name: {
    type: Sequelize.STRING(255), // Specify maximum length (adjust as needed)
    allowNull: false,
  },
  fatherName: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  contact: {
    type: Sequelize.STRING(15), // Adjust the length as needed
    allowNull: false,
  },
  postalAddress: {
    type: Sequelize.STRING(500), // Adjust the length as needed
    allowNull: false,
  },
  permanentAddress: {
    type: Sequelize.STRING(500), // Adjust the length as needed
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true, // Add email validation
    },
  },
  domicile: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING(10), // Adjust the length as needed
    allowNull: false,
  },
  dob: {
    type: Sequelize.STRING(10), // Adjust the length as needed
    allowNull: false,
  },
  meritalStatus: {
    type: Sequelize.STRING(20), // Adjust the length as needed
    allowNull: false,
  },
  nationality: {
    type: Sequelize.STRING(50), // Adjust the length as needed
    allowNull: false,
  },
}, {
  timestamps: false,
});

User.hasMany(Applicant, {
  foriegnKey : "userId",
  onDelete : "RESTRICT",
  onUpdate : "CASCADE"
})
module.exports = {Applicant};