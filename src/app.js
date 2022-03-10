const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes");

class AppController {
    constructor() {
        this.initalizeDB();

        this.app = express();

        this.configs()
        this.middlewares()
        this.routes()
    }

    initalizeDB() {
        this.db = require('./db')
        this.db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    }

    configs() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    middlewares() {
        this.app.use(express.json())
    }

    routes() {
        this.app.use(routes)
    }
}

module.exports = new AppController().app;