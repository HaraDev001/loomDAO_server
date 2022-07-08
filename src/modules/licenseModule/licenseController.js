// Require service;
const axios = require('axios');
const licensesService = require('./licenseService');
const tokenSalesService = require('../tokenSaleModule/tokenSaleService');
const attributeService = require('../attributeModule/attributeService');
const emailService = require('../../services/email.service');

const licensesController = {
  createSaleCreate(req, res) {
    res.send('launchpad form');
  },

  async createSaleStore(req, res) {
    const Id = req.body.id;

    const ipfsImage = await axios
      .get(`https://${res.locals.licenseCid}.ipfs.nftstorage.link/metadata.json`)
      .then(function (response) {
        // handle success
        return response.data.image;
      });

    const attributesArray = req.body.metadata.attributes.map(function (attribute) {
      return {
        property: attribute.key,
        value: attribute.value,
        licenseId: Id,
      };
    });

    const data = {
      License: {
        id: Id,
        tokenId: req.body.tokenId,
        name: req.body.metadata.name,
        description: req.body.metadata.description,
        imageCid: ipfsImage.split('/')[2],
        metadataCid: res.locals.licenseCid,
        userId: req.body.tokenSaleUserId,
        tokenSaleId: Id,
      },
      TokenSale: {
        id: Id,
        title: req.body.tokenSaleTitle,
        banner: 'token_sale_banner',
        description: 'token_sale description',
        userId: req.body.tokenSaleUserId,
      },
      mail: req.body.mail,
    };

    // Store the new TokenSale
    await tokenSalesService.createTokenSaleStore(data.TokenSale);

    // Store the new license
    await licensesService.createLicenseStore(data.License);

    // Store the new attributes
    await attributesArray.forEach(async function (attribute) {
      await attributeService.createAttributeStore(attribute);
    });

    // Find new TokenSale
    const newTokenSale = await tokenSalesService.tokenSaleFindByPk(Id);

    // Email notification
    await emailService.sendNewTokenSaleEmail(data.mail, newTokenSale.title);

    // Find new License
    const newLicense = await licensesService.findByPk(Id);

    res.send(newLicense);
  },

  async query(req, res) {
    // query licenses

    // Query by mail
    const licenseFound = await licensesService.query(req.params.name);

    res.send(licenseFound);
  },

  async queryAll(req, res) {
    // query licenses

    // Query by mail
    const licensesFound = await licensesService.queryAll();

    res.send(licensesFound);
  },

  updateCreate(req, res) {
    // show update form
    res.send('update license form');
  },

  async updateStore(req, res) {
    // auxiliar declaration for prittier
    const data = {
      id: req.params.id,
      tokenId: 1234,
      name: 'office',
    };

    // update license information
    await licensesService.updateStore(data);

    // Redirect to home
    const send = await licensesService.findByPk(req.params.id);
    res.send(send);
  },

  async data(req, res) {
    // retrieve license metadata
    const send = await licensesService.findDataByPk(req.params.id);

    res.send(send);
  },

  async licenseNewCreate(req, res) {
    res.send('CreateLicense');
  },

  async licenseNewStore(req, res) {
    // auxiliar declaration for prittier
    const data = {
      tokenId: 123456789,
      name: 'license_super_super_good',
      description: 'license_description',
      ipfsImage: 'image',
      userId: 1,
      tokenSaleId: 1,
    };

    // store license information on database
    licensesService.createLicenseStore(data);

    res.send('succes');
  },

  async close(req, res) {
    // Find sale in database
    const saleToClose = await tokenSalesService.tokenSaleFindByPk(req.params.id);

    const data = {
      mail: req.body.mail,
    };
    // Terminate Sale
    //    code goes here

    res.send(`Terminated sale named: ${saleToClose.dataValues.title}`);

    // Email notification
    await emailService.sendNewCloseTokenSaleEmail(data.mail, saleToClose.title);
  },

  async delete(req, res) {
    // auth process

    // eslint-disable-next-line no-unused-vars
    const saleToDelete = await licensesService.delete(req.params.id);

    res.send('License deleted');
  },
};

module.exports = licensesController;
