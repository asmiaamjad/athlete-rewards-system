const dotenv = require("dotenv");

dotenv.config();
module.exports = function (app) {
  try{
    app.listen(process.env.PORT || 8080);
    console.log("Running on 8080")
  }catch(err)
  {
    console.log(err);
  }
  
};
