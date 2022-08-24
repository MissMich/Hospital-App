"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const hospController_1 = require("../controller/hospController");
router.get('/register', (req, res) => {
    res.render("register");
});
router.get('/login', (req, res) => {
    res.render("login");
});
router.get('/', (req, res) => {
    res.render("index");
});
router.get('/regpatients', (req, res) => {
    res.render("regpatients");
});
router.get('/updateinfo/:id', (req, res) => {
    res.render('updateinfo');
});
router.get('/dashboard', auth_1.auth, hospController_1.getOne);
router.get('/patient/:id', auth_1.auth, hospController_1.getPatientInfo);
exports.default = router;
