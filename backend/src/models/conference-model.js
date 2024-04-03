const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database')

var Conference = sequelize.define('Conference', {
    conf_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    conf_name: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    acronym: {
        type: DataTypes.STRING(16),
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'conferences',
})

module.exports = Conference