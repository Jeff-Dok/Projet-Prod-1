const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const homeController = require("./controllers/homeController");

app.use(
    session({
        secret: "SecretToken",
    })
);
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", homeController.sendIndex);
app.get("/index", homeController.getRedirect);
app.get("/signup", homeController.sendSignup);
app.get("/signin", homeController.sendSignin);
app.get("/profile", homeController.sendProfile);
app.get("/error", homeController.sendError);

app.post("/signin", homeController.postSignin);
app.post("/signup", homeController.postSignup);

/////////spot/////////////////
app.get("/spotform", homeController.sendSpotForm);
app.get("/spottest", homeController.sendSpot);
app.post("/spotform", homeController.postSpotForm);
/////////////////////////////

app.listen(3000, () => {
    console.log("Le serveur est sur le port 3000");
});