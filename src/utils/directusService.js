const { createDirectus, rest, authentication, realtime } = require('@directus/sdk');
const dotenv = require('dotenv');

dotenv.config();
let directusClient = null;

const getDirectusClient = () => {
  if (!directusClient) {
    directusClient = createDirectus(process.env.DIRECTUS_URL)
                .with(authentication('json'))
                .with(rest())
                .with(realtime());
  }
  return directusClient;
};

module.exports = { getDirectusClient };