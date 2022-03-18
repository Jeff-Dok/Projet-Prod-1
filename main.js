const express = require('express');
const app = express();
const path = require("path");
const homeController = require("./controllers/homeController");
const axios = require('axios');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, "public")));

app.get('/', homeController.sendIndex);
app.get("/index", homeController.getRedirect);
app.get("/signup", homeController.sendSignup);
app.get("/signin", homeController.sendSignin);
app.get("/profile", homeController.sendProfile);

//PARTIE SIGNIN
app.post('/signin', (req, rep) => {
    const email = req.body.email;
    const password = req.body.password;
    var data = {
        "email": email,
        "password": password
    };
    var config = {
        method: 'post',
        url: 'https://ski-api.herokuapp.com/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    axios(config)
        .then(function (response) {
            let token = response.data.token;
            var data = {
                'token': token
            };
            var config = {
                method: 'get',
                url: 'https://ski-api.herokuapp.com/tokenInfo',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                    'Accept': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (r) {
                    rep.render('profile', {
                        'data': r.data,
                    });
                })
                .catch(function (e) {
                    console.log(e);
                });
        })

        .catch(function (error) {
            console.log(error);
        });
});

//PARTIE SIGNUP
app.post('/signup', (req, rep) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let token = response.data.token;

    var data = {
        "name": name,
        "email": email,
        "password": password,
        "token": token
    };

    var config = {
        method: 'post',
        url: 'https://ski-api.herokuapp.com/signup',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'Accept': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            rep.render('profile', {
                'data': response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.listen(3000, () => {
    console.log("Le serveur est sur le port 3000");
});