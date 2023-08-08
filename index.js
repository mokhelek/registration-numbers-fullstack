import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";

import regNumbersFactory from "./reg-numbers-logic.js";
import db from "./model/db.js";

import flash from "express-flash";
import session from "express-session";

let app = express();
app.use(
    session({
        secret: "<add a secret string here>",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(flash());
app.use(express.static("public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let regNumsInstance = regNumbersFactory();

app.get("/", async (req, res) => {
    let regNums = await regNumsInstance.getRegistrations(db);
    res.render("home", {regNums});
});

app.post("/add-registration", async (req, res) => {
    await regNumsInstance.addRegistration(db, req.body.regNumInput, req);
    res.redirect("/");
});

app.get("/reset-data", async (req, res) => {
    await regNumsInstance.resetData(db);
    res.redirect("/");
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App starting on port", PORT);
});