"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class PatientsInstance extends sequelize_1.Model {
}
exports.PatientsInstance = PatientsInstance;
PatientsInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    patientName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Full name is required'
            },
            notEmpty: {
                msg: 'Please provide full name'
            }
        }
    },
    age: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Age is required'
            },
            notEmpty: {
                msg: 'Please provide patients age'
            }
        }
    },
    hospitalName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Enter hospital name'
            },
            notEmpty: {
                msg: 'Please provide hospital name'
            }
        }
    },
    weight: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Enter weight'
            },
            notEmpty: {
                msg: 'Please provide patients weight'
            }
        }
    },
    height: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Enter height'
            },
            notEmpty: {
                msg: 'Please provide patients height'
            }
        }
    },
    bloodGroup: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Enter patients blood group'
            },
            notEmpty: {
                msg: 'Please provide patients blood group'
            }
        }
    },
    genotype: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Enter patients genotype'
            },
            notEmpty: {
                msg: 'Please provide patients genotype'
            }
        }
    },
    bloodPressure: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Enter patients blood pressure'
            },
            notEmpty: {
                msg: 'Please provide patients blood pressure'
            }
        }
    },
    HIV_status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Enter patients HIV status'
            },
            notEmpty: {
                msg: 'Please provide patients HIV status'
            }
        }
    },
    hepatitis: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Enter patients hepatitis status'
            },
            notEmpty: {
                msg: 'Please provide patients hepatitis status'
            }
        }
    },
    userId: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'patients'
});
