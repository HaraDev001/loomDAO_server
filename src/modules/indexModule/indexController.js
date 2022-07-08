// let express = require('express');
// let router = express.Router();

// Require service
const indexService = require('./indexService');

/* GET home page. */
const indexController = {
  home() {
    // auxiliar declaration for prittier
    const data = [];

    indexService.home(data);
  },

  launchpad() {
    // auxiliar declaration for prittier
    const data = [];

    indexService.launchpad(data);
  },

  dashboard(res) {
    // auxiliar declaration for prittier
    const data = [];
    res.render('index');
    indexService.dashboard(data);
  },

  marketplace(res) {
    // auxiliar declaration for prittier
    const data = [];

    res.render('marketplace');
    indexService.marketplace(data);
  },

  landing(res) {
    // auxiliar declaration for prittier
    const data = [];

    res.send('landing');
    indexService.landing(data);
  },
};

module.exports = indexController;
