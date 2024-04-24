const CatchAsync = require('../utils/CatchAsync');
const authService = require('../services/auth.sevice');
const businessModel = require('../model/business.model');
const tokenService = require('../services/token.service');
const httpStatus = require('http-status');
const registerBusiness = CatchAsync(async (req, res) => {
    const userCreated = await authService.addBusiness(req);
    return res.status(201).send(userCreated);
});
const loginBusiness = CatchAsync(async (req, res) => {
    const { email, password} = req.body;
    const user = await authService.loginBusiness(email, password);
    const tokens = await tokenService.generateToken(req.body);
    res.status(httpStatus.OK).send({ user, tokens });
    const createUser = await businessModel.create({ email, token: generatetoken });
    return res.status(200).json(createUser);
});
const logoutBusiness = CatchAsync(async (req, res) => {
    const userDeleted = await authService.deleteBusiness(req.body);
    return res.status(200).send(userDeleted);
});
const updateBusiness = CatchAsync(async (req, res) => {
    const user = await authService.updateBusiness(req.body);
    return res.status(200).send(user);
});
module.exports = {
    registerBusiness,
    loginBusiness,
    logoutBusiness,
    updateBusiness
};