"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const hospController_1 = require("../controller/hospController");
const auth_1 = require("../middleware/auth");
/* GET users listing. */
router.post('/create', auth_1.auth, hospController_1.Users);
router.get('/read', hospController_1.getPatients);
router.get('/read/:id', hospController_1.getOne); //get one patient
router.patch('/update/:id', auth_1.auth, hospController_1.UpdatePatients);
router.get('/delete/:id', auth_1.auth, hospController_1.DeletePatients);
//router.post('/logout', logout)
router.post('/update/:id', auth_1.auth, hospController_1.UpdatePatients);
router.get('/read/unique/:id', auth_1.auth, hospController_1.getPatientInfo);
router.get('/unique/:id', hospController_1.updatePatientInfo);
exports.default = router;
