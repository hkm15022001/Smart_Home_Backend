const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const adminRouter = require("./admin.route");
const roomRouter = require("./room.route");
const deviceRouter = require("./device.route");
const subscriberRouter = require("./subscriber.route");
const sensorRouter = require("./sensor.route");
const meterPowerRouter = require("./meterPower.route");

//Index of route middleware
const route = (app) => {
  // Route middleware auth
  app.use("/auth", authRouter);

};

module.exports = route;
