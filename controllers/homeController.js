const express = require('express');
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

//--------------------------------------------------------------------------------------------------------------------//

///////////////////ZONE SPOT////////////////////

exports.sendSpotForm = (request, response) => {
    response.render("spotform")
};

exports.sendSpot = (request, response) => {
    const data = request.session.spotData;
    if (data == undefined) {
        response.redirect("spotform");
    } else {
        response.render("spottest", {
            'data': data
        });
    };
};

exports.postSpotForm = ("/spotform", (req, rep) => {
    const name = req.body.name;
    const description = req.body.description;
    const address = req.body.address;
    const difficulty = req.body.difficulty;
    const data = {
        name: name,
        description: description,
        address: address,
        difficulty: difficulty,
    };

    let token = req.session.skiApiToken;

    const config = {
        method: "post",
        url: "https://ski-api.herokuapp.com/ski-spot",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
        },
        data: data,
    };

    axios(config)
        .then(function (response) {
            req.session.spotData = response.data.skiSpot;
            rep.redirect("spottest");
        })

        .catch(error => {
            console.log("error is " + error);
            rep.redirect("error")
        });
});

//--------------------------------------------------------------------------------------------------------------------//

////////////////ZONE ALL SPOT/////////////////

exports.getAllSpot = (req, rep) => {

    let token = req.session.skiApiToken;

    let pageNB = req.query.page || 1;

    const config = {
        method: "get",
        url: "https://ski-api.herokuapp.com/ski-spot?limit=5&page=" + pageNB,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token
        },
    };

    axios(config)
        .then(function (resultat) {
            req.session.spotData = resultat.data.skiSpots;
            let showSpots = resultat.data.skiSpots;
            console.log(showSpots);
            rep.render("allspot", {
                showSpots
            });
        })

        .catch(error => {
            console.log("error is " + error);
            rep.redirect("error")
        });
};

//--------------------------------------------------------------------------------------------------------------------//

////////////////ZONE GET AN ID ON SPOT/////////////////

exports.sendID = (request, response) => {
    const data = request.session.spotData;
    if (data == undefined) {
        response.redirect("allspot");
    } else {
        response.render("spotdetail", {
            'data': data
        });
    };
};

exports.getAnID_spot = (req, rep) => {

    let token = req.session.skiApiToken;

    const id = req.params.id;

    console.log("Le id est = " + req.params.id);

    const config = {
        method: "get",
        url: "https://ski-api.herokuapp.com/ski-spot",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token
        }
    };

    axios(config)
        .then(function (response) {

            req.session.spotData = response.data.skiSpots;

            let showSpots = response.data.skiSpots;

            console.log('LE RESULTAT DE SHOWSPOTS EST : ' + showSpots);
            rep.render("spotdetail", {
                showSpots
            });

        })

        .catch(error => {
            console.log("error is " + error);
            rep.redirect("error");
        });

};
//--------------------------------------------------------------------------------------------------------------------//

////////////////ZONE EDIT SPOT/////////////////

//////////////////////// !!!!!!! NON COMPLET! !!!!!!! //////////////////////// 

exports.edit_spot = ("/editSpot", (req, rep) => {
    const name = req.body.name;
    const description = req.body.description;
    const address = req.body.address;
    const difficulty = req.body.difficulty;
    const coordinates = req.body.coordinates;
    const data = {
        name: name,
        description: description,
        address: address,
        difficulty: difficulty,
        coordinates: coordinates
    };

    let token = req.session.skiApiToken;

    const id = req.params.id;

    const config = {
        method: "put",
        url: "https://ski-api.herokuapp.com/ski-spot/"+id,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
        },
        data: data,
    };

    axios(config)
        .then(function (response) {
            req.session.spotData = response.data.skiSpot;
            rep.redirect("spottest");
        })

        .catch(error => {
            console.log("error is " + error);
            rep.redirect("error")
        });
});

//--------------------------------------------------------------------------------------------------------------------//'

////////////////ZONE DELETE SPOT/////////////////

//////////////////////// !!!!!!! NON COMPLET! !!!!!!! //////////////////////// 

exports.delete_spot = (req, rep) => {

    let token = req.session.skiApiToken;

    const id = req.params.id;

    console.log("Le id est = " + req.params.id);

    const config = {
        method: "delete",
        url: "https://ski-api.herokuapp.com/ski-spot/"+id,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token
        }
    };

    axios(config)
        .then(function (rep) {
        rep.render("allspot");

        })

        .catch(error => {
            console.log("error is " + error);
            rep.redirect("error");
        });

};

//--------------------------------------------------------------------------------------------------------------------//

////////////////ZONE SIGN IN/////////////////

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

//--------------------------------------------------------------------------------------------------------------------//

////////////////ZONE SIGN UP/////////////////

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