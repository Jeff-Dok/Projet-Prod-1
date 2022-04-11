const express = require('express');
const route = express.Router();
const homeController = require("../controllers/homeController");

route.get("/", homeController.sendIndex);
route.get("/index", homeController.getRedirect);
route.get("/signup", homeController.sendSignup);
route.get("/signin", homeController.sendSignin);
route.get("/profile", homeController.sendProfile);
route.get("/error", homeController.sendError);
route.post("/signin", homeController.postSignin);
route.post("/signup", homeController.postSignup);
route.get("/spotAdded", homeController.sendSpot);
route.get("/spotform", homeController.sendSpotForm);
route.post("/spotform", homeController.postSpotForm);
route.get("/allspot", homeController.getAllSpot);
route.get("/spotdetail/:id", homeController.getAnID_spot);
route.put("/allspot:id", homeController.editSpot);
route.get('/editSpot:id', homeController.renderEdit);
route.delete("/allspot:id", homeController.deleteSpot);

module.exports = route;