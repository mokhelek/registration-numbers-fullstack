import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";

import regNumbersFactory from "./reg-numbers-logic.js";
import db from "./model/db.js";
import regNumsRoutes from "./routes/regNumbers.js";


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
let regNums = regNumsRoutes(db, regNumsInstance)

app.get("/:regCode?", regNums.show);
app.post("/registrations/add-registration", regNums.add );
app.get("/reg_number/:selectedReg", regNums.showOne);
app.get("/registrations/reset-data", regNums.reset);

let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App starting on port", PORT);
});



