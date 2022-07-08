const express = require('express');
const licenseController = require('../../modules/licenseModule/licenseController');

const router = express.Router();

router.route('/create/:userId').post(licenseController.create);
router.route('').get(licenseController.findAll); // query can include a user
router.route('/:userId').get(licenseController.findAllFromUser); // query can include a user
router.route('/:licenseId').get(licenseController.findOne);
router.route('/list/:licenseId').post(licenseController.listLicense);
router.route('/listed/:licenseId').put(licenseController.updateListedLicense).get(licenseController.findOneListed);
router.route('/listed').get(licenseController.findAllListed);
module.exports = router;
