const express = require('express');
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

exports.getRedirect = (req, rep) => {
    rep.redirect("/");
};

exports.sendIndex = (request, response) => {
    response.render("index");
};

exports.sendSignup = (request, response) => {
    response.render("signup");
};

exports.sendSignin = (request, response) => {
    response.render("signin");
};

exports.sendError = (request, response) => {
    response.render("error");
};

exports.sendSpotForm = (request, response) => {
    response.render("spotform");
};