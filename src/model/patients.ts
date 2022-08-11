import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface PatientsAttributes{
    id:string;
    patientName:string;
    age:string;
    hospitalName:String;
    weight:String;
    height:String;
    bloodGroup:String;
    genotype:String;
    bloodPressure:String;
    HIV_status:String;
    hepatitis:String;

    userId:String;
}

export class PatientsInstance extends Model<PatientsAttributes>{}
PatientsInstance.init({
    id:{
        type:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    patientName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Full name is required'
            },
            notEmpty:{
                msg:'Please provide full name'
            }
        }
    },
    age:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Age is required'
            },
            notEmpty:{
                msg:'Please provide patients age'
            }
        }
    },
    hospitalName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Enter hospital name'
            },
            notEmpty:{
                msg:'Please provide hospital name'
            }
        }
    },
    weight:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Enter weight'
            },
            notEmpty:{
                msg:'Please provide patients weight'
            }
        }
    },
    height:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Enter height'
            },
            notEmpty:{
                msg:'Please provide patients height'
            }
        }
    },
    bloodGroup:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Enter patients blood group'
            },
            notEmpty:{
                msg:'Please provide patients blood group'
            }
        }
    },
    genotype:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Enter patients genotype'
            },
            notEmpty:{
                msg:'Please provide patients genotype'
            }
        }
    },
    bloodPressure:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Enter patients blood pressure'
            },
            notEmpty:{
                msg:'Please provide patients blood pressure'
            }
        }
    },
    HIV_status:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Enter patients HIV status'
            },
            notEmpty:{
                msg:'Please provide patients HIV status'
            }
        }
    },
    hepatitis:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Enter patients hepatitis status'
            },
            notEmpty:{
                msg:'Please provide patients hepatitis status'
            }
        }
    },
    userId:{
        type:DataTypes.STRING
    }
},{
    sequelize:db,
    tableName:'patients'
})