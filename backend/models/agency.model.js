// File: backend/models/agency.model.js
export default (sequelize, DataTypes) => {
  return sequelize.define("Agency", {
    name: DataTypes.STRING,
    categories: DataTypes.JSON, // e.g. ["Sanitation", "Roads"]
  });
};