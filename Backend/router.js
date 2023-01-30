const usersRoute = require("./routes/users");
const videoRoute = require("./routes/video");
const authRoute = require("./routes/auth");
const athleteRoute = require("./routes/athlete");
const categoryRoute = require("./routes/category");
const drillRoute = require("./routes/drill");

module.exports = function (app) {

  app.use("/users", usersRoute);

  app.use("/videos", videoRoute);

  app.use("/auth", authRoute);

  app.use("/athlete", athleteRoute);

  app.use("/category", categoryRoute);

  app.use("/drill", drillRoute);
};
