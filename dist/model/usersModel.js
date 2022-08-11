"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const patients_1 = require("./patients");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    DoctorsName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Full name is required'
            },
            notEmpty: {
                msg: 'Please provide a full name'
            }
        }
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Email is required'
            },
            isEmail: {
                msg: 'Please provide a valid email'
            }
        }
    },
    Specialization: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Specialization is required'
            },
            notEmpty: {
                msg: 'Please provide your specialization'
            }
        }
    },
    Gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Gender is required'
            },
            notEmpty: {
                msg: 'Please provide gender'
            }
        }
    },
    Phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Phone number is required'
            },
            notEmpty: {
                msg: 'Please provide a valid phone number'
            }
        }
    },
    Password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Password is required'
            },
            notEmpty: {
                msg: 'Please provide a password'
            }
        }
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'usertable'
});
UserInstance.hasMany(patients_1.PatientsInstance, { foreignKey: 'userId', as: 'patients' });
patients_1.PatientsInstance.belongsTo(UserInstance, { foreignKey: 'userId', as: 'user' });
