const dotenv = require('dotenv');

dotenv.config();
module.exports = function (mongoose) {
    mongoose
    .connect(process.env.MONGO_URL)
    .then((result) => {
      console.log("Connected to DB");
    })
    .catch((err) => console.log(err));
};
