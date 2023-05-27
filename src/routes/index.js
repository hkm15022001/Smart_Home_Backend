const authRouter = require("./auth.route");


//Index of route middleware
const route = (app) => {
  // Route middleware auth
  app.use("/auth", authRouter);

};

module.exports = route;
