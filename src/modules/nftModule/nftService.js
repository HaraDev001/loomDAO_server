// Requiere nft.storage and fs packages
const { NFTStorage, File } = require('nft.storage');
const fs = require('fs');

const nftService = {
  async ipfsStore(metadata) {
    // This API key should be retrive from the env file
    const API_KEY =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRmNGM4NDVjNDM0N0NkMTk5Mjg2NjUwMDg1NjhDOWM2MDIxMWNGMjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0OTExMjU4ODAyOSwibmFtZSI6IkZpcnN0S2V5In0.IEK4DJi9rdd4mXZl6Z7x20VYFZ-NQ7yXb9mjctVJeDY';

    const client = new NFTStorage({ token: API_KEY });

    // UPLOAD THE IMAGE FROM REQ.BODY

    // When in production this variable should retrive the image sent in the metadata parameter
    const content = fs.readFileSync('image0.jpg');

    const newImage = new File([content], 'image.jpg', { type: 'image/jpg' });

    const ipfs = await client.store({
      name: metadata.name,
      description: metadata.description,
      image: newImage,
      properties: metadata.properties,
    });

    return ipfs.ipnft;
  },
};
module.exports = nftService;
