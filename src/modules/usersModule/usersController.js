// var express = require('express');
// var router = express.Router();

// Import express validator
// const { validationResult } = require('express-validator');

// Require Services
const usersService = require('./usersService');
const profileService = require('../profileModule/profileService');
const emailService = require('../../services/email.service');

const usersController = {
  async wallet(req, res) {
    // auxiliar declaration for prittier

    const data = {
      address: req.params.address,
    };

    // map user profile info with wallet address
    const recieved = await usersService.findByAddress(data.address);

    res.send(recieved);
  },
  async updateCreate(req, res) {
    // auxiliar declaration for prittier

    const data = {
      id: req.params.id,
    };

    // show update form

    // Check if exists
    const userInDB = await usersService.findByPk(data.id);
    if (!userInDB) {
      res.send('user not found');
    }

    // render update form with the user data
    res.send('Update Form');
  },
  async createUserProfileStore(req, res) {
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      userId: req.body.userId,
    };

    // Add userId

    // Check if the mail is unique
    const mailInDb = await profileService.findAll(data.email);
    if (mailInDb.length !== 0) {
      res.send('Mail already in use');
    } else {
      // Store new user profile
      await profileService.createUserProfileStore(data);

      // Email notification
      await emailService.sendNewUserProfileEmail(data.email, data.firstName);
      res.send('profileCreated');
    }
  },
  async queryAll(req, res) {
    // if there are no keys in query then do query without keys
    let usersFound;
    if (!Object.keys(req.query).length) {
      usersFound = await usersService.queryAll();
    } else {
      usersFound = await usersService.queryAll(req.query);
    }
    res.send(usersFound);
    // if ther are keys in query then do query with keys
  },
  // retrieves a user by id
  async findById(req, res) {
    const { userId } = req.params;
    const user = await usersService.findById(userId);
    res.send(JSON.stringify(user));
  },
  // retrieves a user
  async findByAddress(req, res) {
    const { address } = req.params;
    const user = await usersService.findByAddress(address);
    res.send(JSON.stringify(user));
  },
  // creates a new user
  async create(req, res) {
    // userservice create user
    try {
      const user = await usersService.createUser(req.body);
      res.send(JSON.stringify(user));
    } catch (e) {
      res.status(500).send(e);
    }
  },
  // updates an existing user
  async update(req, res) {
    const { userId } = req.params;
    try {
      const updatedRows = await usersService.update(userId, req.body);
      res.send(JSON.stringify(updatedRows));
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async delete(req, res) {
    const { userId } = req.params;
    try {
      const deletedRows = await usersService.delete(userId);
      res.send(JSON.stringify(deletedRows));
    } catch (e) {
      res.status(500).send(e);
    }
  },
};

module.exports = usersController;
