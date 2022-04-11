const express = require("express");
const session = require("express-session");
const router = require('./routes/router');
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride('_method'));

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
app.use(router);

app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log("Le serveur est sur le port 3000");
});