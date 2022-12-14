"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersModel_1 = require("../model/usersModel");
const secrets = process.env.JWT_SECRETS;
//checking that a user is verified and can access their unique login details
async function auth(req, res, next) {
    try {
        const authorization = req.header.authorization;
        if (!req.cookies.token) {
            //   res.status(401).json({
            //     Error: 'Kindly sign up as a user'
            //   }) 
            res.redirect('/login');
            return;
        }
        const token = authorization?.slice(7, authorization.length) || req.cookies.token;
        let verified = jsonwebtoken_1.default.verify(token, secrets);
        if (!verified) {
            return res.status(401).json({
                Error: 'User not verified, you cant access this route'
            });
        }
        const { id } = verified;
        const user = await usersModel_1.UserInstance.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                Error: 'User not verified'
            });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(403).json({
            Error: 'User not logged in'
        });
    }
}
exports.auth = auth;
