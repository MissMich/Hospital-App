import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { PatientsInstance } from "./patients";

interface UsersAttributes{
    id : string;
    DoctorsName: string;
    Email : string;
    Specialization : string;
    Gender : string;
    Phone : string;
    Password : string
}

export class UserInstance extends Model<UsersAttributes>{}

UserInstance.init({
    id :{
        type:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    DoctorsName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Full name is required'
            },
            notEmpty:{
                msg:'Please provide a full name'
            }
        }
    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notNull:{
                msg:'Email is required'
            },
            isEmail:{
                msg:'Please provide a valid email'
            }
        }
    },
    Specialization:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Specialization is required'
            },
            notEmpty:{
                msg:'Please provide your specialization'
            }
        }
    },
    Gender:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Gender is required'
            },
            notEmpty:{
                msg:'Please provide gender'
            }
        }
    },
    Phone:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notNull:{
                msg:'Phone number is required'
            },
            notEmpty:{
                msg:'Please provide a valid phone number'
            }
        }

    },
    Password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Password is required'
            },
            notEmpty:{
                msg:'Please provide a password'
            }
        }
    }
},{
    sequelize:db,
    tableName:'usertable'
});

UserInstance.hasMany(PatientsInstance, {foreignKey:'userId', as:'patients'})
PatientsInstance.belongsTo(UserInstance, {foreignKey: 'userId', as:'user'})