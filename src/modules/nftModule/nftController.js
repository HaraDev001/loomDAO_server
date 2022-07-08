// Require service
const nftService = require('./nftService');

const nftController = {
  async ipfsStore(req, res, next) {
    // Store new license metadata into IPFS

    const meta = {
      name: req.body.metadata.name,
      description: req.body.metadata.description,
      // image: PUT IMAGE HERE
      properties: { atributes: req.body.metadata.attributes },
    };

    const licenseIPFS = await nftService.ipfsStore(meta);

    // Store cid into locals
    res.locals.licenseCid = licenseIPFS;

    // const cidImage = ipfs.image.split('/');

    next();
  },
};
module.exports = nftController;
