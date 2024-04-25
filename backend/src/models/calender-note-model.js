const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const CalenderNoteModel = sequelize.define('CalenderNote', {
    tid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    timestamps: false,
    tableName: 'calender_notes'
});

module.exports = CalenderNoteModel;