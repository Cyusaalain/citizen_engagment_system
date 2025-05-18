// File: backend/models/user.model.js
export default (sequelize, DataTypes) => {
  return sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  });
};