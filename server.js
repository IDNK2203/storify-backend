// load env variables
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config/config.env` });
const app = require("./app");

require("./config/db")();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
