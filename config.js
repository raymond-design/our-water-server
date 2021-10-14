require('dotenv').config();
//note: these are development mode env vars
const env_vars = {
  port: process.env.PORT,
  newsApiKey: process.env.newsApiKey
};

module.exports = env_vars;