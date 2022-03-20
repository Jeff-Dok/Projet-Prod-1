////////////////// !!!!!!! ENLEVER TOUS LES COMMENTAIRES AVANT DE PUBLIER LE FINAL !!!!!!! ////////////////// 

////////////////// CODE PRÉAJUSTEMENTS DE VENDREDI SOIR ////////////////// 
/*const express = require('express');
const app = express();
const axios = require('axios');
app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

exports.getRedirect = (req, rep) => {
    rep.redirect("/");
}
exports.sendIndex = (request, response) => {
    response.render("index");
};
exports.sendSignup = (request, response) => {
    response.render("signup");
};
exports.sendSignin = (request, response) => {
    response.render("signin");
};
exports.sendProfile = (request, response) => {
    response.render("profile");
};*/

////////////////// CODE AJUSTÉ DE VENDREDI SOIR ////////////////// 
const express = require('express');
const app = express();
//const axios = require('axios');
app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

exports.getRedirect = (req, rep) => {
    rep.redirect("/");
}
exports.sendIndex = (request, response) => {
    response.render("index");
};
exports.sendSignup = (request, response) => {
    response.render("signup");
};
exports.sendSignin = (request, response) => {
    response.render("signin");
};
exports.sendProfile = (request, response) => {
    const data = request.session.profileData;
    if (data == undefined) {
        response.redirect("signin")
    } else {
        console.log("Rendering profile with token: " + data.token);
        response.render("profile", {
            'data': data
        });
    }
};