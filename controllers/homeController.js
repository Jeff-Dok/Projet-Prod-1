const express = require('express');
const app = express();
const axios = require('axios');

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

exports.sendError = (request, response) => {
    response.render("error");
};

exports.postSignin = ("/signin", (req, rep) => {
    const email = req.body.email;
    const password = req.body.password;
    const data = {
        email: email,
        password: password,
    };
    const config = {
        method: "post",
        url: "https://ski-api.herokuapp.com/login",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        data: data,
    };
    axios(config)
        .then(function (response) {
            let token = response.data.token;
            const data = {
                token: token,
            };
            req.session.skiApiToken = token;
            const config = {
                method: "get",
                url: "https://ski-api.herokuapp.com/tokenInfo",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                    Accept: "application/json",
                },
                data: data,
            };

            axios(config)
                .then(function (response) {
                    req.session.profileData = response.data;
                    rep.redirect("profile");
                })
                .catch(error => rep.redirect("error"));
        })

        .catch(error => rep.redirect("error"));
});

exports.postSignup = ("/signup", (req, rep) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    //

    const initialData = {
        name: name,
        email: email,
        password: password,
    };

    const config = {
        method: "post",
        url: "https://ski-api.herokuapp.com/signup",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        data: initialData,
    };

    axios(config)
        .then(function () {
            const config = {
                method: "post",
                url: "https://ski-api.herokuapp.com/login",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                data: initialData,
            };
            axios(config)
                .then(function (response) {
                    let token = response.data.token;
                    const data = {
                        token: token,
                    };
                    req.session.skiApiToken = token;
                    const config = {
                        method: "get",
                        url: "https://ski-api.herokuapp.com/tokenInfo",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                            Accept: "application/json",
                        },
                        data: data,
                    };

                    axios(config)
                        .then(function (response) {
                            req.session.profileData = response.data;
                            rep.redirect("profile");
                        })
                        .catch(error => rep.redirect("error"));
                })
                .catch(error => rep.redirect("error"));
        })
        .catch(error => rep.redirect("error"));
});